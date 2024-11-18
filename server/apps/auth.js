import { Router } from "express";
import { db } from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const authRouter = Router();

// 🐨 Todo: Exercise #1
// ให้สร้าง API เพื่อเอาไว้ Register ตัว User แล้วเก็บข้อมูลไว้ใน Database ตามตารางที่ออกแบบไว้
authRouter.post("/register", async (req, res) => {
  try {
    const user = {
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    const collection = db.collection("users");
    if (!user.username || !user.password || !user.firstName || !user.lastName) {
      return res.status(400).json({ message: "Required field." });
    }

    const existingUser = await collection.findOne({ username: user.username });
    if (existingUser) {
      return res.status(409).json({ message: "This user name already exist" });
    }
    console.log(existingUser);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const result = await collection.insertOne(user);
    console.log(result);
    return res
      .status(200)
      .json({ message: "User has been created successfully." });
  } catch (error) {
    return res.status(500).json({ message: `Error ${error}` });
  }
});

// 🐨 Todo: Exercise #3
// ให้สร้าง API เพื่อเอาไว้ Login ตัว User ตามตารางที่ออกแบบไว้
authRouter.post("/login", async (req, res) => {
  try {
    // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    const user = await db.collection("users").findOne({
      username: req.body.username,
    });

    
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ตรวจสอบความถูกต้องของรหัสผ่าน
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // สร้าง Token
    const token = jwt.sign(
      {
        id: user._id, // ใช้ `_id` จาก MongoDB
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.SECRET_KEY, // ใช้ SECRET_KEY 
      {
        expiresIn: "15m", 
      }
    );

    // ส่ง Response กลับ
    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default authRouter;
