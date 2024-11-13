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
  const carInfoFields = [
    {
      name: "title",
      label: "Title",
      placeholder: "Your Ad title",
      type: "text",
      sm: 12
    },
    {
      name: "description",
      label: "Description",
      placeholder: "Describe your deal",
      type: "textarea",
      sm: 12
    },
    {
      name: "asking_price",
      label: "Asking price",
      placeholder: "Enter your asking price",
      type: "text",
    },
    {
      name: "location",
      label: "Location",
      placeholder: "Location",
      type: "text",
    }
  ];
  const carfeatures = [
    {
      name: "make",
      label: "Make",
      placeholder: "Enter your car maker",
      type: "text",
    },
    {
      name: "model",
      label: "Model",
      placeholder: "Enter your car model",
      type: "text",
    },
    { name: "year", label: "Year", placeholder: "Year", type: "text" },
    {
      name: "transmission",
      label: "Transmission",
      placeholder: "Transmission",
      type: "select",
      options: [{ label: "Manual", value: "manual" }, { label: "Automatic", value: "automatic" }]
    },
    {
      name: "body_type",
      label: "Body Type",
      placeholder: "Body Type",
      type: "select",
      options: [{ label: "Sedan", value: "sedan" }, { label: "Hatchback", value: "hatchback" }, { label: "Coupe", value: "coupe" }, { label: "SUV", value: "suv" }]
    },
    {
      name: "fuel_type",
      label: "Fuel Type",
      placeholder: "Fuel Type",
      type: "select",
      options: [{ label: "Gasoline", value: "gasoline" }, { label: "Diesel", value: "diesel" }, { label: "Electric", value: "electric" }]
    },
  ];
  const conditionFields = [
    {
      name: "mileage",
      label: "Mileage",
      placeholder: "Enter current mileage",
      type: "text",
    },
    {
      name: "condition",
      label: "Rating",
      placeholder: "Is it certified or used?",
      type: "select",
      options: [{ label: "Certified", value: "certified" }, { label: "Used", value: "used" }]
    },
    {
      name: "engine_capacity",
      label: "Engine Capacity",
      placeholder: "How much fuel capacity your vehicle have?",
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

    if (!formData.year) newErrors.year = "Year is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.transmission)
      newErrors.transmission = "Transmission is required";
    if (!formData.condition)
      newErrors.condition = "Condition is required";
    if (!formData.body_type)
      newErrors.body_type = "Body Type is required";
    if (!formData.fuel_type)
      newErrors.fuel_type = "Fuel Type is required";
    if (!formData.engine_capacity)
      newErrors.engine_capacity = "Engine Capacity is required";

    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.make) newErrors.make = "Make is required";
    if (!formData.model) newErrors.model = "Model is required";
    if (!formData.mileage) newErrors.mileage = "Mileage is required";
    if (!formData.asking_price)
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
    console.log(newErrors)
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
        "car-suv-1",
      location: formData.location ? formData.location.toLowerCase() : "",
      transmission: formData.transmission
        ? formData.transmission.toLowerCase()
        : "",
      year: formData.year ? formData.year.toLowerCase() : "",
    };

    try {
      const response = await fetch("http://localhost:8000/deals/", {
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
          description: "",
          price: "",
          location: "",
          make: "",
          model: "",
          year: "",
          transmission: "",
          body_type: "",
          fuel_type: "",
          mileage: "",
          condition: "",
          engine_capacity: ""
        });
        navigate(`/view/${data.deal}`);
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
      <Box sx={{ gap: 2, mb: 4 }}>
        <Typography level="h2" sx={{ mb: 1 }}> Create Ad</Typography>
        <Typography level="body2">
          {" "}
          Give us information about the car and you to create a new listing
        </Typography>
      </Box>

      <FormSection
        title="Post Details"
        subtitle="Provide information about the car you're listing"
        fields={carInfoFields}
        step="Step 1 of 4"
        formData={formData}
        errors={errors}
        onInputChange={handleInputChange}
      />

      <FormSection
        title="Vehicle Specifications"
        subtitle="List your car's key features"
        fields={carfeatures}
        step="Step 2 of 4"
        formData={formData}
        errors={errors}
        onInputChange={handleInputChange}
      />
      <FormSection
        title="Condition Details"
        subtitle="Enter details about the condition of vehicle"
        fields={conditionFields}
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
