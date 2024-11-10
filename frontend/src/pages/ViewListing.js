import React, { useState } from "react";
import { Box, Alert, CircularProgress } from "@mui/joy"; // Added CircularProgress

import { useNavigate } from "react-router-dom";

import ConfirmationSection from "../components/ViewListing/ConfirmationSection";
import FormSection from "../components/ViewListing/FormSection";

const ViewListing = () => {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const [formData, setFormData] = useState({
    // Personal Info
    name: "",
    phoneNumber: "",
    address: "",
    townCity: "",
    // Car Info
    title: "",
    make: "",
    model: "",
    variant: "",
    mileage: "",
    askingPrice: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({
    show: false,
    type: "",
    message: "",
  });

  const personalInfoFields = [
    { name: "name", label: "Name", placeholder: "Your name", type: "text" },
    {
      name: "phoneNumber",
      label: "Phone Number",
      placeholder: "Phone number",
      type: "text",
    },
    { name: "address", label: "Address", placeholder: "Address", type: "text" },
    {
      name: "townCity",
      label: "Town / City",
      placeholder: "Town / City",
      type: "text",
    },
  ];

  const carInfoFields = [
    {
      name: "title",
      label: "Title",
      placeholder: "Your ad title",
      type: "text",
      sm: 12,
    },
    {
      name: "make",
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
      name: "model",
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
      name: "variant",
      label: "Variant",
      placeholder: "Select your sub-model",
      type: "select",
      options: [
        { value: "le", label: "LE" },
        { value: "se", label: "SE" },
        { value: "xle", label: "XLE" },
      ],
    },
    {
      name: "mileage",
      label: "Mileage",
      placeholder: "Enter current mileage",
      type: "text",
    },
    {
      name: "askingPrice",
      label: "Asking price",
      placeholder: "Enter your ask",
      type: "text",
      startDecorator: "$",
    },
  ];

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate Personal Info
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.townCity.trim()) newErrors.townCity = "Town/City is required";

    // Validate Car Info
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.make) newErrors.make = "Make is required";
    if (!formData.model) newErrors.model = "Model is required";
    if (!formData.variant) newErrors.variant = "Variant is required";
    if (!formData.mileage.trim()) newErrors.mileage = "Mileage is required";
    if (!formData.askingPrice.trim())
      newErrors.askingPrice = "Asking price is required";

    return newErrors;
  };

  const handleSubmit = async () => {
    if (!isAgreed) {
      setSubmitStatus({
        show: true,
        type: "danger",
        message:
          "You must agree to the terms and conditions before submitting.",
      });
      return;
    }
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitStatus({
        show: true,
        type: "danger",
        message: "Please fill in all required fields",
      });
      return;
    }

    try {
      // Show loading spinner
      setLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Log the form data
      console.log("Form submitted successfully:", formData);

      setSubmitStatus({
        show: true,
        type: "success",
        message: "Listing submitted successfully!",
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        phoneNumber: "",
        address: "",
        townCity: "",
        title: "",
        make: "",
        model: "",
        variant: "",
        mileage: "",
        askingPrice: "",
      });

      // After loading is done, navigate
      setLoading(false);
      navigate("/productPage");
    } catch (error) {
      setLoading(false); // Hide loading spinner if error
      setSubmitStatus({
        show: true,
        type: "danger",
        message: "Error submitting form. Please try again.",
      });
    }
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
      {submitStatus.show && (
        <Alert
          color={submitStatus.type === "success" ? "success" : "danger"}
          sx={{ mb: 2 }}
          onClose={() =>
            setSubmitStatus({ show: false, type: "", message: "" })
          }
        >
          {submitStatus.message}
        </Alert>
      )}

      {/* Show loading spinner */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      )}

      <FormSection
        title="Personal Info"
        subtitle="Please enter your personal info"
        fields={personalInfoFields}
        step="Step 1 of 3"
        formData={formData}
        errors={errors}
        onInputChange={handleInputChange}
      />

      <FormSection
        title="Car Info"
        subtitle="Please enter your car info"
        fields={carInfoFields}
        step="Step 2 of 3"
        formData={formData}
        errors={errors}
        onInputChange={handleInputChange}
      />

      <ConfirmationSection
        onSubmit={handleSubmit}
        isAgreed={isAgreed}
        setIsAgreed={setIsAgreed}
      />
    </Box>
  );
};

export default ViewListing;
