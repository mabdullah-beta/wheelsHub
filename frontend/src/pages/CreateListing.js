import React, { useState } from "react";
import { Box, Alert, CircularProgress, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import ConfirmationSection from "../components/ViewListing/ConfirmationSection";
import FormSection from "../components/ViewListing/FormSection";

const CreateListing = () => {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    year: "",
    location: "",
    description: "",
    transmission: "",
    condition: "",
    body_type: "",
    fuel_type: "",
    engine_capacity: "",
    title: "",
    make: "",
    model: "",
    variant: "",
    mileage: "",
    asking_price: "",
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({
    show: false,
    type: "",
    message: "",
  });

  const carfeatures = [
    {
      name: "transmission",
      label: "Transmission",
      placeholder: "Transmission",
      type: "text",
    },
    {
      name: "condition",
      label: "Condition",
      placeholder: "Condition",
      type: "text",
    },
    {
      name: "body_type",
      label: "Body Type",
      placeholder: "Body Type",
      type: "text",
    },
    {
      name: "fuel_type",
      label: "Fuel Type",
      placeholder: "Fuel Type",
      type: "text",
    },
    {
      name: "engine_capacity",
      label: "Engine Capacity",
      placeholder: "Engine Capacity",
      type: "text",
    },
  ];
  const personalInfoFields = [
    { name: "year", label: "Year", placeholder: "Year", type: "text" },

    {
      name: "location",
      label: "Location",
      placeholder: "Location",
      type: "text",
    },
    {
      name: "description",
      label: "Description",
      placeholder: "Description",
      type: "text",
    },
  ];

  const carInfoFields = [
    {
      name: "title",
      label: "Title",
      placeholder: "Your ad title",
      type: "text",
    },
    {
      name: "make",
      label: "Make",
      placeholder: "Enter your car make",
      type: "text",
    },
    {
      name: "model",
      label: "Model",
      placeholder: "Enter your car model",
      type: "text",
    },
    {
      name: "variant",
      label: "Variant",
      placeholder: "Enter your car variant",
      type: "text",
    },
    {
      name: "mileage",
      label: "Mileage",
      placeholder: "Enter current mileage",
      type: "text",
    },
    {
      name: "asking_price",
      label: "Asking price",
      placeholder: "Enter your asking price",
      type: "text",
    },
  ];

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.year.trim()) newErrors.year = "Year is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.transmission.trim())
      newErrors.transmission = "Transmission is required";
    if (!formData.condition.trim())
      newErrors.condition = "Condition is required";
    if (!formData.body_type.trim())
      newErrors.body_type = "Body Type is required";
    if (!formData.fuel_type.trim())
      newErrors.fuel_type = "Fuel Type is required";
    if (!formData.engine_capacity.trim())
      newErrors.engine_capacity = "Engine Capacity is required";

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.make.trim()) newErrors.make = "Make is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (!formData.variant.trim()) newErrors.variant = "Variant is required";
    if (!formData.mileage.trim()) newErrors.mileage = "Mileage is required";
    if (!formData.asking_price.trim())
      newErrors.asking_price = "Asking price is required";

    return newErrors;
  };

  const handleSubmit = async () => {
    // Check if user agreed to terms
    if (!isAgreed) {
      setSubmitStatus({
        show: true,
        type: "danger",
        message:
          "You must agree to the terms and conditions before submitting.",
      });
      return;
    }

    // Form validation
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

    // Show loading spinner and submission message
    setLoading(true);
    setSubmitStatus({
      show: true,
      type: "success",
      message: "Submitting your listing...",
    });

    // Prepare data for submission
    const dealData = {
      title: formData.title ? formData.title.toLowerCase() : "",
      make: formData.make ? formData.make.toLowerCase() : "",
      model: formData.model ? formData.model.toLowerCase() : "",
      variant: formData.variant ? formData.variant.toLowerCase() : "",
      mileage: formData.mileage ? formData.mileage.toLowerCase() : "",
      price: formData.asking_price ? formData.asking_price.toLowerCase() : "",
      body_type: formData.body_type ? formData.body_type.toLowerCase() : "",
      condition: formData.condition ? formData.condition.toLowerCase() : "",
      description: formData.description
        ? formData.description.toLowerCase()
        : "",
      engine_capacity: formData.engine_capacity
        ? formData.engine_capacity.toLowerCase()
        : "",
      fuel_type: formData.fuel_type ? formData.fuel_type.toLowerCase() : "",
      image:
        "https://unsplash.com/photos/a-computer-screen-with-a-remote-control-on-it-s5kTY-Ve1c0",
      location: formData.location ? formData.location.toLowerCase() : "",
      transmission: formData.transmission
        ? formData.transmission.toLowerCase()
        : "",
      year: formData.year ? formData.year.toLowerCase() : "",
    };

    dealData.image =
      "https://unsplash.com/photos/a-computer-screen-with-a-remote-control-on-it-s5kTY-Ve1c0"; // Replace with actual image URL if available

    try {
      const response = await fetch("http://127.0.0.1:8000/deals/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(dealData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          show: true,
          type: "success",
          message: `Deal created successfully with ID ${data.deal}`,
        });
        // Reset form and navigate to view listing
        setFormData({
          title: "",
          make: "",
          model: "",
          variant: "",
          mileage: "",
          asking_price: "",
          body_type: "",
          condition: "",
          description: "",
          engine_capacity: "",
          fuel_type: "",
          location: "",
          transmission: "",
          year: "",
        });
        navigate(`/viewListing/${data.deal}`);
      } else {
        const errorMessage =
          data?.detail || "Failed to create deal. Please try again.";
        setSubmitStatus({
          show: true,
          type: "danger",
          message: errorMessage,
        });
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setSubmitStatus({
        show: true,
        type: "danger",
        message: "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false); // Hide loading spinner
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
      <Box sx={{ gap: 2, mb: 3 }}>
        <Typography level="h2"> Create ad</Typography>
        <Typography level="body2">
          {" "}
          Give us information about the car and you to place an ad.
        </Typography>
      </Box>

      <FormSection
        title="Car Info"
        subtitle="Please enter your car info"
        fields={carInfoFields}
        step="Step 1 of 4"
        formData={formData}
        errors={errors}
        onInputChange={handleInputChange}
      />

      <FormSection
        title="Car Features"
        subtitle="Please enter your car features"
        fields={carfeatures}
        step="Step 2 of 4"
        formData={formData}
        errors={errors}
        onInputChange={handleInputChange}
      />
      <FormSection
        title="Personal Info"
        subtitle="Please enter your personal info"
        fields={personalInfoFields}
        step="Step 3 of 4"
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

export default CreateListing;
