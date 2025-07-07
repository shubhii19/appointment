import express from 'express';
import {  bookappointmentController, cancelAppointmentController, getProfileController, listAppointmentConntroller, loginUserController, paymentRazorpayController, registerUserController, updateProfileController, verifyRazorpayController } from '../controllers/userController.js';
import { authUser } from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';


const router = express.Router();

router.post('/register',registerUserController)

router.post('/login',loginUserController)

router.get('/get-profile',authUser,getProfileController);

router.post('/update-profile',upload.single('image'),authUser,updateProfileController);

router.post('/book-appointment',authUser,bookappointmentController);

router.get('/appointments',authUser,listAppointmentConntroller);

router.post('/cancel-appointment',authUser,cancelAppointmentController);

router.post('/payment-razorpay',authUser,paymentRazorpayController);

router.post('/verifyRazorpay',authUser,verifyRazorpayController);

export default router;