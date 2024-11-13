import React, { useState } from "react";
import { Sheet, Typography, IconButton, Box, Input, Button } from "@mui/joy";
import { Person, Search, AddCircle } from "@mui/icons-material";
import themes from "../themes";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ReactComponent as Notify } from "../assets/notify.svg";
import { ReactComponent as Like } from "../assets/likeIcon.svg";
import { ReactComponent as Setting } from "../assets/settingsIcon.svg";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleCreateListing = () => {
    const token = localStorage.getItem("token"); // Get token from localStorage

    if (token) {
      navigate("/createListing");
    } else {
      // Store the current location and redirect to login page
      navigate("/login", { state: { from: "/createListing" } });
    }
  };

  return (
    <Sheet
      variant="outlined"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: { xs: "10px 20px", md: "10px 60px" },
        boxShadow: "md",
      }}
    >
      {/* Inner Container */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          {/* Logo inner */}
          <Typography
            level="h2"
            sx={{
              marginRight: 4,
              color: themes.colors.primary,
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            WheelsHub
          </Typography>
        </Link>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {location.pathname !== "/createListing" && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateListing}
            sx={{
              padding: "8px 16px",
              fontSize: "1rem",
              borderRadius: "4px",
              boxShadow: "md",
              textTransform: "none",
              ":hover": {
                transition: "all 0.6s ease",
                backgroundColor: themes.colors.primary,
                color: "white",
              },
            }}
          >
            Create Listing
          </Button>
        )}

        <IconButton color="neutral" sx={{ fontSize: "1.5rem", padding: 0 }}>
          {" "}
          {/* Set fontSize and padding here */}
          <Person />
        </IconButton>
      </Box>

      {searchOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 50,
            left: 0,
            right: 0,
            bottom: 0,
            padding: 0,
            bgcolor: "rgba(0, 0, 0, 0.5)", // Background with opacity
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
            zIndex: 999,
          }}
          onClick={toggleSearch} // Close on background click
        >
          <Box
            sx={{
              width: "90%",
              backgroundColor: "white",
              borderRadius: "8px",
              padding: 2,
              display: "flex",
              alignItems: "center",
              boxShadow: "md",
            }}
          >
            <IconButton sx={{ padding: 0 }}>
              <Search />
            </IconButton>

            <Input
              placeholder="Search something here"
              sx={{
                "--Input-focusedThickness": "0",
                flex: 1,
                border: "none",
                outline: "none",
                boxShadow: "none",
                paddingLeft: "8px",
              }}
            />
          </Box>
        </Box>
      )}
    </Sheet>
  );
};

export default Header;
