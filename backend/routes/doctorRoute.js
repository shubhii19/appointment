import express from 'express';
import { appointmentsDoctorController, doctorList, loginDoctorController } from '../controllers/doctorController.js';
import { authDoctor } from '../middlewares/authDoctor.js';

const router = express.Router();

router.get('/list',doctorList);

router.post('/login',loginDoctorController);

router.get('/appointments',authDoctor,appointmentsDoctorController)


export default router;