import { useEffect } from "react";
import { Helmet } from "react-helmet";
export default function Logout() {
  useEffect(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("credits");
    localStorage.removeItem("avatar");
    localStorage.removeItem("name");
    window.location.href = "/";
  });
  return (
    <>
      <Helmet>
        <title>BidBitz - Logout</title>
      </Helmet>
      <div>Logging you out.</div>;
    </>
  );
}
