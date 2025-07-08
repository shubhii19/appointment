import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// API for adding doctor

export const addDoctorController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fee,
      address,
    } = req.body;
    const imagefile = req.file;
    console.log("Request Body:", req.body);
    console.log("Image File:", req.file);
    // checking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fee ||
      !address
    ) {
      return res.json({ success: false, message: "Missing details" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email.",
      });
    }

    // validating password
    if (password < 5) {
      return res.json({
        success: false,
        message: "Please enter a strong password.",
      });
    }

    // hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imagefile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fee,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    return res.json({ success: true, message: "Doctor Added" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// api for the admin login
export const adminLoginController = async (req, res) => {
  try {
    const {email,password} = req.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password,process.env.JWT_SECRET)
      res.json({success:true,token})
    }else{
      res.json({success:false,message:"Invalid credentials."})
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};



// API to get all doctors list for admin panel

export const allDoctorsController = async(req,res)=>{
  try {
    const doctors = await doctorModel.find({}).select('-password')
    console.log(doctors)
    res.json({success:true,doctors})
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}


// api to get all appointments list
export const appointmentsAdminController = async(req,res)=>{
  try {
    const appointments = await appointmentModel.find({});
    res.json({success:true,appointments})
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}


// api to  appointment cancellation by admin

export const appointmentCancelController = async(req,res)=>{
  try {
    
    const {appointmentId}=req.body;
    
    const appointmentData = await appointmentModel.findById(appointmentId)
    
    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});

    // releasing doctor slot
    const {docId,slotDate,slotTime}=appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!=slotTime);
    await doctorModel.findByIdAndUpdate(docId,{slots_booked});

    res.json({success:true,message:"Appointment cancelled"})
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message }); 
  }
}


// api to get dashboard data for admin panel
export const adminDashboardController = async(req,res)=>{
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments:appointments.length,
      patients:users.length,
      latestAppointments:appointments.reverse().slice(0,5)

    }
   return res.json({success:true,dashData})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message }); 
  }
}