import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Auth.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login Successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        alert(data.message);
      }  

    } catch (error) {
      console.log(error);
    }
  }

  return (
  <div className="auth-container">
    <div className="auth-box">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

        <button type="submit">Login</button>
      </form>

      <p>
        New user? <Link to="/register">Create account</Link>
      </p>
    </div>
  </div>
);
}

export default Login;