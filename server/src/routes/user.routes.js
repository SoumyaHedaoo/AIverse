import express, { Router } from "express";
import { userAccessMiddleware } from "../middlewares/auth.middleware.js";
import { getAllPublishedCreations, getUserCreations, toggleCreationsLikeStatus } from "../controllers/user.controller.js";


const router = Router();

router.get('/usersCreations' , userAccessMiddleware , getUserCreations);

router.get('/allPublishedCreations' , getAllPublishedCreations);

router.post('/togglr-like-creation' , userAccessMiddleware , toggleCreationsLikeStatus);

export default router;