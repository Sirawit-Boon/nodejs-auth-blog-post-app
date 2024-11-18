import { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 🐨 Todo: Exercise #2
    // นำ Function `register` ใน AuthContext มา Execute ใน Event Handler ตรงนี้
    const register = async (data) => {
      return axios.post("http://localhost:4000/register", data);
    };

    try {
      const response = await register({
        username,
        password,
        firstName,
        lastName,
      });
      console.log(response);
       if (response.status === 201) {
         alert("Registration successful!");
         }
      
    } catch (error) {
      if (error.response) {
        // แสดงข้อความแจ้งข้อผิดพลาดจาก API
        alert(`Registration failed: ${error.response.data.message}`);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Register Form</h1>
        <div className="input-container">
          <label>
            Username
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter username here"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              value={username}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Password
            <input
              id="password"
              name="password"
              type="text"
              placeholder="Enter password here"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            First Name
            <input
              id="firstname"
              name="firstname"
              type="text"
              placeholder="Enter first name here"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              value={firstName}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Last Name
            <input
              id="lastname"
              name="lastname"
              type="text"
              placeholder="Enter last name here"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              value={lastName}
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
