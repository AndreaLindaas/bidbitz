import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { API_URL } from "../../lib/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const { email, password, name, avatar } = event.target.elements;
    console.log(event.target.elements);

    const payload = {
      name: name.value,
      email: email.value,
      password: password.value,
      avatar: avatar.value,
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
      <div className="register">
        <h1>Sign up</h1>
        <form onSubmit={handleOnSubmit}>
          <div>
            <TextField
              id="filled-basic"
              name="name"
              label="Name"
              variant="filled"
              fullWidth
            />
          </div>
          <div>
            <TextField
              id="filled-basic"
              name="email"
              label="Email"
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
              variant="filled"
              fullWidth
            />
          </div>
          <div>
            <TextField
              id="filled-basic"
              name="avatar"
              label="Url"
              variant="filled"
              fullWidth
            />
          </div>
          <Button type="submit" variant="contained" className="tertiary">
            Sign up
          </Button>
        </form>
        {errorMessage}
        <p className="text-register">
          Allredy have an account?
          <Link to="/login">
            <span className="highlight"> Login here!</span>
          </Link>
        </p>
      </div>
    </>
  );
}
