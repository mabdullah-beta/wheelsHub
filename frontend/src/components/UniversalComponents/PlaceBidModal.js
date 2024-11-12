import React, { useState } from "react";
import { Modal, Box, Typography, Button, TextField, Input } from "@mui/joy";
import axios from "axios";
import theme from "../../themes";

const PlaceBidModal = ({ open, handleClose, dealId }) => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Check if amount and contact are provided
    if (!amount || !contact) {
      alert("Amount and contact number are required");
      return;
    }

    setLoading(true);
    try {
      // Send a POST request to create the bid with the authorization header
      const response = await axios.post(
        `http://127.0.0.1:8000/deals/${dealId}/bids/`,
        { amount, message, contact, deal: dealId },
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
          borderRadius: 2,
          maxWidth: 400,
          mx: "auto",
          mt: "20vh",
        }}
      >
        <Typography id="place-bid-modal-title" level="h5" sx={{ mb: 2 }}>
          Place a Bid
        </Typography>
        <Input
          placeholder="Enter your amount"
          size="lg"
          type="text"
          variant="soft"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)} // Update state on input change
          sx={{
            "--Input-focusedThickness": "0",
            flex: 1,
            border: "none",
            outline: "none",
            boxShadow: "none",
            fontSize: "14px",
            bgcolor: "F6F7F9",
            mb: 2,
          }}
        />
        <Input
          placeholder="Enter your message"
          size="lg"
          type="text"
          variant="soft"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Update state on input change
          sx={{
            "--Input-focusedThickness": "0",
            flex: 1,
            border: "none",
            outline: "none",
            boxShadow: "none",
            fontSize: "14px",
            bgcolor: "F6F7F9",
            mb: 2,
          }}
        />
        <Input
          placeholder="Enter your contact"
          size="lg"
          type="phone"
          variant="soft"
          fullWidth
          value={contact}
          onChange={(e) => setContact(e.target.value)} // Update state on input change
          sx={{
            "--Input-focusedThickness": "0",
            flex: 1,
            border: "none",
            outline: "none",
            boxShadow: "none",
            fontSize: "14px",
            bgcolor: "F6F7F9",
            mb: 2,
          }}
        />
        <Button
          onClick={handleSubmit}
          loading={loading}
          color="primary"
          fullWidth
          sx={{ bgcolor: "#3563E9" }}
        >
          {loading ? "Placing Bid..." : "Place Bid"}
        </Button>
      </Box>
    </Modal>
  );
};

export default PlaceBidModal;
