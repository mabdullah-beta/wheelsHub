import React, { useState } from "react";
import { Box, Alert, CircularProgress } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import ConfirmationSection from "../components/ViewListing/ConfirmationSection";
import FormSection from "../components/ViewListing/FormSection";

const CreateListing = () => {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    address: "",
    town_city: "",
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

  const personalInfoFields = [
    { name: "name", label: "Name", placeholder: "Your name", type: "text" },
    {
      name: "phone_number",
      label: "Phone Number",
      placeholder: "Phone number",
      type: "text",
    },
    { name: "address", label: "Address", placeholder: "Address", type: "text" },
    {
      name: "town_city",
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

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone_number.trim())
      newErrors.phone_number = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.town_city.trim())
      newErrors.town_city = "Town/City is required";

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

    setLoading(true); // Show loading spinner
    setSubmitStatus({
      show: true,
      type: "success",
      message: "Submitting your listing...",
    });

    // Prepare data for submission
    const dealData = {
      seller: localStorage.getItem("token"), // Optionally include seller ID if needed
      title: formData.title,
      make: formData.make,
      model: formData.model,
      variant: formData.variant,
      mileage: formData.mileage,
      price: formData.asking_price, // Adjust according to backend expectations
      body_type: "sedan",
      condition: "new",
      description: "It best in town",
      engine_capacity: "10",
      fuel_type: "gasoline",
      image:
        "https://unsplash.com/photos/a-computer-screen-with-a-remote-control-on-it-s5kTY-Ve1c0",
      // Add other fields as necessary
      location: "Thailand",
      transmission: "automatic",
      year: "2022",
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/deals/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
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
        // Optionally reset form or navigate
        setFormData({
          name: "",
          phone_number: "",
          address: "",
          town_city: "",
          title: "",
          make: "",
          model: "",
          variant: "",
          mileage: "",
          asking_price: "",
        });
        navigate("/"); // Redirect after successful submission
      } else {
        setSubmitStatus({
          show: true,
          type: "danger",
          message: "Failed to create deal. Please try again.",
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

export default CreateListing;
