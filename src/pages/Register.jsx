import { TextField } from "@mui/material";
import "./login.scss";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { API_URL } from "../lib/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const { email, password, name, url } = event.target.elements;
    console.log(event.target.elements);

    const payload = {
      name: name.value,
      email: email.value,
      password: password.value,
      url: url.value,
    };
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json",
        },
      });
      const resJSON = await res.json();

      if (resJSON.statusCode > 300) {
        setErrorMessage(resJSON.errors[0].message);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.warn("An error occurred", error);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleOnSubmit}>
        <div>
          <TextField
            id="standard-basic"
            name="name"
            label="Name"
            variant="standard"
            fullWidth
          />
        </div>
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
        <div>
          <TextField
            id="standard-basic"
            name="url"
            label="Url"
            variant="standard"
            fullWidth
          />
        </div>
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
      {errorMessage}
      <p className="text-login">
        Allredy have an account?
        <Link to="#">
          <span>Login here!</span>
        </Link>
      </p>
    </>
  );
}
