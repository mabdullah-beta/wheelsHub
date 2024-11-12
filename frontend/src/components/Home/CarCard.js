import React from "react";
import { Box, Card, IconButton, Typography, Chip, Button } from "@mui/joy";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import { ReactComponent as Transmission } from "../../assets/Transmission.svg";
import { ReactComponent as PeopleIcon } from "../../assets/peopleIcon.svg";
import { ReactComponent as GasolineIcon } from "../../assets/gasolineIcon.svg";

const CarCard = ({ carData, onLikeToggle }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCardClick = () => {
    navigate(`/viewListing/${carData.id}`);
  };
  return (
    <Card variant="outlined" sx={{ px: 3, py: 2 }} onClick={handleCardClick}>
      <Box sx={{ mb: 5 }}>
        <Typography
          level="body2"
          sx={{
            textTransform: "capitalize",
            marginBottom: "4px",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          {carData.body_type}
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={0.5}
        >
          <Typography level="h4">
            {carData.make} - {carData.model}{" "}
          </Typography>
        </Box>
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0,
            gap: 0.5,

            bgcolor: "transparent",
          }}
        >
          <GasolineIcon style={{ width: 24, height: 24 }} />
          <Typography
            level="body2"
            textTransform="capitalize"
            sx={{ fontWeight: "600" }}
          >
            {carData.engine_capacity}L
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0,
            gap: 0.5,

            bgcolor: "transparent",
          }}
        >
          <Transmission style={{ width: 24, height: 24 }} />
          <Typography
            level="body2"
            textTransform="capitalize"
            sx={{ fontWeight: "600" }}
          >
            {carData.transmission}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0,
            gap: 0.5,

            bgcolor: "transparent",
          }}
        >
          <PeopleIcon style={{ width: 24, height: 24 }} />
          <Typography
            level="body2"
            textTransform="capitalize"
            sx={{ fontWeight: "600" }}
          >
            {carData.people} People
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
        <Typography level="h4">${carData.price.toLocaleString()}</Typography>
        <Button
          size="sm"
          sx={{
            alignItems: "start",
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
