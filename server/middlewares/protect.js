// 🐨 Todo: Exercise #5
// สร้าง Middleware ขึ้นมา 1 อันชื่อ Function ว่า `protect`
// เพื่อเอาไว้ตรวจสอบว่า Client แนบ Token มาใน Header ของ Request หรือไม่
import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // ดึง Token จาก Header "Authorization"

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // ตรวจสอบความถูกต้องของ Token
    req.user = decoded; // เก็บข้อมูลผู้ใช้จาก Token ใน `req.user`
    next(); // เรียกใช้ Middleware ถัดไป
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

export default protect;