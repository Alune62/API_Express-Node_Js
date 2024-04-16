import { signedCookies } from "cookie-parser";
import { Router } from "express";
import { query, validationResult} from 'express-validator';




const router = Router()

const mockProducts = [
    {id: 1, name: "ballon", price: 15},
    {id: 2, name: "crampon", price: 30},
    {id: 3, name: "dossar", price: 9},
    {id: 4, name: "protège", price: 5},
    {id: 5, name: "chaussette", price: 6}
]


router.get("/products", 
query('filter')
.isString()
.notEmpty()
.withMessage("Must be not empty")
.isLength({min : 3, max: 10})
.withMessage("Must be at least 3-10 characters"),

(req, res) => {
//http://localhost:3000/products?filter=name&value=

    
     
const result = validationResult(req);
       console.log(result);
    
       const { query: { filter, value }} = req
       if(!filter && value) return res.send(mockProducts)
       if(filter && value) return res.send(
        mockProducts.filter((product) => product[filter].includes(value))
       )

       //Cookies
       console.log(req.headers.cookie);
       console.log(req.cookies);
       console.log(signedCookies);
       if(req.signedCookies.hello && req.signedCookies.hello === "world") return res.send(mockProducts)
       return res.status(403).send({msg: "Sorry. you need the correct cookie"})
})


router.get('/products/:id', (req, res) => {

    const parsedId = parseInt(req.params.id)
    if(isNaN(parsedId)) return res.sendStatus(400)

    const findProduct = mockProducts.find((product) => product.id === parsedId)
    if(!findProduct) return res.sendStatus(404)

    return res.send(findProduct)
    
})

router.delete("/products/:id", (req, res) => {

    const parsedId = parseInt(req.params.id)
    if(isNaN(parsedId)) return res.sendStatus(400)

    const findIndexProduct = mockProducts.findIndex((product) => product.id === parsedId)
    if(findIndexProduct === -1) return res.sendStatus(404)// n'arrive pas à trouver l'index du produit(le produit lui même)
    mockProducts.splice(findIndexProduct, 1) //la suppression
    
    return res.sendStatus(200) // pour dire que c'est supprimé
})


export default router;