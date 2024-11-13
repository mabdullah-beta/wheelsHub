import React from "react";
import {
  Box,
  Typography,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/joy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import themes from "../themes";

const Footer = () => {
  // Simulated data coming from the backend
  const aboutLinks = [
    { label: "How it works", href: "#" },
    { label: "Featured", href: "#" },
    { label: "Partnership", href: "#" },
    { label: "Business Relation", href: "#" },
  ];

  const communityLinks = [
    { label: "Events", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Podcast", href: "#" },
    { label: "Invite a friend", href: "#" },
  ];

  const socialLinks = [
    { label: "Discord", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "Facebook", href: "#" },
  ];

  return (
    <Box
      sx={{
        padding: { xs: "30px 20px", md: "100px" },
        bgcolor: "#FFFFFF",
      }}
    >
      {/* Top Row with Headings */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: "100%",
          justifyContent: "space-between",
          mb: 4,
          alignItems: "flex-center",
        }}
      >
        {/* WheelsHub Heading */}
        <Box sx={{ maxWidth: "30%" }}>
          {/* Logo */}
          <Typography
            level="h2"
            sx={{
              marginRight: 4,
              color: themes.colors.primary,
              fontWeight: "bold",
            }}
          >
            WheelsHub
          </Typography>

          {/* Subheading */}
          <Typography level="body2" color="text.secondary" sx={{ mt: 2 }}>
            Providing affordable car buying and selling services with secure and
            convenient transactions.
          </Typography>
        </Box>

        {/* Right Section Container */}
        <Box
          sx={{
            display: "flex",
            marginLeft: "auto",
            gap: 20,
            maxWidth: "70%",
            alignItems: "flex-start",
          }}
        >
          {/* Socials Heading */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              level="h6"
              color="text.secondary"
              fontWeight="bold"
              sx={{ mb: 1 }}
            >
              Socials
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  color="neutral"
                  underline="none"
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Box>

          {/* About Heading */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              level="h6"
              color="text.secondary"
              fontWeight="bold"
              sx={{ mb: 1 }}
            >
              About
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {aboutLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  color="neutral"
                  underline="none"
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Accordion for smaller screens */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ mb: 2 }}>About</Typography>{" "}
            {/* Added margin-bottom */}
          </AccordionSummary>
          <AccordionDetails>
            {aboutLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                color="neutral"
                underline="none"
                sx={{ display: "block", mb: 2 }}
              >
                {link.label}
              </Link>
            ))}
          </AccordionDetails>
          <Divider />
        </Accordion>

        <Accordion sx={{ mt: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ mb: 2 }}>Community</Typography>{" "}
            {/* Added margin-bottom */}
          </AccordionSummary>
          <AccordionDetails>
            {communityLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                color="neutral"
                underline="none"
                sx={{ display: "block", mb: 2 }}
              >
                {link.label}
              </Link>
            ))}
          </AccordionDetails>
          <Divider />
        </Accordion>

        <Accordion
          sx={{
            mt: 2,
            "&:hover": {
              bgcolor: "transparent",
              color: "inherit", // Keeps the color the same on hover
              textDecoration: "none", // No underline or decoration on hover
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              sx={{
                mb: 2,
              }}
            >
              Socials
            </Typography>{" "}
          </AccordionSummary>
          <AccordionDetails>
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                color="neutral"
                underline="none"
                sx={{ display: "block", mb: 2 }}
              >
                {link.label}
              </Link>
            ))}
          </AccordionDetails>
          <Divider />
        </Accordion>
      </Box>

      {/* Bottom Copyright and Links */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "none" },
          justifyContent: "space-between",
          borderTop: "1px solid #e0e0e0",
          paddingTop: 2,
          mt: 2,
        }}
      >
        <Typography level="body2" color="text.secondary">
          © 2024 WheelsHub. All rights reserved.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "none" },
            gap: { xs: 0, md: 3 },
          }}
        >
          <Link href="#" color="neutral" underline="none">
            <Typography level="body2" color="text.secondary">
              Privacy & Policy
            </Typography>
          </Link>
          <Link href="#" color="neutral" underline="none">
            <Typography level="body2" color="text.secondary">
              Terms & Condition
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
