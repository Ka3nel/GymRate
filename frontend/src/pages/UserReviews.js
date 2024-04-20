import { useEffect } from "react";
import { useReviewsContext } from "../hooks/useReviewsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//components
import ReviewDetails from "../components/ReviewDetails";
import ReviewForm from "../components/ReviewForm";

const Home = () => {
  const { reviews, dispatch } = useReviewsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch("/api/reviews", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_REVIEWS", payload: json });
      }
    };

    if (user) {
      fetchReviews();
    }
  }, [dispatch, user]);

  return (
    <div className="userReviews">
      {reviews &&
        reviews.map((review) => (
          <ReviewDetails review={review} key={review._id} />
        ))}
    </div>
  );
};

export default Home;
