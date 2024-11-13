// SignupPage Component
// This component renders a signup form where users can create an account
// It handles state for full name, username, and password, as well as form submission
// It uses Material-UI components and hooks from React Router for navigation

// Libs
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import { Box, Button, Input, Typography, Link, Card, IconButton } from "@mui/joy";
import theme from "../themes";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// API URL for registration endpoint
const API_URL = process.env.REACT_APP_API_URL;

const SignupPage = () => {

  // State hooks to manage input values and password visibility
  const [showPassword, setShowPassword] = useState(false); 
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 

  // Hook to navigate to another page
  const navigate = useNavigate(); 

  // Toggles the visibility of the password field
  const handleTogglePasswordVisibility = () => { 

    setShowPassword((prevShowPassword) => !prevShowPassword); 

  };

  // Handles form submission
  const handleSubmit = async (event) => {

    // Prevents default form submission action
    event.preventDefault(); 

    // Split full name into first and last names
    const [firstName, lastName] = fullName.split(" "); 

    // Prepare data to send to the backend API
    const userData = { 

      username, 
      first_name: firstName, 
      last_name: lastName, 
      password, 

    };

    try {

      // Sends the registration data to the server
      const response = await fetch(`${API_URL}/auth/register/`, {

        method: "POST", 
        headers: { "Content-Type": "application/json" }, 

        // Convert user data to JSON for the request body
        body: JSON.stringify(userData), 

      });

      // Parse the response JSON
      const data = await response.json(); 

      // If registration is successful, navigate to login page with success message
      if (response.ok) { 

        navigate("/login", { state: { successMessage: "Account created successfully" } });

      } 
      else { 
        
        // If registration fails, show an error alert
        alert("Registration failed. Please check your input.");

      }

    } 
    catch (error) { 
      
      // Handle errors during the registration request
      alert("An error occurred. Please try again.");

    }

  };

  return (

    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", bgcolor: "#f4f6f8" }}>

      <Card sx={{ width: { xs: "100%", sm: 400 }, py: 3, px: { xs: 2, sm: 3 }, display: "flex", justifyContent: "center", borderRadius: "12px", border: "1px solid #E7E9EF" }}>
        
        {/* Header for the page */}
        <Typography level="h2" mb={1} sx={{ color: theme.colors.primary, textAlign: "center" }}>
          
          WheelsHub
        
        </Typography>

        {/* Signup Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ alignItems: "start" }}>

          {/* Full Name Input */}
          <Typography level="body3" mb={1}>Full Name</Typography>
          
          
          <Input 

            placeholder="Enter your full name" 
            size="lg" 
            type="text" 
            variant="soft" 
            fullWidth 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} // Update state when input changes

            sx={{ 
              "--Input-focusedThickness": "0", 
              flex: 1, 
              border: "none", 
              outline: "none", 
              boxShadow: "none", 
              fontSize: "14px", 
              bgcolor: theme.colors.backgroundColor, 
              mb: 2 
            }} 

          />

          {/* Username Input */}
          <Typography level="body3" mb={1}>Username</Typography>

          <Input 

            placeholder="Enter your username" 
            size="lg" 
            type="text" 
            variant="soft" 
            fullWidth 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} // Update state when input changes

            sx={{ 
              "--Input-focusedThickness": "0", 
              flex: 1, 
              border: "none", 
              outline: "none", 
              boxShadow: "none", 
              fontSize: "14px", 
              bgcolor: theme.colors.backgroundColor, 
              mb: 2 
            }} 

          />

          {/* Password Input */}
          <Typography level="body3" mb={1}>Password</Typography>

          <Input 
            type={showPassword ? "text" : "password"} 
            size="lg" 
            placeholder="Enter password" 
            fullWidth 
            variant="soft" 

            endDecorator={
              <IconButton 
                onClick={handleTogglePasswordVisibility} 
                edge="end" 
                aria-label="toggle password visibility" 
                sx={{ fontSize: "1.5rem", "&:hover": { color: "gray", bgcolor: "transparent" } }}
              >
                {showPassword ? 
                  <VisibilityOff sx={{ fontSize: "1rem", color: "black" }} /> : 
                  <Visibility sx={{ fontSize: "1rem", color: "black" }} />
                }
              </IconButton>
            } 

            value={password} 
            onChange={(e) => setPassword(e.target.value)} // Update state when input changes

            sx={{ 
              "--Input-focusedThickness": "0", 
              flex: 1, 
              border: "none", 
              outline: "none", 
              boxShadow: "none", 
              fontSize: "14px", 
              bgcolor: theme.colors.backgroundColor, 
              mb: 2 
            }} 

          />

          {/* Submit Button */}
          <Button type="submit" fullWidth  variant="solid"  sx={{ mb: 2, bgcolor: theme.colors.primary, borderRadius: "12px", py: 1.5, fontSize: "16px" }}>Sign up</Button>

          {/* Link to Login page */}
          <Typography level="body3" textAlign="center">Already have an account?{" "}<Link href="/login" fontSize="sm" underline="hover" color="primary">Log in</Link></Typography>

        </Box>

      </Card>

    </Box>

  );

};

export default SignupPage;