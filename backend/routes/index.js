import express from "express";
import { Router } from "express";
import userRouter from "./users.js"
import productsRouter from"./products.js"
import authRouter from "./auth.js"
import cartRouter from "./cart.js"


const router = Router()


router.use(userRouter)
router.use(productsRouter)
router.use(authRouter)
router.use(cartRouter)


export default router