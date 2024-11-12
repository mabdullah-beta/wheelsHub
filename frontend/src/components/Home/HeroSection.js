import React, { useState, useEffect } from "react";
import { Box, Card, Typography, Input, Button, IconButton } from "@mui/joy";
import { Search } from "@mui/icons-material";
import CustomSelect from "../UniversalComponents/CustomSelect";
import SearchIcon from "@mui/icons-material/Search";
import themes from "../../themes";
import HeroImage from "../../assets/hero.png";

const HeroSection = ({ onFilterChange, onSearch }) => {
  const locations = [
    "California",
    "Gothenburg",
    "Florida",
    "New York",
    "Illinois",
  ];
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const filterConfigs = [

    {
      name: "title",
      placeholder: "Title",
      options: ["Sedan", "Coupe", "Sport", "Luxury"],
    },
    {
      name: "year",
      placeholder: "Year Make",
      options: ["2022", "2021", "2020"],
    },
    {
      name: "priceRange",
      placeholder: "Price Range",
      options: ["$10,000 - $20,000", "$20,000 - $30,000"],
    },
    {
      name: "mileage",
      placeholder: "Mileage",
      options: ["0 - 10,000 miles", "10,000-20,000 miles"],
    },
    {
      name: "transmission",
      placeholder: "Transmission",
      options: ["Automatic", "Manual"],
    },

    { name: "color", 
      placeholder: "Color", 
      options: ["Red", "Blue", "Black"] 
    },
  ];

  const [filterValues, setFilterValues] = useState({
    title: "",
    year: "",
    priceRange: "",
    mileage: "",
    transmission: "",
    color: "",
    location: selectedLocation,
  });

  const handleFilterChange = (name, value) => {
    setFilterValues((prevValues) => {
      const updatedValues = { ...prevValues, [name]: value };
      if (name === "location") {
        updatedValues["location"] = value;
      }
      return updatedValues;
    });
    onFilterChange(name, value);
  };

  // const handleClearFilters = () => {
  //   const clearedFilters = {
  //     title: "",
  //     year: "",
  //     priceRange: "",
  //     mileage: "",
  //     transmission: "",
  //     color: "",
  //     location: selectedLocation, // Keep location
  //   };
  //   setFilterValues(clearedFilters);
  //   onFilterChange(clearedFilters); // Notify parent about clearing filters
  //   setIsFiltersApplied(false); // Reset the flag

  //   // Trigger refetch with cleared parameters
  //   onSearch(clearedFilters);
  // };

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 6,
        p: 6,
        bgcolor: "white",
        borderRadius: "20px",
        backgroundImage: `url(${HeroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      <Box mb={3}>

        {/* Title */}
        <Typography level="h2" sx={{ color: "white", mb: 1 }}>
          Search In
        </Typography>

        {/* Location Selector */}
        <Box sx={{ display: "flex", alignItems: "center", color: "white" }}>

          {/* Location Selector */}
          <CustomSelect
            options={locations}
            arrowColor="white"
            border="0"
            backgroundColor="transparent"
            ring="0"
            value={selectedLocation}
            width="120px"
            onChange={(event, value) => {
              setSelectedLocation(value);
              handleFilterChange("location", value);
            }}
          />
          
        </Box>

      </Box>
      
      {/* Filters */}
      <Box
        sx={{
          bgcolor: "#F6F7F9",
          borderRadius: "20px",
          p: 4,
          boxShadow: 2,
          gap: 2,
          mb: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
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
              border: "1px solid #C3D4E966",
              borderRadius: "12px",
              padding: "4px 8px",
              minHeight: "40px",
            }}
          >

            {/* Search Icon */}
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
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {filterConfigs.map((filter) => (
              
              <CustomSelect
                key={filter.name}
                options={filter.options}
                value={filterValues[filter.name]}
                placeholder={filter.placeholder}
                onChange={(event, value) =>
                  handleFilterChange(filter.name, value)
                }
                backgroundColor="white"
                color="black"
                borderRadius="12px"
              />
              
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "15%" },
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
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
              padding: "0 16px",
              borderRadius: "12px",
              transition: "all 0.3s ease",
            }}
            onClick={() => onSearch(filterValues)}
          >
            <SearchIcon
              sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, color: "white" }}
            />
          </Button>
        </Box>
      </Box>

      {/* Clear Filters Text */}
      {/* {isFiltersApplied && (
        <Box
          sx={{
            position: "absolute",
            top: "20px",
            right: "20px",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            padding: "8px 16px",
            borderRadius: "12px",
            cursor: "pointer",
          }}
          onClick={handleClearFilters}
        >
          Clear Filters
        </Box>
      )} */}
    </Card>
  );
};

export default HeroSection;
