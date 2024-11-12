// Home.js
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/joy";
import CarCard from "../components/Home/CarCard";
import HeroSection from "../components/Home/HeroSection";
import PromotionalCard from "../components/Home/PromotionalCard";

const API_URL = "http://127.0.0.1:8000/deals/";

const Home = () => {
  const [allDeals, setAllDeals] = useState([]);
  const [visibleCarsCount, setVisibleCarsCount] = useState(10);
  const [loading, setLoading] = useState(true);
  const [filterValues, setFilterValues] = useState({
    location: "",
    make: "",
    year: "",
    priceRange: "",
    mileage: "",
    transmission: "",
    color: "",
  });

  useEffect(() => {
    fetchFilteredDeals(); // Initial fetch without filters
  }, []);

  const fetchFilteredDeals = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, { params: filters });
      setAllDeals(response.data.deals); // Update state with fetched deals
    } catch (error) {
      console.error("Failed to fetch deals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    setVisibleCarsCount((prevCount) => prevCount + 10);
  };

  const handleFilterChange = (name, value) => {
    const updatedFilters = { ...filterValues, [name]: value };
    setFilterValues(updatedFilters); // Update filter values on selection
  };

  const handleSearch = (filters) => {
    // Ensure location is part of the filters when making the API call
    const updatedFilters = { ...filters, location: filterValues.location }; // Include location here
    fetchFilteredDeals(updatedFilters); // Trigger search with updated filters
  };

  return (
    <Box sx={{ padding: "50px 0px" }}>
      <HeroSection
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />
      <Box sx={{ mb: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography level="body1" sx={{ ml: 2 }}>
              Popular Cars
            </Typography>
          </Box>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 4,
              }}
            >
              <Typography variant="body2" sx={{ mb: 2 }}>
                Loading cars, please wait...
              </Typography>
              <CircularProgress />
            </Box>
          ) : allDeals.length === 0 ? (
            // Show message when no deals are available
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                mt: 4,
              }}
            >
              <Typography variant="body2" sx={{ mb: 2 }}>
                No Cars for now
              </Typography>
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  },
                  gap: {
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                  },
                }}
              >
                {allDeals.slice(0, visibleCarsCount).map((car) => (
                  <CarCard key={car.id} carData={car} />
                ))}
              </Box>
              {visibleCarsCount < allDeals.length && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                  <Button variant="outlined" onClick={handleShowMore}>
                    Show More
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
      <PromotionalCard />
    </Box>
  );
};

export default Home;
