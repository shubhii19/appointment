import express from 'express';
import { addDoctorController, adminLoginController, allDoctorsController, appointmentCancelController, appointmentsAdminController } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import { authAdmin } from '../middlewares/authAdmin.js';
import { changeAvailabilityController } from '../controllers/doctorController.js';

const router = express.Router();


router.post('/add-doctor',authAdmin,upload.single('image'),addDoctorController);

router.post('/login',adminLoginController);

router.post('/all-doctors',authAdmin,allDoctorsController);

router.post('/change-availability',authAdmin,changeAvailabilityController);

router.get('/appointments',authAdmin,appointmentsAdminController);

router.post('/cancel-appointment',authAdmin,appointmentCancelController)


export default router;