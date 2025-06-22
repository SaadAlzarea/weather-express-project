import JWT, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (userId: any) => {
  const token = JWT.sign({ userId }, process.env.JWT_SECRET as string);

  return token;
};

export const verifyToken = (token: string) => {
  const verify = JWT.verify(token, process.env.JWT_SECRET as string);
  return verify as JwtPayload;
};

// import JWT, { JwtPayload } from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// export const generateToken = (userId: string): string => {
//   const secret = process.env.JWT_SECRET;
//   if (!secret) {
//     throw new Error("JWT_SECRET is not defined in environment variables");
//   }
//   const token = JWT.sign({ userId }, secret, { expiresIn: "1h" });
//   return token;
// };

// export const verifyToken = (token: string): JwtPayload => {
//   const secret = process.env.JWT_SECRET;
//   if (!secret) {
//     throw new Error("JWT_SECRET is not defined in environment variables");
//   }
//   const verify = JWT.verify(token, secret);
//   return verify as JwtPayload;
// };
