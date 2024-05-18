import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
    <Card sx={{ minWidth: 445, background: "#f5eedc" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {gym.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {gym.total_rating ?? 0} STARS ({gym.review_count ?? 0})
        </Typography>
        <Typography variant="body2">
          {gym.address ?? "Nothing street"}
        </Typography>
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
