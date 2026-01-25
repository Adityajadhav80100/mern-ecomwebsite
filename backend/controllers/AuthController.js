import user from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userexist = await user.findOne({ email });
    if (!userexist) {
      return res.status(401).json({ message: "user not found" });
    }

    const campare = await bcrypt.compare(password, userexist.password);
    if (!campare) {
      return res.status(401).json({ message: "password not match" });
    }

    const token = jwt.sign(
      { id: userexist._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ GUARANTEED STRUCTURE
    res.status(200).json({
      message: "log in successfull",
      token,
      user: {
        _id: userexist._id,
        name: userexist.name,
        email: userexist.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "error is here",
      error: err.message,
    });
  }
};

export const SignupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await user.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "user Exist" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      name,
      email,
      password: hashpassword,
    });

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ AUTO LOGIN RESPONSE
    res.status(201).json({
      message: "user register successfully",
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "error is on server", err });
  }
};
