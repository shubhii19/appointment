import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div>
      {/* ------Leftside----------- */}
      <div>
        <p>Book Appointment <br />With Trusted Doctors</p>
        <div>
            <img src={assets.group_profiles} alt="" />
            <p>Simply browse through our extensive list of trusted doctors, <br /> schedule your appointment hassle-free.</p>
        </div>
      </div>
      {/* ------Right side ---------- */}
      <div></div>
    </div>
  )
}

export default Header
