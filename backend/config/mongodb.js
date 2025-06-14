// vishwakarmashubhi80
// EKQrZaB3d07NyWpq

// mongodb+srv://vishwakarmashubhi80:EKQrZaB3d07NyWpq@cluster0.pjiokl9.mongodb.net/



import mongoose from "mongoose";

const connectDB = async ()=>{
    mongoose.connection.on('connected',()=>console.log("Connected to Database"))
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
}


export default connectDB