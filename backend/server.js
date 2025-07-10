import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRoute from './routes/adminRoute.js'
import doctorRoute from './routes/doctorRoute.js'
import userRoute from './routes/userRoute.js'

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();


// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const allowedOrigins = [
//   'http://localhost:5173',   
'https://appointment-176e4osxo-shubhi-vishwakarmas-projects.vercel.app',
  'https://appointment-seven-xi.vercel.app',   
  'https://appointment-admin-six.vercel.app',        // admin live
  'https://appointment-admin-ntvssy1d6-shubhi-vishwakarmas-projects.vercel.app' // admin preview  
//   'http://localhost:5174',        
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // allow sending cookies/authorization headers
}));


// api endpoint

app.use('/api/admin',adminRoute);
app.use('/api/doctor',doctorRoute);
app.use('/api/user',userRoute);
app.get('/',(req,res)=>{
    res.send('APi working')
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})