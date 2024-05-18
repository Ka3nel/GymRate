import { useState, useEffect } from "react";
import { useGymsContext } from "../hooks/useGymsContext";

// components
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Searchbar = ({ setOpenDrawer, setShowLocations }) => {
  const { dispatch } = useGymsContext();
  const [searchedText, setSearchedText] = useState("");

  const fetchGymsonMap = async () => {
    const response = await fetch(
      `/api/gyms/onMap?searchedText=${searchedText}`
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_GYMS_ON_MAP", payload: json });
    }
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      fetchGymsonMap();
    }, 1000);

    return () => clearTimeout(getData);
  }, [searchedText]);

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 300 }}
      style={{
        position: "absolute",
        left: "200px",
        zIndex: "2000",
        marginTop: "31px",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search a location..."
        inputProps={{ "aria-label": "search google maps" }}
        onChange={(e) => setSearchedText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            setOpenDrawer(true);
            setShowLocations(true);
          }
        }}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={() => {
          setOpenDrawer(true);
          setShowLocations(true);
        }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Searchbar;
