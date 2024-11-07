import React, { useState } from "react";
import { Sheet, Typography, IconButton, Box, Input } from "@mui/joy";
import {
  Favorite,
  Notifications,
  Settings,
  Person,
  Search,
} from "@mui/icons-material";
import themes from "../themes";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <Sheet
      variant="outlined"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: { xs: "10px 20px", md: "10px 100px" },
        boxShadow: "md",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
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

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "4px 8px",
            width: "100%",
          }}
        >
          <IconButton
            sx={{
              padding: 0,
              bgcolor: "transparent",
              "&:hover": {
                bgcolor: "transparent",
              },
            }}
          >
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

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          onClick={toggleSearch}
          sx={{
            display: { xs: "block", md: "none" },
            fontSize: "1.5rem",
            padding: 0,
          }}
        >
          <Search />
        </IconButton>
        <IconButton color="neutral" sx={{ fontSize: "1.5rem", padding: 0 }}>
          {" "}
          {/* Set fontSize and padding here */}
          <Favorite />
        </IconButton>
        <IconButton color="neutral" sx={{ fontSize: "1.5rem", padding: 0 }}>
          {" "}
          {/* Set fontSize and padding here */}
          <Notifications />
        </IconButton>
        <IconButton color="neutral" sx={{ fontSize: "1.5rem", padding: 0 }}>
          {" "}
          {/* Set fontSize and padding here */}
          <Settings />
        </IconButton>
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
