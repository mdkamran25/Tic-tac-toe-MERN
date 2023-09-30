import jwt from "jsonwebtoken";

const { JWT_PRIVATE_KEY , JWT_EXPIRY_TIME} = process.env;

export const generateToken = (id) => {
 return jwt.sign({id}, JWT_PRIVATE_KEY || 'your-secret-key', {
    expiresIn: JWT_EXPIRY_TIME || "5d",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_PRIVATE_KEY || 'your-secret-key');
};
