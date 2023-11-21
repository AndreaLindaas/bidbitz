import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("credits");
    localStorage.removeItem("avatar");
    navigate("/");
  });
  return <div>Logging you out.</div>;
}
