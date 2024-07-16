import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const GymForm = ({ setOpenGymForm }) => {
  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [address, setAdress] = useState("");
  const [size, setSize] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const gym = {
      name: name,
      details: details,
      address: address,
      size: size,
      latitude: latitude,
      longitude: longitude,
      opening_time: openingTime,
      closing_time: closingTime,
      total_rating: 0,
      review_count: 0,
    };

    const response = await fetch("/api/gyms", {
      method: "POST",
      body: JSON.stringify(gym),
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
      setOpenGymForm(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{ marginTop: "0px" }}>Add a New Gym</h3>

      <label>Name: </label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes("name") ? "error" : ""}
        style={{ marginTop: "5px", marginBottom: "10px" }}
      />

      <label>Details: </label>
      <textarea
        rows={4}
        style={{ width: "99%" }}
        type="text"
        onChange={(e) => setDetails(e.target.value)}
        value={details}
        className={emptyFields.includes("details") ? "error" : ""}
      />

      <label>Address: </label>
      <input
        type="text"
        onChange={(e) => setAdress(e.target.value)}
        value={address}
        className={emptyFields.includes("address") ? "error" : ""}
        style={{ marginTop: "5px", marginBottom: "10px" }}
      />

      <label>Size: </label>
      <input
        type="text"
        onChange={(e) => setSize(e.target.value)}
        value={size}
        className={emptyFields.includes("size") ? "error" : ""}
        style={{ marginTop: "5px", marginBottom: "10px" }}
      />

      <label>Latitude: </label>
      <input
        type="text"
        onChange={(e) => setLatitude(e.target.value)}
        value={latitude}
        className={emptyFields.includes("latitude") ? "error" : ""}
        style={{ marginTop: "5px", marginBottom: "10px" }}
      />

      <label>Longitude: </label>
      <input
        type="text"
        onChange={(e) => setLongitude(e.target.value)}
        value={longitude}
        className={emptyFields.includes("longitude") ? "error" : ""}
        style={{ marginTop: "5px", marginBottom: "10px" }}
      />

      <label>Opening Time: </label>
      <input
        type="text"
        onChange={(e) => setOpeningTime(e.target.value)}
        value={openingTime}
        className={emptyFields.includes("opening_time") ? "error" : ""}
        style={{ marginTop: "5px", marginBottom: "10px" }}
      />

      <label>Closing Time: </label>
      <input
        type="text"
        onChange={(e) => setClosingTime(e.target.value)}
        value={closingTime}
        className={emptyFields.includes("closing_time") ? "error" : ""}
        style={{ marginTop: "5px", marginBottom: "10px" }}
      />

      <button style={{ marginTop: "25px" }}>Add Gym</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default GymForm;
