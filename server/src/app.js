import express from "express";
import cors from "cors";
import { reqLimit } from "./constant.js";
import { clerkMiddleware } from "@clerk/express";

//AN express application instance
const app= express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}));
app.use(express.json({limit : `${reqLimit}`}));
app.use(express.urlencoded({
    extended : true,
    limit : `${reqLimit}`
}));
app.use(clerkMiddleware());



export {app};