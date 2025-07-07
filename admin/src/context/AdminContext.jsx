import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([])
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  //   console.log(aToken);
  const getAllDoctors = async () => {
    try {
      // const {data} = await axios.post(backendUrl + '/api/admin/all-doctors',{},{headers:aToken});
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        {
          headers: {
            atoken: aToken,

            // Authorization: `Bearer ${aToken}`,
          },
        }
      );
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const {data} = await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{aToken}});
      if(data.success){
        toast.success(data.message);
        getAllDoctors()
      }else{
      toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointments = async()=>{
    try {
      const {data} = await axios.get(backendUrl+'/api/admin/appointments',{headers:{aToken}});
      if(data.success){
        setAppointments(data.appointments);
        console.log(data.appointments)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
