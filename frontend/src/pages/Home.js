import * as React from "react";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { GymsContextProvider } from "../context/GymsContext";
import { useGymsContext } from "../hooks/useGymsContext";

// import search bar component
import Searchbar from "../components/Searchbar";

// import mui components
import { Button } from "@mui/material";

const Home = () => {
  const { gyms, dispatch } = useGymsContext();

  return (
    <div className="home">
      <Searchbar />
      <Button
        variant="outlined"
        style={{
          position: "absolute",
          left: "525px",
          zIndex: "2000",
          marginTop: "38px",
        }}
      >
        Search in this area
      </Button>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        attributionControl={false}
      />
    </div>
  );
};

export default Home;
