import { useState } from "react";
import { useReviewsContext } from "../hooks/useReviewsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Slider from "@mui/material/Slider";

const ReviewForm = ({ gym, setOpenReviewForm, fetchGymsOnMap }) => {
  const { dispatch } = useReviewsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [busyness, setBusyness] = useState("");
  const [modernity, setModernity] = useState("");
  const [variety, setVariety] = useState("");
  const [cleanliness, setCleanliness] = useState("");
  const [vibe, setVibe] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const review = {
      gym_id: gym._id,
      title,
      content: text,
      crowdness_rating: busyness,
      machine_modernity_rating: modernity,
      machine_variety_rating: variety,
      cleanliness_rating: cleanliness,
      vibe_rating: vibe,
      overall_rating: Math.round(
        (busyness + modernity + variety + cleanliness + vibe) / 5,
        0
      ),
    };

    const response = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_REVIEW", payload: json });
      await fetchGymsOnMap();
      setOpenReviewForm(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{ marginTop: "0px" }}>Add a New Review</h3>

      <label>Title: </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Description: </label>
      <textarea
        rows={4}
        style={{ width: "99%" }}
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        className={emptyFields.includes("text") ? "error" : ""}
      />

      <label>Busyness Rating: </label>
      <Slider
        aria-label="Busyness Rating"
        defaultValue={50}
        getAriaValueText={(value) => value.toString()}
        valueLabelDisplay="auto"
        shiftStep={25}
        step={5}
        marks
        min={5}
        max={100}
        onChange={(e) => setBusyness(e.target.value)}
        value={busyness}
      />

      <label style={{ marginTop: "15px" }}>Machine Modernity Rating: </label>
      <Slider
        aria-label="Machine Modernity Rating"
        defaultValue={50}
        getAriaValueText={(value) => value.toString()}
        valueLabelDisplay="auto"
        shiftStep={25}
        step={5}
        marks
        min={5}
        max={100}
        onChange={(e) => setModernity(e.target.value)}
        value={modernity}
      />

      <label style={{ marginTop: "15px" }}>Machine Variety Rating: </label>
      <Slider
        aria-label="Machine Variety Rating"
        defaultValue={50}
        getAriaValueText={(value) => value.toString()}
        valueLabelDisplay="auto"
        shiftStep={25}
        step={5}
        marks
        min={5}
        max={100}
        onChange={(e) => setVariety(e.target.value)}
        value={variety}
      />

      <label style={{ marginTop: "15px" }}>Cleanliness Rating: </label>
      <Slider
        aria-label="Cleanliness Rating"
        defaultValue={50}
        getAriaValueText={(value) => value.toString()}
        valueLabelDisplay="auto"
        shiftStep={25}
        step={5}
        marks
        min={5}
        max={100}
        onChange={(e) => setCleanliness(e.target.value)}
        value={cleanliness}
      />

      <label style={{ marginTop: "15px" }}>Vibe Rating: </label>
      <Slider
        aria-label="Vibe Rating"
        defaultValue={50}
        getAriaValueText={(value) => value.toString()}
        valueLabelDisplay="auto"
        shiftStep={25}
        step={5}
        marks
        min={5}
        max={100}
        onChange={(e) => setVibe(e.target.value)}
        value={vibe}
      />

      <button style={{ marginTop: "25px" }}>Add Review</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ReviewForm;
