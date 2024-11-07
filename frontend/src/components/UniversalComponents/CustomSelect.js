import React from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import themes from "../../themes";

const CustomSelect = ({
  options,
  value,
  onChange,
  backgroundColor = themes.colors.primary,
  color = "white",
  borderRadius = null,
}) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      indicator={<KeyboardArrowDown />}
      sx={{
        width: 200,
        bgcolor: backgroundColor,
        color: color,
        border: "none",
        borderRadius: { borderRadius },
        outline: "none",
        boxShadow: "none",
        "&:hover": {
          bgcolor: "transparent",
          color: color,
        },
        [`& .${selectClasses.indicator}`]: {
          transition: "0.2s",
          [`&.${selectClasses.expanded}`]: {
            transform: "rotate(-180deg)",
          },
        },
      }}
      variant="outlined"
    >
      {options.map((option) => (
        <Option
          key={option}
          value={option}
          sx={{
            color: "black",
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          {option}
        </Option>
      ))}
    </Select>
  );
};

export default CustomSelect;