import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";

export const changeAvailabilityController = async (req, res) => {
  try {
    const {docId} = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
    res.json({success:true,message:'Availability changed.'})
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};


export const doctorList = async(req,res)=>{
  try {
    const doctors = await doctorModel.find({}).select(['-password','-email']);
    res.json({success:true,doctors})
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  
  }
}

// api for doctor login
export const loginDoctorController = async(req,res)=>{
  try {
    const {email,password}=req.body;
    const doctor = await doctorModel.findOne({email});

    if(!doctor){
      return res.json({success:false,message:'Invalid credentials'})
    }

    const isMatch = await bcrypt.compare(password,doctor.password);
    if(isMatch){
      const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET);
      res.json({success:true,token})
    }else{
      res.json({success:false,message:'Invalid credentials'})
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}


// api to get appointments for doctor panel
export const appointmentsDoctorController = async(req,res)=>{
  try {
    
    const docId = req.doc.id; 
    console.log("docid->",docId)
    const appointments = await appointmentModel.find({docId})
    res.json({success:true,appointments})
  } catch (error) {
     console.log(error);
    return res.json({ success: false, message: error.message });
  }
}


// api to mark appointment completed for doctor panel
export const appointmentCompleteController = async(req,res)=>{
  try {
    const docId = req.doc.id; 
    const {appointmentId} = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if(appointmentData && appointmentData.docId === docId){
      await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true});
      return res.json({success:true,message:'Appointment completed'})
    }else{
      return res.json({success:false,message:'Mark failed.'})
    }
  } catch (error) {
     console.log(error);
    return res.json({ success: false, message: error.message });
 
  }
}

// api to cancel appointment  for doctor panel
export const appointmentCancelController = async(req,res)=>{
  try {
    const docId = req.doc.id; 
    const {appointmentId} = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if(appointmentData && appointmentData.docId === docId){
      await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true});
      return res.json({success:true,message:'Appointment Cancelled'})
    }else{
      return res.json({success:false,message:'Cancellation failed.'})
    }
  } catch (error) {
     console.log(error);
    return res.json({ success: false, message: error.message });
 
  }
}


// api to get dashboard data for doctor panel
export const doctorDashboardController = async(req,res)=>{
  try {
    const docId = req.doc.id; 
    const appointments = await appointmentModel.find({docId});

    let earnings = 0;
    appointments.map((item)=>{
      if(item.isCompleted || item.payment ){
        earnings += item.amount
      }
    })

    let patients = [];
    appointments.map((item)=>{
      if(!patients.includes(item.userId)){
        patients.push(item.userId)
      }
    })

    const dashData = {
      earnings,
      appointments:appointments.length,
      patients:patients.length,
      latestAppointments:appointments.reverse().slice(0,5)
    }

    res.json({success:true,dashData})
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
 
  }
}


// api to get doctor profile for doctor panel

export const doctorProfileController = async(req,res)=>{
  try {
     const docId = req.doc.id; 
     const profileData = await doctorModel.findById(docId).select('-password');
     res.json({success:true,profileData})
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}

// api to update doctor profile data from doctor panel

export const updateDoctorProfileController = async(req,res)=>{
  try {
    const docId = req.doc.id; 
    const {fee,address,available}=req.body;
    await doctorModel.findByIdAndUpdate(docId,{fee,available,address})

    res.json({success:true,message:'Profile updated'})
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}