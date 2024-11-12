import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Typography,
  Link,
  Card,
  IconButton,
} from "@mui/joy";
import theme from "../themes";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/";
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Prepare data for submission
    const userData = {
      username: username, // Use username for login
      password: password,
    };

    try {
      const response = await fetch(`${API_URL}auth/login`, {
        // Update this line
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, store token in localStorage
        localStorage.setItem("token", data.access); // Save token
        navigate("/"); // Redirect to home page
      } else {
        // Handle errors (e.g., display error messages)
        console.error(data);
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#f4f6f8", // Light background color
      }}
    >
      <Card
        sx={{
          width: 400,
          height: 450,
          py: 3,
          px: 3,
          display: "flex",
          justifyContent: "center",
          borderRadius: "12px",
          border: "1px solid #E7E9EF",
        }}
      >
        <Typography
          level="h2"
          mb={1}
          sx={{ color: theme.colors.primary, textAlign: "center" }}
        >
          WheelsHub
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ alignItems: "start" }}
        >
          <Typography level="body3" mb={1}>
            Login
          </Typography>

          <Input
            type="text"
            size="lg"
            placeholder="Enter username"
            fullWidth
            variant="soft"
            value={username} // Use username state variable
            onChange={(e) => setUsername(e.target.value)} // Update state on input change
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

          <Typography level="body3" mb={1}>
            Password
          </Typography>
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
                  fontSize: "1.5rem", // Adjust size of the icon
                  "&:hover": {
                    color: "gray", // Hover color
                    bgcolor: "transparent",
                  },
                }}
              >
                {showPassword ? (
                  <VisibilityOff sx={{ fontSize: "1rem", color: "black" }} />
                ) : (
                  <Visibility sx={{ fontSize: "1rem", color: "black" }} />
                )}
              </IconButton>
            }
            value={password} // Use password state variable
            onChange={(e) => setPassword(e.target.value)} // Update state on input change
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

          <Button
            type="submit" // Set button type to submit for form submission
            fullWidth
            variant="solid"
            sx={{
              mb: 2,
              bgcolor: theme.colors.primary,
              borderRadius: "12px",
              py: 1.5,
              fontSize: "16px",
            }}
          >
            Sign In
          </Button>

          <Typography level="body3" textAlign="center">
            Don't have an account?{" "}
            <Link
              href="/signup"
              fontSize="sm"
              underline="hover"
              color="primary"
            >
              Sign up now
            </Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default LoginPage;
