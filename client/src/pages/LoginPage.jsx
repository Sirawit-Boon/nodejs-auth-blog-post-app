import { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 🐨 Todo: Exercise #4
    //  นำ Function `login` ใน AuthContext มา Execute ใน Event Handler ตรงนี้

    try {
      const login = async (data) => {
        return axios.post("http://localhost:4000/login", data);
      };

       const response = await login({ username, password });
       if (response.status === 200) {
        alert("Login successful!");
        localStorage.setItem("token", response.data.token);
       }
    } catch (error) {
       if (
         error.response &&
         error.response.data &&
         error.response.data.message
       ) {
         alert(`Login failed: ${error.response.data.message}`);
       } else {
         alert("An error occurred. Please try again.");
       }
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login Page</h1>
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
              type="password"
              placeholder="Enter password here"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
            />
          </label>
        </div>

        <div className="form-actions">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
