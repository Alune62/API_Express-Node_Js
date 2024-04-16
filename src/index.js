import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";//Cookies
import routes from "../backend/routes/index.js"
import { loggingMiddleware } from "../backend/middleware/logmiddleware.js";



const PORT = process.env.PORT || 3000
const app = express();



app.use(express.json())
app.use(session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60,
    }
}))
app.use(cookieParser('helloworld'))//cookies

app.use(routes)

app.use(loggingMiddleware, (req, res, next) => {
    console.log("Finished Logging...");
    next();
})

//cookies
app.get("/", (req, res) => {
    console.log(req.session);
    console.log(req.session.id);
    req.session.visited = true;
    res.cookie('hello', 'world', { maxAge: 10000, signed: true })
    res.status(201).send('Hello')
})

app.listen(PORT, () => {
    console.log(`[STARTED] Le serveur a démarré sur le port ${PORT}`);
})

