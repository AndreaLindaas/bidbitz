import { TextField, Button } from "@mui/material";
import "./Login.scss";
import { Link } from "react-router-dom";
import { API_URL } from "../../lib/constants";
import { useState } from "react";
import { Helmet } from "react-helmet";
export default function Login() {
  const [errorMessages, setErrorMessages] = useState([]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();

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
        setErrorMessages(data.errors);
      } else {
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("user_email", data.email);
        localStorage.setItem("credits", data.credits);
        localStorage.setItem("avatar", data.avatar);
        localStorage.setItem("name", data.name);
        window.location.href = "/";
      }
    } catch (error) {
      setErrorMessages([
        { message: "Something went wrong. Please try again." },
      ]);
    }
  };
  const showErrorMessages = () => {
    return errorMessages.map((message, i) => {
      return <li key={i}>- {message.message}</li>;
    });
  };
  return (
    <>
      <Helmet>
        <title>BidBitz - Login</title>
      </Helmet>
      <div className="login">
        <h1 className="login">Login</h1>
        <form onSubmit={handleOnSubmit}>
          <div>
            <TextField
              id="filled-basic"
              name="email"
              label="Email"
              type="email"
              placeholder="...@stud.noroff.no"
              variant="filled"
              fullWidth
            />
          </div>
          <div>
            <TextField
              id="filled-basic"
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
              variant="filled"
              fullWidth
            />
          </div>
          <div className="error-message">
            {" "}
            <ul>{showErrorMessages()}</ul>
          </div>
          <div className="login-button">
            <Button type="submit" variant="contained" className="primary">
              Login
            </Button>
          </div>
        </form>
        <p className="text-login">
          Don't have an account?
          <Link to="/register">
            <span className="highlight"> Sign up here!</span>
          </Link>
        </p>
      </div>
    </>
  );
}
