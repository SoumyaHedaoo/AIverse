import express, { Router } from "express";
import { Route } from "express";
import { userAccessMiddleware } from "../middlewares/auth.middleware.js";
import { generateArticle, generateBlogTitle, generateImage } from "../controllers/ai.controller.js";

const router = Router();

router.post('/generate-article' , userAccessMiddleware , generateArticle);
router.post('/generate-blogTitle' , userAccessMiddleware , generateBlogTitle);
router.post('/generate-image' , userAccessMiddleware , generateImage);

export default router;