
// API for adding doctor

export const addDoctorController = async()=>{
    try {
        const {name,email,password,speciality,degree,experience,about,fee,address} = req.body;
        const imagefile = req.file;
        console.log(name,email,password,speciality,degree,experience,about,fee,address,imagefile)
    } catch (error) {
        
    }
}