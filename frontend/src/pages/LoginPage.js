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
import { useNavigate, useLocation } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/";

const LoginPage = () => {
  const location = useLocation();
  const message = location.state?.message;
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = { username, password };

    try {
      const response = await fetch(`${API_URL}auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access);
        navigate("/");
      } else {
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
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
        px: 2, // Add padding for mobile devices
      }}
    >
      {message && (
        <Box
          sx={{
            mb: 3,
            p: 2,
            color: theme.colors.warningDark,
            borderRadius: "8px",
            width: "100%",
            maxWidth: { xs: 300, sm: 400 },
            textAlign: "center",
            border: "1px solid blue",
            bgcolor: theme.colors.primary,
          }}
        >
          <Typography level="h4" sx={{ color: "white" }}>
            {message}
          </Typography>
        </Box>
      )}
      <Card
        sx={{
          width: { xs: "100%", sm: 400 },
          py: 3,
          px: { xs: 2, sm: 3 }, // Adjust padding for mobile
          display: "flex",
          justifyContent: "center",
          borderRadius: "12px",
          border: "1px solid #E7E9EF",
        }}
      >
        <Typography
          level="h2"
          mb={1}
          sx={{
            color: theme.colors.primary,
            textAlign: "center",
            fontSize: { xs: "1.5rem", sm: "2rem" },
          }}
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
                  fontSize: "1.5rem",
                  "&:hover": {
                    color: "gray",
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
              mb: 2,
            }}
          />

          <Button
            type="submit"
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
