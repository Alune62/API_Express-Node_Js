import { Router } from "express";

const router = Router()


// Sans l'aunthentification, ses requête ne peuvent être exécutées

router.post("/cart", (req, res) => {
    if(!req.session.user) return res.sendStatus(401);

    const { body : item } = req
    const { cart } = req.session;
    if(cart){
        cart.push(item)
    } else {
        req.session.cart = [item]
    }
    
  return res.status(201).send(item)
})


router.get("/cart", (req, res) => {

    if(!req.session.user) return res.sendStatus(401)
    return res.send(req.session.cart ?? []);
})


export default router