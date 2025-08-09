import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!(fullname && email && password)) {
      return res.status(400).send("All Fields are compulsory");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send("User already exist");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fullname, email, password: encryptedPassword });
    const token = jwt.sign({ id: user._id, email }, "shhh", { expiresIn: "10hr" });
    user.token = token;
    res.json({ success: 1, token, user });
  } catch (error) {
    console.log("Failed to register user", error);
    res.status(500).send("Failed to register user");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All Fields are compulsory");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User does not exist");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid password");
    }
    const token = jwt.sign({ id: user._id, email }, "shhh", { expiresIn: "10hr" });
    user.token = token;
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, options).json({ success: true, token, user });
  } catch (error) {
    console.log("Failed to login user", error);
    res.status(500).send("Failed to login user");
  }
};

export const getUsers = async (req, res) => {
  try {
    let users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log("Error Fetching Users:", error);
  }
};
