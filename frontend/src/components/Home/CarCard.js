import React from "react";
import { Box, Card, IconButton, Typography, Chip, Button } from "@mui/joy";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import { ReactComponent as Transmission } from "../../assets/Transmission.svg";
import { ReactComponent as PeopleIcon } from "../../assets/peopleIcon.svg";
import { ReactComponent as GasolineIcon } from "../../assets/gasolineIcon.svg";

const CarCard = ({ carData, onLikeToggle }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCardClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate(`/viewListing/${carData.id}`);
    } else {
      navigate("/login", { state: { message: "Please log in first" } }); // Pass a message in the state
    }
  };
  return (
    <Card variant="outlined" sx={{ px: 3, py: 3 }} onClick={handleCardClick}>
      
      <Box sx={{ mb: 5 }}>
        
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={0.5}>
          
          <Typography level="h4">
            {carData.make} - {carData.model}{" "}
          </Typography>
        </Box>

        <Typography level="body2" sx={{ textTransform: "capitalize" }}>
          {carData.body_type}
        </Typography>

      </Box>

      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 5,
          height: 150, // Fixed height for image container
          backgroundColor: carData.image ? "transparent" : "#f0f0f0", // Placeholder background if no image
        }}
      >
        {carData.image ? (
          <img
            src={"/images/" + carData.image + ".png"}
            alt={carData.name}
            style={{
              width: "80%",
              height: "auto",
              objectFit: "cover",
              margin: "20px auto",
            }}
          />
        ) : (
          <Typography level="body2" sx={{ color: "#aaa", fontStyle: "italic" }}>
            Image not available
          </Typography>
        )}
        {carData.image && (
          <Box
            sx={{
              position: "absolute",
              bottom: 23,
              left: "50%",
              transform: "translateX(-50%)",
              width: "80%",
              height: "30%",
              background:
                "linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
              zIndex: 1,
            }}
          />
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",

          mb: 2,
          rowGap: 1,
          width: "100%",
          flexWrap: "wrap",
        }}
      >

        {/* Fuel tank */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0,
            gap: 0.5,

            bgcolor: "transparent",
          }}
        >
          <GasolineIcon style={{ width: 18, height: 18 }} />
          <Typography
            level="body2"
            textTransform="capitalize"
            sx={{ fontWeight: "600", fontSize: "12px" }}
          >
            {carData.engine_capacity}L
          </Typography>
        </Box>

        {/* Capacity */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0,
            gap: 0.5,

            bgcolor: "transparent",
          }}
        >
          <PeopleIcon style={{ width: 18, height: 18 }} />
          <Typography
            level="body2"
            textTransform="capitalize"
            sx={{ fontWeight: "600", fontSize: "12px" }}
          >
            {carData.people} People
          </Typography>
        </Box>

        {/* Transmission */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0,
            gap: 0.5,

            bgcolor: "transparent",
          }}
        >
          <Transmission style={{ width: 18, height: 18 }} />
          <Typography
            level="body2"
            textTransform="capitalize"
            sx={{ fontWeight: "600", fontSize: "12px" }}
          >
            {carData.transmission}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        
        {/* Price */}
        <Typography level="h4">$ {parseInt(carData.price)}</Typography>
        
        {/* Button */}
        <Button
          size="sm"
          sx={{
            alignItems: "center",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: "600",
            justifyContent: "center",
            transition: "all 0.3s ease",
            bgcolor: "#3563E9",
          }}
        >
          Buy Now
        </Button>
      </Box>
    </Card>
  );
};

export default CarCard;
