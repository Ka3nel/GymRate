import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextRating from "./TextRating";

function ReviewCard({ review, detailsItem, setDetailsItem }) {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`/api/user/${review.user_id}`, {
        method: "GET",
      });
      const json = await response.json();

      if (response.ok) {
        setUser(json);
      }
    };

    getUser();
  }, [review.user_id]);

  const handleSeeDetails = () => {
    if (detailsItem === review._id) {
      setDetailsItem();
    } else {
      setDetailsItem(review._id);
    }
  };

  return (
    review && (
      <Card
        sx={{
          width: "610px",
          marginBottom: "10px",
        }}
      >
        <CardContent
          style={{
            backgroundColor: "#ffffff",
            paddingBottom: "10px",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            {user && (
              <Typography variant="body" color="text.primary">
                {user.username}
              </Typography>
            )}
            <div style={{ justifyContent: "right" }}>
              <Rating
                defaultValue={review.overall_rating / 20 ?? 0}
                precision={0.5}
                readOnly
              />
            </div>
          </Box>
          <Divider style={{ marginBottom: "15px" }} />
          <Typography
            variant="body"
            color="text.primary"
            style={{ marginBottom: "15px" }}
          >
            {review.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ marginBottom: "15px" }}
          >
            {review.content}
          </Typography>
          {detailsItem === review._id ? (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <div style={{ width: "75px", textAlign: "center" }}>
                  <Typography variant="body2" color="text.primary">
                    Busyness
                  </Typography>
                </div>
                <div style={{ width: "75px", textAlign: "center" }}>
                  <Typography variant="body2" color="text.primary">
                    Modernity
                  </Typography>
                </div>
                <div style={{ width: "75px", textAlign: "center" }}>
                  <Typography variant="body2" color="text.primary">
                    Variety
                  </Typography>
                </div>
                <div style={{ width: "75px", textAlign: "center" }}>
                  <Typography variant="body2" color="text.primary">
                    Cleanliness
                  </Typography>
                </div>
                <div style={{ width: "75px", textAlign: "center" }}>
                  <Typography variant="body2" color="text.primary">
                    Vibe
                  </Typography>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  marginBottom: "15px",
                }}
              >
                <TextRating rating={review.crowdness_rating} />
                <TextRating rating={review.machine_modernity_rating} />
                <TextRating rating={review.machine_variety_rating} />
                <TextRating rating={review.cleanliness_rating} />
                <TextRating rating={review.vibe_rating} />
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <Button
            style={{
              color: "#0a62d0",
            }}
            onClick={handleSeeDetails}
          >
            {detailsItem === review._id ? "Close details" : "Show details"}
          </Button>
        </CardContent>
      </Card>
    )
  );
}

export default ReviewCard;
