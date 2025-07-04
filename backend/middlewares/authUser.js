import jwt from 'jsonwebtoken'

// user authentication middleware

// export const authUser = async(req,res,next) =>{
//     try {
//       const {token} = req.headers;
//     //   console.log("token from middleware=> ", token)
//       if(!token){
//         return res.json({success:false,message:'Not authorized login again'})
//       }  
//       const token_decode = jwt.verify(token,process.env.JWT_SECRET)
//        req.body.userId = token_decode.id;
//       next();
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:error.message})
//     }
// }

export const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: 'Not authorized, login again' });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: token_decode.id }; // ✅ safest and standard

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
