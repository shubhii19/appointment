import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRoute from './routes/adminRoute.js'
import doctorRoute from './routes/doctorRoute.js'

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();


// middlewares
app.use(express.json());
app.use(cors());

// api endpoint

app.use('/api/admin',adminRoute);
app.use('/api/doctor',doctorRoute)
app.get('/',(req,res)=>{
    res.send('APi working')
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})