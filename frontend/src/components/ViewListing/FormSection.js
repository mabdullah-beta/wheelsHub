// FormSection.js
import React from "react";
import {
  Grid,
  Typography,
  Input,
  Select,
  Option,
  Sheet,
  Stack,
} from "@mui/joy";

const FormSection = ({ title, subtitle, fields, step }) => {
  return (
    <Sheet
      sx={{
        mb: 4,
        p: 4,
        borderRadius: "12px",
        bgcolor: "background.surface",
        boxShadow: "sm",
        width: "90%",
      }}
    >
      <Stack sx={{ mb: 4 }}>
        <Stack sx={{ mb: 1 }}>
          <Typography level="h4" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
        </Stack>
        <Stack display="flex" direction="row" justifyContent="space-between">
          <Typography level="body2">{subtitle}</Typography>
          <Typography
            sx={{
              color: "text.tertiary",
              fontSize: "14px",
            }}
          >
            {step}
          </Typography>
        </Stack>
      </Stack>
      <Grid container spacing={2.5}>
        {fields.map((field, index) => (
          <Grid key={index} xs={12} sm={field.sm || 6}>
            <Typography
              component="label"
              sx={{
                mb: 1,
                fontSize: "16px",
                fontWeight: 500,
                color: "text.secondary",
              }}
            >
              {field.label}
            </Typography>
            {field.type === "select" ? (
              <Select
                placeholder={field.placeholder}
                size="lg"
                variant="soft"
                sx={{ bgcolor: "background.level1" }}
              >
                {field.options.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            ) : (
              <Input
                placeholder={field.placeholder}
                size="lg"
                variant="soft"
                sx={{
                  "--Input-focusedThickness": "0",
                  flex: 1,
                  border: "none",
                  outline: "none",
                  boxShadow: "none",

                  fontSize: "14px",
                }}
                startDecorator={field.startDecorator}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Sheet>
  );
};

export default FormSection;
