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