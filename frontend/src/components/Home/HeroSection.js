import React, { useState } from "react";
import { Box, Card, Typography, Input, Button, IconButton } from "@mui/joy";
import { Search } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import CustomSelect from "../UniversalComponents/CustomSelect";
import themes from "../../themes";

const HeroSection = () => {
  const locations = ["California", "Texas", "Florida", "New York", "Illinois"];
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  // Example options for filters
  const filterOptions = [
    "Model name",
    "Year make",
    "Price range",
    "Mileage",
    "Transmission",
    "Color",
  ];

  return (
    <Card
      variant="outlined"
      sx={{ mb: 4, p: 4, bgcolor: themes.colors.primary }}
    >
      {/* Header Section */}
      <Box mb={3}>
        <Typography level="h2" sx={{ color: "white", mb: 1 }}>
          Search In
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", color: "white" }}>
          <CustomSelect
            options={locations}
            value={selectedLocation}
            onChange={(event, value) => {
              console.log("Selected Value:", value);
              setSelectedLocation(value);
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: "#F6F7F9",
          borderRadius: "8px",
          p: 3,
          boxShadow: 2,
          gap: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { md: "stretch" },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "85%" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              bgcolor: "white",
              border: "0px solid #ccc",
              borderRadius: "10px",
              padding: "4px 8px",
              minHeight: "40px",
            }}
          >
            <IconButton sx={{ padding: 0, bgcolor: "white" }}>
              <Search />
            </IconButton>
            <Input
              placeholder="Search any car"
              sx={{
                "--Input-focusedThickness": "0",
                flex: 1,
                border: "none",
                outline: "none",
                boxShadow: "none",
                paddingLeft: "8px",
                bgcolor: "white",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {filterOptions.map((placeholder) => (
              <CustomSelect
                key={placeholder}
                options={[placeholder]}
                value={placeholder}
                onChange={() => {}}
                backgroundColor="white"
                color="black"
              />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "15%" },
            display: "flex",
            height: "auto",
            mt: { xs: 2, md: 0 },
          }}
        >
          <Button
            sx={{
              bgcolor: themes.colors.primary,
              color: "white",
              width: "100%",
              height: "100%",
              minHeight: { xs: "50px", md: "auto" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              minWidth: 0,
            }}
          >
            <SearchIcon sx={{ fontSize: { xs: "1.5rem", md: "2.5rem" } }} />
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default HeroSection;
