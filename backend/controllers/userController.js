import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

export const signUp = async (req, res) => {
  try {
    // code to create a user
    let { email, password, fullName } = req.body;

    let emailCon = await User.findOne({ email: email });

    if (emailCon) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hashing the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

    const user = await User.create({
      email,
      password: hashedPassword,
      fullName,
    });

    return res.status(200).json({
      success: true,
      msg: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
