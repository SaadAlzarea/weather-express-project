import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../config/jwt";
import { BAD_REQUEST, CREATED, OK, UNAUTHORIZED } from "../utils/http-status";

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: {
          message: "Please fill felid!",
        },
      });
      return;
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: {
          message: "Email already exist",
        },
      });
      return;
    }

    const HashPass: string = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      passwordHash: HashPass,
      role: "user",
    });
    await newUser.save();

    const token = generateToken(newUser._id);

    const header = new Headers({ Authorization: `Bearer ${token}` });
    res.setHeaders(header);

    res.status(CREATED).json({
      success: true,
      message: "Created User Successfully",
      token,
    });
  } catch (err: any) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: {
        message: `Error in SignUp: ${err.message}`,
      },
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(BAD_REQUEST).json({
        success: false,
        error: {
          message: "Please fill felid!",
        },
      });
      return;
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      res.status(UNAUTHORIZED).json({
        success: false,
        error: {
          message: "Email or password is invalid",
        },
      });
      return;
    }
    const passCorrect = await bcrypt.compare(password, userExist.passwordHash);
    if (!passCorrect) {
      res.status(UNAUTHORIZED).json({
        success: false,
        error: {
          message: "Email or password is invalid",
        },
      });
      return;
    }

    const token = generateToken(userExist._id);

    const header = new Headers({ Authorization: `Bearer ${token}` });
    res.setHeaders(header);
    res
      .status(OK)
      .json({
        success: true,
        message: "SignIn successfully",
        data: { ...userExist._doc, passwordHash: undefined },
        token,
      });
  } catch (error: any) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: {
        message: `Error in SignIn: ${error.message}`,
      },
    });
  }
};

export const signOut = async (req: Request, res: Response) => {
  try {
    const tokenHeader = req.headers.authorization;
    console.log(tokenHeader);
    if (!tokenHeader) {
      res.status(UNAUTHORIZED).json({ error: " No token provided" });
      return;
    }

    const token = tokenHeader.split(" ")[1];
    const verify = verifyToken(token);

    console.log(verify);

    if (!verify) {
      res.status(UNAUTHORIZED).json({
        success: false,
        error: {
          message: "Token Invalid",
        },
      });
    }

    res.status(OK).json({
      success: true,
      message: "Signout Successfully",
    });
  } catch (err: any) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: {
        message: `Error in Signout: ${err.message}`,
      },
    });
  }
};
