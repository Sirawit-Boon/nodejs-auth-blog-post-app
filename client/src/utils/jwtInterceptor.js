import axios from "axios";

function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    // 🐨 Todo: Exercise #6
    //  ให้เขียน Logic ในการแนบ Token เข้าไปใน Header ของ Request
    // เมื่อมีการส่ง Request จาก Client ไปหา Server
    // ภายใน Callback Function axios.interceptors.request.use
    const token = localStorage.getItem("token"); // ดึง Token จาก Local Storage
    if (token) {
      req.headers.Authorization = `Bearer ${token}`; // แนบ Token ใน Header
    }

    return req;
  });

  axios.interceptors.response.use(
    (req) => {
      return req;
    },
    (error) => {
      // 🐨 Todo: Exercise #6
      //  ให้เขียน Logic ในการรองรับเมื่อ Server ได้ Response กลับมาเป็น Error
      // โดยการ Redirect ผู้ใช้งานไปที่หน้า Login และลบ Token ออกจาก Local Storage
      // ภายใน Error Callback Function ของ axios.interceptors.response.use
      if (error.response?.status === 401) {
        // ลบ Token ออกจาก Local Storage
        localStorage.removeItem("token");

        // Redirect ไปยังหน้า Login
        const navigate = useNavigate(); // ใช้ React Router
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
}

export default jwtInterceptor;
