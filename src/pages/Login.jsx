import { TextField } from "@mui/material";
import "./Login.scss";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { API_URL } from "../lib/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target.elements);
    const { email, password } = event.target.elements;
    const payload = {
      email: email.value,
      password: password.value,
    };
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const data = await res.json();

      if (data.statusCode > 300) {
        setErrorMessage(data.errors[0].message);
      } else {
        navigate("/");
      }

      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("user_email", data.email);
      localStorage.setItem("credits", data.credits);
      localStorage.setItem("avatar", data.avatar);
    } catch (error) {
      console.warn("An error occurred", error);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleOnSubmit}>
        <div>
          <TextField
            id="standard-basic"
            name="email"
            label="Email"
            variant="standard"
            fullWidth
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            name="password"
            label="Password"
            variant="standard"
            fullWidth
          />
        </div>
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
      <p className="text-login">
        Don't have an account?
        <Link to="/register">
          <span>Sign up here!</span>
        </Link>
      </p>
      {errorMessage}
    </>
  );
}
