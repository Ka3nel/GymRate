import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

function ReviewCard({ review }) {
  return (
    review && (
      <Card
        sx={{
          width: "610px",
        }}
      >
        <CardContent
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography variant="body" color="text.primary">
              {review.title}
            </Typography>
            <div style={{ justifyContent: "right" }}>
              <Rating
                defaultValue={review.overall_rating / 20 ?? 0}
                precision={0.5}
                readOnly
              />
            </div>
          </Box>
        </CardContent>
        <CardContent
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {review.content}
          </Typography>
        </CardContent>
      </Card>
    )
  );
}

export default ReviewCard;
