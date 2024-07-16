import React, { useState, useRef } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useGymsContext } from "../hooks/useGymsContext";

// import search app components
import Searchbar from "../components/Searchbar";
import FilterBox from "../components/FilterBox";
import Drawer from "../components/Drawer";
import GymInfoCard from "../components/GymInfoCard";
import GymForm from "../components/GymForm";

// import mui components
import { Button } from "@mui/material";
import { RoomOutlined } from "@mui/icons-material";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

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

const Home = () => {
  const mapRef = useRef(null);
  const [viewState, setViewState] = useState({
    latitude: 44.4,
    longitude: 26.1,
    zoom: 10,
  });
  const { gymsOnMap, dispatch } = useGymsContext();
  const [searchbarText, setSearchbarText] = useState("");
  const [showLocations, setShowLocations] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedGym, setSelectedGym] = useState(undefined);
  const [filters, setFilters] = React.useState([]);
  const [openGymForm, setOpenGymForm] = React.useState(false);

  const fetchGymsOnMap = async () => {
    const map = mapRef.current.getMap();
    const bounds = map.getBounds();

    // Get coordinates of the southwest and northeast corners
    const southwest = bounds.getSouthWest();
    const northeast = bounds.getNorthEast();

    const hasName = filters.includes("Name");
    const hasRating = filters.includes("Rating");
    const hasSize = filters.includes("Size");

    const response = await fetch(
      `/api/gyms/onMap?swLat=${southwest.lat}&swLng=${southwest.lng}&neLat=${northeast.lat}&neLng=${northeast.lng}&searchedText=${searchbarText}&nameFilter=${hasName}&ratingFilter=${hasRating}&sizeFilter=${hasSize}`
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_GYMS_ON_MAP", payload: json });
      if (selectedGym !== undefined) {
        const newSelectedGym = json.find((gym) => gym._id === selectedGym._id);
        if (newSelectedGym) setSelectedGym(newSelectedGym);
      }
    }
  };
  const handleShowLocations = async () => {
    await fetchGymsOnMap();

    setShowLocations(true);
    setOpenDrawer(true);
  };

  return (
    <div>
      <Drawer
        open={openDrawer}
        setOpen={setOpenDrawer}
        selectedGym={selectedGym}
        setSelectedGym={setSelectedGym}
        setShowLocations={setShowLocations}
      />
      <GymInfoCard
        selectedGym={selectedGym}
        setSelectedGym={setSelectedGym}
        fetchGymsOnMap={fetchGymsOnMap}
      />
      <Searchbar
        setOpenDrawer={setOpenDrawer}
        setShowLocations={setShowLocations}
        setSearchbarText={setSearchbarText}
      />
      <Button
        variant="outlined"
        style={{
          position: "absolute",
          left: "575px",
          zIndex: "2000",
          marginTop: "38px",
          color: "#0a62d0",
          borderColor: "#0a62d0",
        }}
        onClick={handleShowLocations}
      >
        Search in this area
      </Button>
      <FilterBox filters={filters} setFilters={setFilters} />
      <IconButton
        className="addLocation"
        size="large"
        color="success"
        style={{
          transform: "scale(2)",
          position: "absolute",
          bottom: "50px",
          right: "50px",
          zIndex: "2000",
          background: "white",
        }}
        onClick={() => {
          setOpenGymForm(true);
          setShowLocations(false);
          setOpenDrawer(false);
        }}
      >
        <AddLocationIcon style={{ transform: "scale(2)" }} />
      </IconButton>
      <Modal
        style={{ zIndex: "4000" }}
        open={openGymForm}
        onClose={() => setOpenGymForm(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <GymForm setOpenGymForm={setOpenGymForm} />
        </Box>
      </Modal>
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
              <RoomOutlined
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
