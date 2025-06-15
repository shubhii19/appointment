import express from 'express';
import { addDoctorController } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';

const router = express.Router();


router.post('/add-doctor',upload.single('image'),addDoctorController);




export default router;