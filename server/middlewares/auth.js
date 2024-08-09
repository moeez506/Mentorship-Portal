import jwt from "jsonwebtoken";

// export const authenticatedUser = async (req, _, next) => {
//   const authHeader = req.headers.authorization;
//   console.log("🚀 ~ file: auth.ts:12 ~ authHeader:", authHeader);

//   if (!authHeader || !authHeader.startsWith("Bearer")) {
//     throw new CustomApiErrorHandler("Unauthorized", StatusCodes.UNAUTHORIZED);
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const { id, isAdmin } = jwt.verify(token, process.env.JWT_SECRET);

//     console.log("🚀 ~ file: auth.ts:27 ~ id:", id);
//     console.log("🚀 ~ file: auth.ts:18 ~ payload:", isAdmin);

//     req.user = { id, isAdmin };
//     next();
//   } catch (error) {
//     throw new CustomApiErrorHandler("Unauthorized", StatusCodes.UNAUTHORIZED);
//   }
// };


export const authenticatedUser = async (req, res, next) => {
  const {token} = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};


export const isVerified = async (req, res, next) => {

  const { verifiedByAdmin } = req.user;
  if (!verifiedByAdmin) {
    return res.status(401).json({ message: 'You are not verified by admin , Please try again later' });
  }
  next();
}