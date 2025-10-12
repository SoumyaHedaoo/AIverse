import express, { Router } from "express";
import { Route } from "express";
import { userAccessMiddleware } from "../middlewares/auth.middleware.js";
import { generateArticle } from "../controllers/ai.controller.js";

const router = Router();

router.post('/generate-article' , userAccessMiddleware , generateArticle);

export default router;