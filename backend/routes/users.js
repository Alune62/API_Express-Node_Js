import express from 'express';
import { query, validationResult, body } from 'express-validator';

const userRouter = express.Router();


const mockUsers = [
    { id: 1, name: "lioune", displayName: "LIOUNE" },
    { id: 2, name: "adji", displayName: "ADJI" },
    { id: 3, name: "mouna", displayName: "MOUNA" },
    { id: 4, name: "omzo", displayName: "OMZO" },
    { id: 5, name: "babo", displayName: "BABO" }
];

//Requête Post (Ce qui permet de créer de nouveaux users)
userRouter.post("/", 
body("name")
.notEmpty()
.withMessage("Cannot be empty")
.isLength({min: 5, max: 32})
.withMessage("Name must be at least 5 characters with a max of 32 characters")
.isString()
.withMessage("Name must be a string"),
body("displayName")
.notEmpty(),
(req, res) =>{

    const result = validationResult(req)
    console.log(result);
    
    if(!result.isEmpty()) return res.status(400).send({ errors: result.array()})
    
    const { body } = req
    const newUser = {
        id: mockUsers[mockUsers.length -1].id + 1, ...body
        }

    mockUsers.push(newUser)
    return res.send(newUser)
})

//Requête get (Recupération de tous les users)
userRouter.get("/", 

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
userRouter.get("/:id", (req, res) => {

    const parsedId = parseInt(req.params.id)
    if(isNaN(parsedId)) return res.status(400).send("Id not provided")

    const findUser = mockUsers.find((user) => user.id === parsedId)
    if(!findUser) return res.status(404).send("User not Found")
    return res.send(findUser)

})


//Requête Put (éditer/modifier)
userRouter.put("/:id", (req, res) =>{
    const { body, params:{ id }} = req
    const parsedId = parseInt(id)
    if(isNaN(parsedId)) return res.sendStatus(400)

    const findIndexUser = mockUsers.findIndex((user) => user.id === parsedId)
    if(findIndexUser === -1) return res.sendStatus(404)
    mockUsers[findIndexUser] = { id: parsedId, ...body}
return res.sendStatus(200)

})

userRouter.patch("/:id", (req, res) =>{
   const { body, params: { id }} = req;
   const parsedId = parseInt(id)
   if(isNaN(parsedId)) return res.sendStatus(400)

   const findIndexUser = mockUsers.findIndex((user) => user.id === parsedId)
   if(findIndexUser === -1) return res.sendStatus(404)
   mockUsers[findIndexUser] = { ...mockUsers[findIndexUser], ...body}
res.sendStatus(200)
})


//Requête Delete (suppression de user)
userRouter.delete('/:id', (req, res) => {
    const parsedId = parseInt(req.params.id)
    if(isNaN(parsedId)) return res.sendStatus(400)

    const findIndexUser = mockUsers.findIndex((user) => user.id === parsedId)
    if(findIndexUser === -1) return res.sendStatus(404);
    mockUsers.splice(findIndexUser, 1);
    return res.sendStatus(200)


})

export default userRouter

//module.exports = userRouter;
