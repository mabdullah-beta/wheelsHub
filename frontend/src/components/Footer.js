import React from "react";
import {
  Box,
  Typography,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
        padding: { xs: "10px 20px", md: "10px 60px" },
        bgcolor: "#FFFFFF",
      }}
    >
      {/* Top Row with Headings */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: "100%",
          justifyContent: "space-between",
          mb: 3,
          alignItems: "flex-start",
        }}
      >
        {/* WheelsHub Heading */}
        <Box sx={{ maxWidth: "30%" }}>
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
          <Typography level="body3" color="text.secondary" sx={{ mt: 2 }}>
            Providing affordable car buying and selling services with secure and
            convenient transactions.
          </Typography>
        </Box>

        {/* Right Section Container */}
        <Box
          sx={{
            display: "flex",
            marginLeft: "auto",
            gap: 10,
            maxWidth: "70%",
            alignItems: "flex-start",
          }}
        >
          {/* About Heading */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography level="h6" fontWeight="bold" sx={{ mb: 1 }}>
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

          {/* Community Heading */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography level="h6" fontWeight="bold" sx={{ mb: 1 }}>
              Community
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {communityLinks.map((link, index) => (
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

          {/* Socials Heading */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography level="h6" fontWeight="bold" sx={{ mb: 1 }}>
              Socials
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
        </Box>
      </Box>

      {/* Accordion for smaller screens */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ mb: 1 }}>About</Typography>{" "}
            {/* Added margin-bottom */}
          </AccordionSummary>
          <AccordionDetails>
            {aboutLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                color="neutral"
                underline="none"
                sx={{ display: "block", mb: 1 }}
              >
                {link.label}
              </Link>
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mt: 2 }}>
          {" "}
          {/* Add margin-top for separation between accordions */}
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ mb: 1 }}>Community</Typography>{" "}
            {/* Added margin-bottom */}
          </AccordionSummary>
          <AccordionDetails>
            {communityLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                color="neutral"
                underline="none"
                sx={{ display: "block", mb: 1 }}
              >
                {link.label}
              </Link>
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mt: 2 }}>
          {" "}
          {/* Add margin-top for separation between accordions */}
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ mb: 1 }}>Socials</Typography>{" "}
            {/* Added margin-bottom */}
          </AccordionSummary>
          <AccordionDetails>
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                color="neutral"
                underline="none"
                sx={{ display: "block", mb: 1 }}
              >
                {link.label}
              </Link>
            ))}
          </AccordionDetails>
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
        <Typography level="body2" color="text.secondary" sx={{ mb: 2 }}>
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
            Privacy & Policy
          </Link>
          <Link href="#" color="neutral" underline="none">
            Terms & Condition
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
