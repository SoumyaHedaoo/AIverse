import express from "express";
import cors from "cors";
import { reqLimit } from "./constant.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";

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

app.get('/' , (req , res)=>{
    res.send("app working fine");
});

import aiRouter from './routes/ai.routes.js';
import userRouter from './routes/user.routes.js';

app.use('/api/v1/ai' , requireAuth() , aiRouter);
app.use('/api/v1/user' , requireAuth() , userRouter);

export {app};