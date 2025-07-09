import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const {appointments,getAppointments,dtoken} = useContext(DoctorContext);
  const {calculateAge,slotDateFormat,currency} = useContext(AppContext);
  useEffect(()=>{

    if(dtoken){
      getAppointments()
    }
  },[dtoken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[50vh]'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 px-6 py-3 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item,index)=>(
          <div key={index}>
            <p>{index+1}</p>
            <div>
              <img src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
            </div>
            <div>
              <p>{item.payment ? 'Online':'CASH'}</p>
            </div>
            <p>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
            <p>{currency}{item.amount}</p>
            <div>
              <img src={assets.cancel_icon} alt="" />
              <img src={assets.tick_icon} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorAppointments
