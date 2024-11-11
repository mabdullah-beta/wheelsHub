import React, { useState } from "react";
import { Box, Alert, CircularProgress } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import ConfirmationSection from "../components/ViewListing/ConfirmationSection";
import FormSection from "../components/ViewListing/FormSection";

const ViewListing = () => {
  const navigate = useNavigate();
  const [isAgreed, setIsAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone_number: "", // Updated key
    address: "",
    town_city: "", // Updated key
    title: "",
    make: "",
    model: "",
    variant: "",
    mileage: "",
    asking_price: "", // Updated key
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
    }, // Updated key
    { name: "address", label: "Address", placeholder: "Address", type: "text" },
    {
      name: "town_city",
      label: "Town / City",
      placeholder: "Town / City",
      type: "text",
    }, // Updated key
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
      name: "asking_price",
      label: "Asking price",
      placeholder: "Enter your ask",
      type: "text",
    }, // Updated key
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
      newErrors.phone_number = "Phone number is required"; // Updated key
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.town_city.trim())
      newErrors.town_city = "Town/City is required"; // Updated key

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.make) newErrors.make = "Make is required";
    if (!formData.model) newErrors.model = "Model is required";
    if (!formData.variant) newErrors.variant = "Variant is required";
    if (!formData.mileage.trim()) newErrors.mileage = "Mileage is required";
    if (!formData.asking_price.trim())
      newErrors.asking_price = "Asking price is required"; // Updated key

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
      setLoading(true);

      const response = await fetch("http://localhost:8000/listings/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error details:", data);
        throw new Error(data.errors || "Error submitting form.");
      }

      if (data.success) {
        setSubmitStatus({
          show: true,
          type: "success",
          message: "Listing submitted successfully!",
        });
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
        navigate("/productPage");
      } else {
        setSubmitStatus({
          show: true,
          type: "danger",
          message: "Error submitting form. Please try again.",
        });
      }
    } catch (error) {
      setLoading(false);
      setSubmitStatus({
        show: true,
        type: "danger",
        message: "Error submitting form. Please try again.",
      });
    } finally {
      setLoading(false);
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
