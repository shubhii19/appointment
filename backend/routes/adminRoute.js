import express from 'express';
import { addDoctorController, adminLoginController } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import { authAdmin } from '../middlewares/authAdmin.js';

const router = express.Router();


router.post('/add-doctor',authAdmin,upload.single('image'),addDoctorController);
router.post('/login',adminLoginController)



export default router;