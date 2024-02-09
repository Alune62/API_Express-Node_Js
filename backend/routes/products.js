import express from "express"
import { Router } from "express";
import userRouter from "./users.js"


const router = Router()


router.get("/products", (req, res) => {
    res.send("hello")
})


export default router;