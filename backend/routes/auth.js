import express from "express";
import { Router } from "express";
import { mockUsers } from "./users.js";
import session from "express-session";


const router = Router()


router.post("/auth", (req, res) => {
    const { body : { name, password }} = req

    const findUser = mockUsers.find((user) => user.name === name)
    if(!findUser || findUser.password !== password)
    return res.status(401).send({msg: "Bad Crendentials"});

    req.session.user = findUser;
    return res.status(200).send(findUser)
})


router.get("/auth/status", (req, res) => {
    req.sessionStore.get(req.sessionID, (err, session) => {
        console.log(session);
    })

    return req.session.user ? res.status(200).send(req.session.user) : res.status(401).send({msg: "Not Authenticated"})
})
export default router;