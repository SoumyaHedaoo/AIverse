import express, { Router } from "express";
import { Route } from "express";
import { userAccessMiddleware } from "../middlewares/auth.middleware.js";
import { generateArticle, generateBlogTitle, generateImage, removeBackground, removeObject } from "../controllers/ai.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post('/generate-article' , userAccessMiddleware , generateArticle);
router.post('/generate-blogTitle' , userAccessMiddleware , generateBlogTitle);
router.post('/generate-image' , userAccessMiddleware , generateImage);
router.post('/remove-background' ,userAccessMiddleware , upload.single('image') , removeBackground);
router.post('/remove-object' , userAccessMiddleware , upload.single('image') , removeObject);

export default router;