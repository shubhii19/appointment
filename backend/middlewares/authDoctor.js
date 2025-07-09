import jwt from 'jsonwebtoken' 

// doctor authentication middleware
export const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
      return res.json({ success: false, message: 'Not authorized, login again' });
    }

    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

    req.doc = { id: token_decode.id }; // ✅ safest and standard

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
