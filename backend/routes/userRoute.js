import express from 'express';
import {  getProfileController, loginUserController, registerUserController, updateProfileController } from '../controllers/userController.js';
import { authUser } from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';


const router = express.Router();

router.post('/register',registerUserController)

router.post('/login',loginUserController)

router.get('/get-profile',authUser,getProfileController);

router.post('/update-profile',upload.single('image'),authUser,updateProfileController);


export default router;