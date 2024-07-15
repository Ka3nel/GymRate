import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3.2 + ITEM_PADDING_TOP,
      width: 125,
    },
  },
};

const options = ["Name", "Rating", "Size"];

export default function MultipleSelectCheckmarks() {
  const [filters, setFilters] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilters(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl
        sx={{ m: 1, width: 125, height: 10 }}
        style={{
          position: "absolute",
          left: "770px",
          zIndex: "2000",
          marginTop: "36px",
        }}
      >
        <InputLabel id="multiple-checkbox-label" size="small">
          Sort by
        </InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          size="small"
          multiple
          value={filters}
          onChange={handleChange}
          input={<OutlinedInput label="Sort by" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem
              sx={{ padding: "6px 3px", height: "40px" }}
              key={option}
              value={option}
            >
              <Checkbox size="small" checked={filters.indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
