import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import { API_URL } from "../../lib/constants";
import { useEffect } from "react";
import { useState } from "react";
export default function Profile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const name = localStorage.getItem("name");
    const accessToken = localStorage.getItem("access_token");
    console.log(profile);
    fetch(`${API_URL}/profiles/${name}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((l) => {
        setProfile(l);
        console.log(profile);
      });
  }, []);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 70, height: 70 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {profile.name}
        </Typography>
        <Button variant="contained" size="small">
          Change Avatar
        </Button>
        <Typography variant="body2" color="text.secondary">
          {profile.credits}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Won
        </Typography>
      </CardContent>
    </Card>
  );
}
