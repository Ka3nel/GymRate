import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import { useGymsContext } from "../hooks/useGymsContext";
import GymCard from "./GymCard";

const drawerWidth = 567;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: "112px",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function PersistentDrawerLeft({
  open,
  setOpen,
  selectedGym,
  setSelectedGym,
  setShowLocations,
}) {
  const theme = useTheme();
  const { gymsOnMap } = useGymsContext();

  const handleDrawerClose = () => {
    setOpen(false);
    setShowLocations(false);
    setSelectedGym(undefined);
  };

  React.useEffect(() => {}, [gymsOnMap]);
  return (
    <Box className="scrollable-container" sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            zIndex: 1,
            background: "#e0e5e9bc",
          },
        }}
        style={{ position: "absolute", left: "0px", top: "200px" }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton
            style={{
              position: "absolute",
              top: "50vh",
              zIndex: "2000",
            }}
            onClick={handleDrawerClose}
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {gymsOnMap.map((gym) => (
            <ListItem
              key={gym._id}
              disablePadding
              onClick={() => setSelectedGym(gym)}
            >
              <ListItemButton>
                <GymCard gym={gym} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

export default PersistentDrawerLeft;
