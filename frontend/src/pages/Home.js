import React, { useState } from "react"; // Import useState
import { Box, Typography, Button } from "@mui/joy";
import CarCard from "../components/Home/CarCard";
import car from "../assets/car.png";
import HeroSection from "../components/Home/HeroSection";
import PromotionalCard from "../components/Home/PromotionalCard";

const Home = () => {
  const initialPopularCars = [
    {
      id: 1,
      name: "Koenigsegg",
      price: 88666,
      type: "sport",
      image: car,
      liked: true,
      fuelType: "Petrol",
      seatingCapacity: 2,
      tankcapacity: "70L",
      transmission: "Manual",
    },
    {
      id: 2,
      name: "Nissan GT-R",
      price: 99100,
      type: "luxury",
      image: car,
      liked: false,
      fuelType: "Petrol",
      seatingCapacity: 4,
      tankcapacity: "50L",
      transmission: "Automatic",
    },
    {
      id: 3,
      name: "Rolls-Royce",
      price: 43000,
      type: "sedan",
      image: car,
      liked: true,
      fuelType: "Diesel",
      seatingCapacity: 5,
      tankcapacity: "80L",
      transmission: "Automatic",
    },
    {
      id: 4,
      name: "Nissan GT-R",
      price: 22000,
      type: "sport",
      image: car,
      liked: false,
      fuelType: "Petrol",
      seatingCapacity: 4,
      tankcapacity: "90L",
      transmission: "Manual",
    },
  ];

  const initialRecommendedCars = [
    {
      id: 5,
      name: "All-New Rush",
      price: 72000,
      type: "sport",
      image: car,
      liked: false,
      fuelType: "Diesel",
      seatingCapacity: 5,
      tankcapacity: "70L",
      transmission: "Automatic",
    },
    {
      id: 6,
      name: "CR-V",
      price: 33000,
      image: car,
      type: "sedan",
      liked: true,
      fuelType: "Petrol",
      seatingCapacity: 5,
      tankcapacity: "70L",
      transmission: "Automatic",
    },
    {
      id: 7,
      name: "All-New Terios",
      price: 31000,
      image: car,
      type: "luxury",
      liked: false,
      fuelType: "Petrol",
      seatingCapacity: 7,
      tankcapacity: "90L",
      transmission: "Manual",
    },
    {
      id: 8,
      name: "CR-V",
      price: 13000,
      image: car,
      type: "classic",
      liked: true,
      fuelType: "Diesel",
      seatingCapacity: 5,
      tankcapacity: "80L",
      transmission: "Automatic",
    },
  ];
  // Use state to manage popular and recommended cars
  const [popularCars, setPopularCars] = useState(initialPopularCars);
  const [recommendedCars, setRecommendedCars] = useState(
    initialRecommendedCars
  );

  // Function to toggle the liked state of a car
  const handleLikeToggle = (id) => {
    // Update popular cars
    const updatedPopularCars = popularCars.map((car) =>
      car.id === id ? { ...car, liked: !car.liked } : car
    );
    setPopularCars(updatedPopularCars);

    // Update recommended cars
    const updatedRecommendedCars = recommendedCars.map((car) =>
      car.id === id ? { ...car, liked: !car.liked } : car
    );
    setRecommendedCars(updatedRecommendedCars);
  };

  return (
    <Box sx={{ padding: "50px 0px" }}>
      <HeroSection />
      {/* Popular Cars Section */}
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
          <Button variant="plain">View All</Button>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)", // 1 column on extra small screens
              sm: "repeat(2, 1fr)", // 2 columns on small screens
              md: "repeat(3, 1fr)", // 3 columns on medium screens
              lg: "repeat(4, 1fr)", // 4 columns on large screens
            },
            gap: {
              xs: 1, // Smaller gap for extra small screens
              sm: 2, // Medium gap for small screens
              md: 3, // Larger gap for medium screens
              lg: 4, // Largest gap for large screens
            },
          }}
        >
          {popularCars.map((car) => (
            <CarCard
              key={car.id}
              carData={car}
              onLikeToggle={handleLikeToggle}
            />
          ))}
        </Box>
      </Box>

      {/* Recommended Cars Section */}
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
            Recommended Cars
          </Typography>
          <Button variant="plain">View All</Button>
        </Box>
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
          {recommendedCars.map((car) => (
            <CarCard
              key={car.id}
              carData={car}
              onLikeToggle={handleLikeToggle}
            />
          ))}
        </Box>
      </Box>

      <PromotionalCard />
    </Box>
  );
};

export default Home;
