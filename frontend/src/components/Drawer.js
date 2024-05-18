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

const drawerWidth = 513;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: "112px",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function PersistentDrawerLeft({ open, setOpen }) {
  const theme = useTheme();
  const { gymsOnMap } = useGymsContext();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            zIndex: 1,
            background: "#f5eedcbc",
          },
        }}
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
            <ListItem key={gym._id} disablePadding>
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
