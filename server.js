import express from "express";
import session from "express-session";
import passport from "passport";
import pg from "pg";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";

const app = express();

app.use(session
({
    secret: "speedrun",
    resave: false,
    saveUninitialized: true,
    cookie:
    {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

dotenv.config();
const db = new pg.Client
({
    user: process.env.dbUser,
    host: process.env.dbHost,
    database: process.env.dbDatabase,
    password: process.env.dbPassword,
    port: process.env.dbPort
});
db.connect();

app.listen(3000, () =>
{
    console.log("Server is runnin on Port: 3000");
});

app.get("/", (req, res) =>
{
    if (req.isAuthenticated())
    {
        res.render("index.ejs");
    } else
    {
        res.redirect("/register");
    }
});

app.get("/register", (req, res) =>
{
    res.render("register.ejs");
});

app.post("/register", async (req, res) =>
{
    const username = req.body.username;
    const password = req.body.password;

    try
    {
        const check = await db.query("SELECT * FROM users WHERE email=$1", [username]);

        if (check.rowCount > 0)
        {
            res.send("User already exists, try loggin in instead");
        } else
        {
            bcryptjs.hash(password, 10, async (error, passwordHash) =>
            {
                const result = await db.query("INSERT INTO users(email, password) VALUES($1, $2) RETURNING *", [username, passwordHash]);
                const userData = result.rows[0];

                req.login(userData, (error) =>
                {
                    if (error)
                    {
                        console.log(error.message);
                    } else
                    {
                        res.redirect("/");
                    }
                })
            });
        }
    }
    catch (error)
    {
        console.log(error.message);
    }
});

passport.serializeUser((userData, cb) =>
{
    cb(null, userData.id);
});

passport.deserializeUser(async (userID, cb) =>
{
    const result = await db.query("SELECT * FROM users WHERE id=$1", [userID]);
    const userData = result.rows[0];

    cb(null, userData);
});