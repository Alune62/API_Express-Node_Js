import express from 'express';
import { Router } from 'express';
import { query, validationResult, matchedData, checkSchema} from 'express-validator';
import { createUserValidationSchema } from '../models/usersSchema.js';

const router = Router();


const mockUsers = [
    { id: 1, name: "lioune", displayName: "LIOUNE" },
    { id: 2, name: "adji_O", displayName: "ADJI" },
    { id: 3, name: "mouna", displayName: "MOUNA" },
    { id: 4, name: "omzoh", displayName: "OMZO" },
    { id: 5, name: "babo_", displayName: "BABO" }
];

//Requête Post (Ce qui permet de créer de nouveaux users)
router.post("/users", checkSchema(createUserValidationSchema), (req, res) => {
    const result = validationResult(req)
    console.log(result);
    
    if(!result.isEmpty()) return res.status(400).send({ errors: result.array()})
    
    const data = matchedData(req)
    console.log(data);
    const newUser = {
        id: mockUsers[mockUsers.length -1].id + 1, ...data
        }

    mockUsers.push(newUser)
    return res.send(newUser)
})

//Requête get (Recupération de tous les users)
router.get("/users", 

       query('filter')
       .isString()
       .notEmpty()
       .withMessage("Must be not empty")
       .isLength({min : 3, max: 10})
       .withMessage("Must be at least 3-10 characters"),

(req, res, next) => {

       const result = validationResult(req);
       console.log(result);

const { query : { filter, value }} = req
if(!filter && value) return res.send(mockUsers)
if(filter && value) return res.send(
    mockUsers.filter((user) => user[filter].includes(value)))

    return res.send(mockUsers);
});

//Recupération d'un user avec son id
router.get("/users/:id", (req, res) => {

    const parsedId = parseInt(req.params.id)
    if(isNaN(parsedId)) return res.status(400).send("Id not provided")

    const findUser = mockUsers.find((user) => user.id === parsedId)
    if(!findUser) return res.status(404).send("User not Found")
    return res.send(findUser)

})


//Requête Put (éditer/modifier)
router.put("/users/:id", (req, res) =>{
    const { body, params:{ id }} = req
    const parsedId = parseInt(id)
    if(isNaN(parsedId)) return res.sendStatus(400)

    const findIndexUser = mockUsers.findIndex((user) => user.id === parsedId)
    if(findIndexUser === -1) return res.sendStatus(404)
    mockUsers[findIndexUser] = { id: parsedId, ...body}
return res.sendStatus(200)

})

router.patch("/users/:id", (req, res) =>{
   const { body, params: { id }} = req;
   const parsedId = parseInt(id)
   if(isNaN(parsedId)) return res.sendStatus(400)

   const findIndexUser = mockUsers.findIndex((user) => user.id === parsedId)
   if(findIndexUser === -1) return res.sendStatus(404)
   mockUsers[findIndexUser] = { ...mockUsers[findIndexUser], ...body}
res.sendStatus(200)
})


//Requête Delete (suppression de user)
router.delete('/users/:id', (req, res) => {
    const parsedId = parseInt(req.params.id)
    if(isNaN(parsedId)) return res.sendStatus(400)

    const findIndexUser = mockUsers.findIndex((user) => user.id === parsedId)
    if(findIndexUser === -1) return res.sendStatus(404);
    mockUsers.splice(findIndexUser, 1);
    return res.sendStatus(200)


})

export default router

//module.exports = userRouter;
