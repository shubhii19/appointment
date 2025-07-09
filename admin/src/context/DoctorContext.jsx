import { createContext, useState } from "react";
import axios from 'axios'
import  {toast} from 'react-toastify';

export const DoctorContext = createContext();  

const DoctorContextProvider  = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dtoken, setDToken] = useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "")
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/doctor/appointments',{headers:{dtoken}})
            if(data.success){
                setAppointments(data.appointments.reverse())
            }
            else{
            toast.error(data.message)
        }
        console.log(data.appointments, "data h ye")
        
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const value = {
        dtoken,setDToken,backendUrl,appointments,setAppointments,getAppointments
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider