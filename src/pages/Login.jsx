import { TextField } from "@mui/material";
import "./login.scss";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
export default function Login() {
  const handleOnSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleOnSubmit}>
        <div>
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            fullWidth
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
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
        <Link to="#">
          <span>Sign up here!</span>
        </Link>
      </p>
    </>
  );
}
