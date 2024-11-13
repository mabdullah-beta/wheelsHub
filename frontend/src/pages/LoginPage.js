// LoginPage.js
// This file contains the login page component that allows users to log in using their username and password.
// It handles the form submission, password visibility toggle, success message display, and redirection after a successful login.

// Libraries
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 

// Components
import { Box, Button, Input, Typography, Link, Card, IconButton, Snackbar } from "@mui/joy"; 
import theme from "../themes"; 
import Visibility from "@mui/icons-material/Visibility"; 
import VisibilityOff from "@mui/icons-material/VisibilityOff"; 

// Define the API endpoint URL for login
const API_URL = process.env.REACT_APP_API_URL;

// LoginPage component
const LoginPage = () => {

  // State variables for managing form data and UI states
  const [message, setMessage] = useState(""); 
  const [open, setOpen] = useState(false); 
  const [showPassword, setShowPassword] = useState(false); 
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 

  // Used for redirecting after login
  const location = useLocation(); 
  const navigate = useNavigate(); 

  // Effect to display a success message from the signup page if provided
  useEffect(() => {

    if (location.state?.successMessage) {

      // Set the success message
      setMessage(location.state.successMessage); 

      // Show the Snackbar
      setOpen(true); 

    }

  }, [location]);

  // Function to toggle the password visibility
  const handleTogglePasswordVisibility = () => {

    setShowPassword((prevShowPassword) => !prevShowPassword);

  };

  // Function to handle form submission
  const handleSubmit = async (event) => {

     // Prevent page reload on form submission
    event.preventDefault();

    // Collect form data
    const userData = { username, password }; 

    try {

      const response = await fetch(`${API_URL}/auth/login/`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },

        // Send user data to the API
        body: JSON.stringify(userData), 

      });

      // Convert to json
      const data = await response.json();

      if (response.ok) {

        // Store the token in localStorage
        localStorage.setItem("token", data.access); 

        // Redirect to the previous page or homepage after login
        const redirectTo = location.state?.from || "/";

        navigate(redirectTo);

      } 
      else {

        alert("Login failed. Please check your credentials."); 

      }

    } 
    catch (error) {
      
      alert("An error occurred. Please try again."); 

    }

  };

  // Function to close the Snackbar
  const handleCloseSnackbar = () => {

    setOpen(false);
    
  };

  // JSX for rendering the Login page
  return (

    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", minHeight: "100vh", bgcolor: "#f4f6f8", px: 2 }}>
      
      {/* Snackbar for displaying success message */}
      {
      
        message && (

          <Snackbar open={open} autoHideDuration={6000000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }} sx={{ bgcolor: theme.colors.primary, textAlign: "center", display: "block", color: "white", "& .MuiSnackbarContent-root": { backgroundColor: theme.colors.primary } }}>
            
            <Typography sx={{ color: "white" }}>{message}</Typography>
          
          </Snackbar>

        )
      }

      {/* Login card container */}
      <Card sx={{ width: { xs: "100%", sm: 400 }, py: 3, px: { xs: 2, sm: 3 }, display: "flex", justifyContent: "center", borderRadius: "12px", border: "1px solid #E7E9EF" }}>
        
        <Typography level="h2" mb={1} sx={{ color: theme.colors.primary, textAlign: "center", fontSize: { xs: "1.5rem", sm: "2rem" } }}>
          
          WheelsHub

        </Typography>

        {/* Login form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ alignItems: "start" }}>

          <Typography level="body3" mb={1}>Login</Typography>

          {/* Username input field */}
          <Input

            type="text"
            size="lg"
            placeholder="Enter username"
            fullWidth
            variant="soft"

            value={username}
            onChange={(e) => setUsername(e.target.value)}

            sx={{
              "--Input-focusedThickness": "0",
              flex: 1,
              border: "none",
              outline: "none",
              boxShadow: "none",
              fontSize: "14px",
              bgcolor: theme.colors.backgroundColor,
              mb: 2,

            }}

          />
          <Typography level="body3" mb={1}>Password</Typography>

          {/* Password input field */}
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
                
                sx={{
                  fontSize: "1.5rem",
                  "&:hover": {
                    color: "gray",
                    bgcolor: "transparent",
                  },
                }}
              >
                { showPassword ? <VisibilityOff sx={{ fontSize: "1rem", color: "black" }} /> : <Visibility sx={{ fontSize: "1rem", color: "black" }} /> }
                
              </IconButton>
            }

            value={password}

            onChange={(e) => setPassword(e.target.value)} 

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

          {/* Submit button for login */}
          <Button type="submit" fullWidth variant="solid" sx={{ mb: 2, bgcolor: theme.colors.primary, borderRadius: "12px", py: 1.5, fontSize: "16px" }}>Sign In</Button>

          {/* Link to the signup page */}
          <Typography level="body3" textAlign="center">Don't have an account? <Link href="/signup" fontSize="sm" underline="hover" color="primary">Sign up now</Link></Typography>
        
        </Box>
        
      </Card>

    </Box>

  );

}

// Export the LoginPage component as the default export
export default LoginPage;