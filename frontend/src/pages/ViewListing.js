// ViewListing.js
import React from "react";
import { Box } from "@mui/joy";
import FormSection from "../components/ViewListing/FormSection";
import ConfirmationSection from "../components/ViewListing/ConfirmationSection";

const ViewListing = () => {
  const personalInfoFields = [
    { label: "Name", placeholder: "Your name", type: "text" },
    { label: "Phone Number", placeholder: "Phone number", type: "text" },
    { label: "Address", placeholder: "Address", type: "text" },
    { label: "Town / City", placeholder: "Town / City", type: "text" },
  ];

  const carInfoFields = [
    { label: "Title", placeholder: "Your title", type: "text", sm: 12 },
    {
      label: "Make",
      placeholder: "Select your make",
      type: "select",
      options: [
        { value: "toyota", label: "Toyota" },
        { value: "honda", label: "Honda" },
        { value: "bmw", label: "BMW" },
      ],
    },
    {
      label: "Model",
      placeholder: "Select your model",
      type: "select",
      options: [
        { value: "camry", label: "Camry" },
        { value: "corolla", label: "Corolla" },
        { value: "rav4", label: "RAV4" },
      ],
    },
    {
      label: "Variant",
      placeholder: "Select your sub-model",
      type: "select",
      options: [
        { value: "le", label: "LE" },
        { value: "se", label: "SE" },
        { value: "xle", label: "XLE" },
      ],
    },
    { label: "Mileage", placeholder: "Enter current mileage", type: "text" },
    {
      label: "Asking price",
      placeholder: "Enter your ask",
      type: "text",
      startDecorator: "$",
    },
  ];

  const handleSubmit = () => {
    console.log("Form submitted!");
  };

  return (
    <Box
      sx={{
        maxWidth: "800px",
        minWidth: "300px",
        mx: "auto",
        p: 3,
        width: "90%",
        minHeight: "100vh",
      }}
    >
      <FormSection
        title="Personal Info"
        subtitle="Please enter your personal info"
        fields={personalInfoFields}
        step="Step 1 of 3"
      />
      <FormSection
        title="Car Info"
        subtitle="Please enter your car info"
        fields={carInfoFields}
        step="Step 2 of 3"
      />
      <ConfirmationSection onSubmit={handleSubmit} />
    </Box>
  );
};

export default ViewListing;
