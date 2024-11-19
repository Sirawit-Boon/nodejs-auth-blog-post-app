import React, { useState } from "react";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });

  const login = async ({ username, password }) => {
    // 🐨 Todo: Exercise #4
    //  ให้เขียน Logic ของ Function `login` ตรงนี้
    //  Function `login` ทำหน้าที่สร้าง Request ไปที่ API POST /login
    //  ที่สร้างไว้ด้านบนพร้อมกับ Body ที่กำหนดไว้ในตารางที่ออกแบบไว้

    setState({ ...state, loading: true, error: null });
    try {
      const response = await axios.post("http://localhost:4000/login", {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setState({
          ...state,
          loading: false,
          user: { username }, // เก็บข้อมูลผู้ใช้ที่ล็อกอิน
          error: null,
        });
        alert("Login successful!");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      setState({ ...state, loading: false, error: errorMessage });
      alert(`Login failed: ${errorMessage}`);
    }
  };
  const register = async ({ username, password, firstName, lastName }) => {
    // 🐨 Todo: Exercise #2
    //  ให้เขียน Logic ของ Function `register` ตรงนี้
    //  Function register ทำหน้าที่สร้าง Request ไปที่ API POST /register
    //  ที่สร้างไว้ด้านบนพร้อมกับ Body ที่กำหนดไว้ในตารางที่ออกแบบไว้
    setState({ ...state, loading: true, error: null });
    try {
      await axios.post("http://localhost:4000/register", {
        username,
        password,
        firstName,
        lastName,
      });
      setState({ ...state, loading: false, error: null });
      alert("Registration successful!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during registration. Please try again.";
      setState({ ...state, loading: false, error: errorMessage });
      alert(`Registration failed: ${errorMessage}`);
    }
  };

  const logout = () => {
    // 🐨 Todo: Exercise #7
    //  ให้เขียน Logic ของ Function `logout` ตรงนี้
    //  Function logout ทำหน้าที่ในการลบ JWT Token ออกจาก Local Storage
    localStorage.removeItem("token");
    setState({ ...state, user: null, error: null });
    alert("Logged out successfully!");
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ state, login, logout, register, isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
