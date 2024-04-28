import React, { useEffect, useState } from "react";
import { useGymsContext } from "../hooks/useGymsContext";

// components
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

const Searchbar = () => {
  const { gyms, dispatch } = useGymsContext();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchGyms = async () => {
      const response = await fetch("/api/gyms");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_GYMS", payload: json });
      }
    };

    fetchGyms();
  }, [dispatch]);

  return (
    <Stack sx={{ width: 300, margin: "auto" }}>
      <Autocomplete
        id="GymRate-demo"
        style={{
          position: "absolute",
          left: "200px",
          zIndex: "2000",
          marginTop: "28px",
        }}
        sx={{ width: 300 }}
        getOptionLabel={(gyms) => gyms.name}
        open={open}
        onInputChange={(events, value) => setOpen(value !== "")}
        options={gyms}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        noOptionsText="No locations"
        renderOption={(props, gyms) => {
          return (
            <Box component="li" {...props} key={gyms._id}>
              {gyms.name}
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField {...params} label="Add a location" fullWidth />
        )}
      />
    </Stack>
  );
};

export default Searchbar;
