import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
import ReviewCard from "./ReviewCard";
import { Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

function GymInfoCard({ selectedGym, setSelectedGym }) {
  const theme = useTheme();
  const [reviews, setReviews] = React.useState([]);

  React.useEffect(() => {
    const getGyms = async () => {
      if (!selectedGym) {
        return;
      }
      const response = await fetch(`/api/gyms/${selectedGym._id}/reviews`, {
        method: "GET",
      });
      const json = await response.json();

      if (response.ok) {
        setReviews(json);
      }
    };

    getGyms();
  }, [selectedGym]);

  const handleDrawerClose = () => {
    setSelectedGym(undefined);
  };

  if (!selectedGym) {
    return;
  }

  const current_time = new Date().getHours() * 60 + new Date().getMinutes();

  const gym_opening_hour =
    selectedGym.opening_time &&
    parseInt(selectedGym.opening_time.split(":")[0]);
  const gym_opening_minute =
    selectedGym.opening_time &&
    parseInt(selectedGym.opening_time.split(":")[1]);
  const gym_opening_time =
    selectedGym.opening_time && gym_opening_hour * 60 + gym_opening_minute;

  const gym_closing_hour =
    selectedGym.closing_time &&
    parseInt(selectedGym.closing_time.split(":")[0]);
  const gym_closing_minute =
    selectedGym.closing_time &&
    parseInt(selectedGym.closing_time.split(":")[1]);
  const gym_closing_time =
    selectedGym.closing_time && gym_closing_hour * 60 + gym_closing_minute;

  const isOpen =
    current_time > gym_opening_time && current_time < gym_closing_time;

  return (
    selectedGym && (
      <Card
        sx={{
          padding: "45px 20px",
          position: "absolute",
          zIndex: "2000",
          top: "125px",
          left: "580px",
          height: "70vh",
          width: "610px",
          backgroundColor: "#e0e5e9bc",
        }}
      >
        <CardContent
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        >
          <IconButton
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              zIndex: "2000",
            }}
            onClick={handleDrawerClose}
          >
            <ClearIcon />
          </IconButton>
          <Typography
            style={{ textAlign: "center" }}
            gutterBottom
            variant="h4"
            component="div"
          >
            {selectedGym.name}
          </Typography>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Rating
              defaultValue={selectedGym.total_rating / 20 ?? 0}
              precision={0.5}
              readOnly
            />
            <Typography
              sx={{ mb: 1.5, fontSize: "18px" }}
              color="text.secondary"
            >
              ({selectedGym.review_count ?? 0})
            </Typography>
          </div>
          <Typography variant="body2">
            {selectedGym.address ?? "No address"}
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
                  ? ` (Closes at ${selectedGym.closing_time})`
                  : ` (Opens at ${selectedGym.opening_time})`}
              </Typography>
            </div>
          )}
          <Typography variant="body2" color="text.secondary">
            {selectedGym.description}
          </Typography>
        </CardContent>
        <CardContent
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            overflow: "auto",
            maxHeight: "",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography variant="body" color="text.primary">
              Reviews
            </Typography>
            <IconButton
              style={{
                color: "green",
              }}
              onClick={handleDrawerClose}
            >
              <AddBoxIcon />
            </IconButton>
          </Box>
          <List>
            {reviews.map((review) => (
              <ListItem
                key={review._id}
                disablePadding
                // onClick={() => setSelectedGym(gym)}
              >
                <ListItemButton>
                  <ReviewCard review={review} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    )
  );
}

export default GymInfoCard;
