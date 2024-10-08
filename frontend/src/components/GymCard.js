import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

function GymCard({ gym }) {
  const current_time = new Date().getHours() * 60 + new Date().getMinutes();

  const gym_opening_hour =
    gym.opening_time && parseInt(gym.opening_time.split(":")[0]);
  const gym_opening_minute =
    gym.opening_time && parseInt(gym.opening_time.split(":")[1]);
  const gym_opening_time =
    gym.opening_time && gym_opening_hour * 60 + gym_opening_minute;

  const gym_closing_hour =
    gym.closing_time && parseInt(gym.closing_time.split(":")[0]);
  const gym_closing_minute =
    gym.closing_time && parseInt(gym.closing_time.split(":")[1]);
  const gym_closing_time =
    gym.closing_time && gym_closing_hour * 60 + gym_closing_minute;

  const isOpen =
    current_time > gym_opening_time && current_time < gym_closing_time;

  return (
    <Card sx={{ minWidth: 495, background: "#ffffff" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {gym.name}
        </Typography>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Rating value={gym.total_rating / 20} precision={0.5} readOnly />
          <Typography sx={{ mb: 1.5, fontSize: "18px" }} color="text.secondary">
            ({gym.review_count ?? 0})
          </Typography>
        </div>
        <Typography variant="body2">{gym.address ?? "No address"}</Typography>
        {gym_opening_time && (
          <div>
            <Typography
              display="inline"
              variant="body2"
              color={isOpen ? "green" : "red"}
            >
              {isOpen ? "Open" : "Closed"}
            </Typography>
            <Typography display="inline" variant="body2">
              {isOpen
                ? ` (Closes at ${gym.closing_time})`
                : ` (Opens at ${gym.opening_time})`}
            </Typography>
          </div>
        )}
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default GymCard;
