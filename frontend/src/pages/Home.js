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
      image: car,
      liked: true,
      fuelType: "Petrol",
      seatingCapacity: 2,
      transmission: "Manual",
    },
    {
      id: 2,
      name: "Nissan GT-R",
      price: 99100,
      image: car,
      liked: false,
      fuelType: "Petrol",
      seatingCapacity: 4,
      transmission: "Automatic",
    },
    {
      id: 3,
      name: "Rolls-Royce",
      price: 43000,
      image: car,
      liked: true,
      fuelType: "Diesel",
      seatingCapacity: 5,
      transmission: "Automatic",
    },
    {
      id: 4,
      name: "Nissan GT-R",
      price: 22000,
      image: car,
      liked: false,
      fuelType: "Petrol",
      seatingCapacity: 4,
      transmission: "Manual",
    },
  ];

  const initialRecommendedCars = [
    {
      id: 5,
      name: "All-New Rush",
      price: 72000,
      image: car,
      liked: false,
      fuelType: "Diesel",
      seatingCapacity: 5,
      transmission: "Automatic",
    },
    {
      id: 6,
      name: "CR-V",
      price: 33000,
      image: car,
      liked: true,
      fuelType: "Petrol",
      seatingCapacity: 5,
      transmission: "Automatic",
    },
    {
      id: 7,
      name: "All-New Terios",
      price: 31000,
      image: car,
      liked: false,
      fuelType: "Petrol",
      seatingCapacity: 7,
      transmission: "Manual",
    },
    {
      id: 8,
      name: "CR-V",
      price: 13000,
      image: car,
      liked: true,
      fuelType: "Diesel",
      seatingCapacity: 5,
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
          <Typography level="h5">Popular Cars</Typography>
          <Button variant="plain">View All</Button>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 2,
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
          <Typography level="h5">Recommended Cars</Typography>
          <Button variant="plain">View All</Button>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 2,
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
