import React, { useState } from "react";
import { Modal, Box, Typography, Button, Input, Textarea } from "@mui/joy";
import axios from "axios";
import theme from "../../themes";

const AcceptBidModal = ({ open, handleClose, bidId }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Send a POST request to create the bid with the authorization header
      const response = await axios.post(
        `http://localhost:8000/bids/${bidId}/unlock/`, {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        // Redirect the user to the checkout URL
        window.location.href = response.data.redirect_url;
      } else {
        alert("Failed to create bid");
      }
    } catch (error) {
      console.error("Error creating bid:", error);
      alert("An error occurred while creating the bid.");
    } finally {
      setLoading(false);
      handleClose(); // Close the modal after submission
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="place-bid-modal-title"
    >
      <Box
        sx={{
          p: 3,
          bgcolor: "background.paper",
          borderRadius: "10px",
          maxWidth: 400,
          mx: "auto",
          mt: "20vh",
        }}
      >
        <Typography id="place-bid-modal-title" level="h5" sx={{ mb: 2 }}>
          Unlock Bid
        </Typography>
        
        <Typography level="body-sm" sx={{ mb: 4 }}>

          Complete your payment to unlock the bid and connect with the buyer. If you’re confident this buyer is the right fit, go ahead—secure your chance now!

        </Typography>

        <Button
          onClick={handleSubmit}
          loading={loading}
          color="primary"
          fullWidth
          sx={{ bgcolor: "#3563E9" }}
        >
          {loading ? "Working..." : "Continue"}
        </Button>
      </Box>
    </Modal>
  );
};

export default AcceptBidModal;
