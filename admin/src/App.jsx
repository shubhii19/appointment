import React from 'react'
import Login from './pages/Login'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext } from 'react'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointents from './pages/Admin/AllAppointents'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'
import { DoctorContext } from './context/DoctorContext'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorProfile from './pages/Doctor/DoctorProfile'

const App = () => {
  const {aToken} = useContext(AdminContext);
  const {dtoken} = useContext(DoctorContext);
  console.log(dtoken , "d")
  return aToken || dtoken ? (
    <div className='bg-[#F8F9FD]'>
     <ToastContainer/>
     <Navbar/>
     <div className='flex items-start'>
      <Sidebar/>
      <Routes>
        {/* Admin routes */}
        <Route path='/' element={<></>}/>
        <Route path='/admin-dashboard' element={<Dashboard/>}/>
        <Route path='/all-appointments' element={<AllAppointents/>}/>
        <Route path='/add-doctor' element={<AddDoctor/>}/>
        <Route path='/doctor-list' element={<DoctorsList/>}/>

        {/* Doctor routes */}
        <Route path='/doctor-appointments' element={<DoctorAppointments/>}/>
        <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
        <Route path='/doctor-profile' element={<DoctorProfile/>}/>

      </Routes>
     </div>
    </div>
  ) : (
    <>
    <Login/>
    <ToastContainer/>
    </>
  )
}

export default App
