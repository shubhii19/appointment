import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from 'cloudinary';
// api to register user
export const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details." });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid Email" });
    }

    // validating user password
    if (password.length < 4) {
      return res.json({ success: false, message: "Enter a storng password" });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api for user login

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to get user profile data
export const getProfileController = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to update user profile

// export const updateProfileController = async (req, res) => {
//   try {
//     const { userId, name, phone, address,dob, job, gender } = req.body;
//     const imageFile = req.file;

//     if (!name || !phone || !dob || !gender) {
//       return res.json({ success: false, message: "Data missing" });
//     }

//     await userModel.findByIdAndUpdate(userId, {
//       name,
//       phone,
//       address: JSON.parse(address),
//       dob,
//       gender,
//     });

//     if(imageFile){
//         // upload to image to cloudinary
//         const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'});
//         const imageURL = imageUpload.secure_url;

//         await userModel.findByIdAndUpdate(userId,{image:imageURL})
//     }
//     res.json({success:true,message:"Profile updated"})
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };


export const updateProfileController = async (req, res) => {
  try {
    const {  name, phone, address, dob, job, gender } = req.body;
    const userId = req.user.id; // ✅ safer
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data missing" });
    }

    let parsedAddress = {};
    try {
      parsedAddress = address ? JSON.parse(address) : {};
    } catch (e) {
      return res.json({ success: false, message: "Invalid address format" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: parsedAddress,
      dob,
      gender,
      job,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
