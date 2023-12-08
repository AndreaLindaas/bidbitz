import { useEffect } from "react";
export default function Logout() {
  useEffect(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("credits");
    localStorage.removeItem("avatar");
    localStorage.removeItem("name");
    window.location.href = "/";
  });
  return <div>Logging you out.</div>;
}
