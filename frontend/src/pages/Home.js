// Home.js
// This file is the Home page component that displays popular cars or search results.
// It handles API calls for fetching car deals, manages filter states, and displays the content
// with pagination and search functionalities.

// Libraries
import axios from "axios"; 
import React, { useState, useEffect, Fragment } from "react"; 

// Components
import { Box, Typography, Button, CircularProgress } from "@mui/joy"; 
import CarCard from "../components/Home/CarCard";
import HeroSection from "../components/Home/HeroSection"
import PromotionalCard from "../components/Home/PromotionalCard";

// Define the API endpoint URL
const API_URL = process.env.REACT_APP_API_URL;

// Home component
const Home = () => {

  // Define state variables for managing data and UI states
  const [allDeals, setAllDeals] = useState([]); 
  const [visibleCarsCount, setVisibleCarsCount] = useState(10); 

  // State to manage loading state
  const [loading, setLoading] = useState(true); 

  // State to hold filter criteria
  const [filterValues, setFilterValues] = useState({ location: "", make: "", year: "", priceRange: "", mileage: "", transmission: "", color: "" });

  // Mode
  const [search, setSearchMode] = useState(false); 

  // Fetch deals when the component is mounted
  useEffect(() => {

    fetchFilteredDeals(); 

  }, []);

  // Function to fetch car deals with optional filters
  const fetchFilteredDeals = async (filters = {}) => {

    // Set loading state to true while fetching data
    setLoading(true); 

    try {

      // Make API call with filters
      const response = await axios.get(`${ API_URL }/deals/`, { params: filters }); 

      // Update state with fetched deals
      setAllDeals(response.data.deals);

    } 
    catch (error) {

      console.error("Failed to fetch deals:", error); 

    } 

    // Set loading state to false once the fetch is complete
    setLoading(false); 

  };

  // Function to handle the "Show More" button click
  const handleShowMore = () => {

    setVisibleCarsCount((prevCount) => prevCount + 10);

  };

  // Function to handle filter changes
  const handleFilterChange = (name, value) => {
    
    // Update the filter values with the selected value
    const updatedFilters = { ...filterValues, [name]: value };
    
    setFilterValues(updatedFilters);

  };

  // Function to handle search
  const handleSearch = (filters) => {

    // Ensure location is part of the filters when making the API call
    const updatedFilters = { ...filters, location: filterValues.location };

    // Set search mode to true to indicate a search is in progress
    setSearchMode(true); 
    
    // Fetch filtered deals with the updated filters
    fetchFilteredDeals(updatedFilters); 

  };

  // Render content of the page
  return <Box sx={{ padding: "50px 0px" }}>
      
    {/* HeroSection for displaying filters and search functionality */}
    <HeroSection onFilterChange={handleFilterChange} onSearch={handleSearch} />

    <Box sx={{ mb: 6 }}>

      <Box sx={{ mb: 4 }}>
        
        {/* Display the title based on whether it's a search or popular cars */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>

          <Typography level="body1" sx={{ ml: 2 }}> { search ? "Search Results" : "Popular Cars" } </Typography>
        
        </Box>

        {

          // Show circular progress indicator
          loading ? <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>

              <Typography variant="body2" sx={{ mb: 2 }}> Loading cars, please wait...</Typography>

              <CircularProgress /> 

            </Box>

          // Display message if no deals are available
          : allDeals.length === 0 ? <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", mt: 4 }}>

              <Typography variant="body2" sx={{ mb: 2 }}> No Cars for now </Typography>

            </Box>

          // Grid display for car listings
          : <Fragment>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }, gap: { xs: 1, sm: 2, md: 3, lg: 4 } }}>
              
              {/* Map through the deals and display each car */}
              {
              
                allDeals.slice(0, visibleCarsCount).map((car) => <CarCard key={car.id} carData={car} /> )
                
              }

            </Box>

            {/* Show "Show More" button if there are more cars to display */}
            {
            
              visibleCarsCount < allDeals.length && (

                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>

                  <Button variant="outlined" onClick={handleShowMore}> Show More </Button>

                </Box>

              )
            }

          </Fragment>
        
        }

      </Box>

    </Box>

    {/* Promotional card at the bottom */}
    <PromotionalCard />

  </Box>

};

// Export the Home component as the default export
export default Home;
