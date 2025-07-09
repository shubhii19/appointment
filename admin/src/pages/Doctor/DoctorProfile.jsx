import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorProfile = () => {
  const { profileData, setProfileData, getProfiledata,dtoken } =
    useContext(DoctorContext);
    const {currency,backendUrl} = useContext(AppContext)
  return <div>DoctorProfile</div>;
};

export default DoctorProfile;
