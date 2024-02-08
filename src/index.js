import express from "express";
import userRouter from "../backend/routes/users.js";
import { loggingMiddleware } from "../backend/middleware/logmiddleware.js";



const PORT = process.env.PORT || 3000
const app = express();


app.use(express.json())

 

app.use("/users", userRouter)

app.use(loggingMiddleware, (req, res, next) => {
    console.log("Finished Logging...");
    next();
})


app.listen(PORT, () => {
    console.log(`[STARTED] Le serveur a démarré sur le port ${PORT}`);
})

