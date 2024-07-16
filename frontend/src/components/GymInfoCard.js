import * as React from "react";
import { useReviewsContext } from "../hooks/useReviewsContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function GymInfoCard({ selectedGym, setSelectedGym, fetchGymsOnMap }) {
  const { dispatch, reviews } = useReviewsContext();
  const [detailsItem, setDetailsItem] = React.useState();
  const [openReviewForm, setOpenReviewForm] = React.useState(false);

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
        dispatch({ type: "SET_REVIEWS", payload: json });
      }
    };

    getGyms();
  }, [selectedGym, dispatch]);

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
    <div>
      {selectedGym && (
        <Card
          sx={{
            padding: "20px",
            position: "absolute",
            zIndex: "2000",
            top: "125px",
            left: "580px",
            height: "76vh",
            width: "610px",
            backgroundColor: "#e0e5e9bc",
          }}
        >
          <CardContent
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "4px",
              marginBottom: "15px",
            }}
          >
            <IconButton
              style={{
                position: "absolute",
                top: "25px",
                right: "25px",
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
              <Divider />
            </Typography>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Rating
                value={selectedGym.total_rating / 20 ?? 0}
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
            className="scrollable-container"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "4px",
              overflow: "auto",
              height: "70%",
              overflowY: "auto",
              paddingBottom: "0px",
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
                onClick={() => setOpenReviewForm(true)}
              >
                <AddBoxIcon />
              </IconButton>
            </Box>
            <Divider />
            {reviews && reviews.length ? (
              <List>
                {reviews.map((review) => (
                  <ListItem
                    key={review._id}
                    disablePadding
                    // onClick={() => setSelectedGym(gym)}
                  >
                    <ReviewCard
                      review={review}
                      detailsItem={detailsItem}
                      setDetailsItem={setDetailsItem}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ marginTop: "15px" }}
              >
                No reviews
              </Typography>
            )}
          </CardContent>
        </Card>
      )}
      <Modal
        style={{ zIndex: "4000" }}
        open={openReviewForm}
        onClose={() => setOpenReviewForm(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ReviewForm
            gym={selectedGym}
            setOpenReviewForm={setOpenReviewForm}
            fetchGymsOnMap={fetchGymsOnMap}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default GymInfoCard;
