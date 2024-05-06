import React, { useState, useRef } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useGymsContext } from "../hooks/useGymsContext";

// import search bar component
import Searchbar from "../components/Searchbar";
import Drawer from "../components/Drawer";

// import mui components
import { Button } from "@mui/material";
import { Room } from "@mui/icons-material";

const Home = () => {
  const mapRef = useRef(null);
  const [viewState, setViewState] = useState({
    latitude: 44.4,
    longitude: 26.1,
    zoom: 10,
  });
  const { gymsOnMap, dispatch } = useGymsContext();
  const [showLocations, setShowLocations] = useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const fetchGymsOnMap = async (swLat, swLng, neLat, neLng) => {
    const response = await fetch(
      `/api/gyms/onMap?swLat=${swLat}&swLng=${swLng}&neLat=${neLat}&neLng=${neLng}`
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_GYMS_ON_MAP", payload: json });
    }
  };

  const handleShowLocations = async () => {
    const map = mapRef.current.getMap();
    const bounds = map.getBounds();

    // Get coordinates of the southwest and northeast corners
    const southwest = bounds.getSouthWest();
    const northeast = bounds.getNorthEast();

    await fetchGymsOnMap(
      southwest.lat,
      southwest.lng,
      northeast.lat,
      northeast.lng
    );

    // You can now use southwest and northeast to filter locations
    console.log("Southwest:", southwest);
    console.log("Northeast:", northeast);

    setShowLocations(true);
    setOpenDrawer(true);
  };

  return (
    <div className="home">
      <Drawer open={openDrawer} setOpen={setOpenDrawer} />
      <Searchbar />
      <Button
        variant="outlined"
        style={{
          position: "absolute",
          left: "525px",
          zIndex: "2000",
          marginTop: "38px",
        }}
        onClick={handleShowLocations}
      >
        Search in this area
      </Button>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        {...viewState}
        ref={mapRef}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onMove={(evt) => {
          setViewState(evt.viewState);
        }}
        attributionControl={false}
      >
        {showLocations &&
          gymsOnMap.map((gym) => (
            <Marker
              key={gym._id}
              latitude={gym.latitude}
              longitude={gym.longitude}
            >
              <Room
                style={{
                  fontSize:
                    viewState.zoom < 10.5
                      ? viewState.zoom < 8.5
                        ? 47
                        : 400 / viewState.zoom
                      : 3.628 * viewState.zoom,
                  color: "crimson",
                }}
                anchor="bottom"
              />
            </Marker>
          ))}
      </Map>
    </div>
  );
};

export default Home;
