import express from 'express';
import { appointmentCancelController, appointmentCompleteController, appointmentsDoctorController, doctorDashboardController, doctorList, loginDoctorController } from '../controllers/doctorController.js';
import { authDoctor } from '../middlewares/authDoctor.js';

const router = express.Router();

router.get('/list',doctorList);

router.post('/login',loginDoctorController);

router.get('/appointments',authDoctor,appointmentsDoctorController);

router.post('/complete-appointment',authDoctor,appointmentCompleteController);

router.post('/cancel-appointment',authDoctor,appointmentCancelController);

router.get('/dashboard',authDoctor,doctorDashboardController);


export default router;