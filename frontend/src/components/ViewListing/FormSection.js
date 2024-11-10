// FormSection.js
import React from "react";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Select, { selectClasses } from "@mui/joy/Select";
import {
  Grid,
  Typography,
  Input,
  Option,
  Sheet,
  Stack,
  FormControl,
  FormHelperText,
} from "@mui/joy";
import theme from "../../themes";

const FormSection = ({
  title,
  subtitle,
  fields,
  step,
  formData,
  errors,
  onInputChange,
}) => {
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
        {fields.map((field) => (
          <Grid key={field.name} xs={12} sm={field.sm || 6}>
            <FormControl error={!!errors[field.name]}>
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
                  indicator={<KeyboardArrowDown sx={{ color: "black" }} />}
                  size="lg"
                  variant="soft"
                  value={formData[field.name]}
                  onChange={(_, newValue) =>
                    onInputChange(field.name, newValue)
                  }
                  sx={{
                    bgcolor: theme.colors.backgroundColor,
                    fontSize: "14px",
                    [`& .${selectClasses.indicator}`]: {
                      transition: "0.2s",
                      [`&.${selectClasses.expanded}`]: {
                        transform: "rotate(-180deg)",
                      },
                    },
                  }}
                >
                  {field.options.map((option) => (
                    <Option
                      key={option.value}
                      value={option.value}
                      sx={{ fontSize: "14px" }}
                    >
                      {option.label}
                    </Option>
                  ))}
                </Select>
              ) : (
                <Input
                  placeholder={field.placeholder}
                  size="lg"
                  variant="soft"
                  value={formData[field.name]}
                  onChange={(e) => onInputChange(field.name, e.target.value)}
                  sx={{
                    "--Input-focusedThickness": "0",
                    flex: 1,
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                    fontSize: "14px",
                    bgcolor: theme.colors.backgroundColor,
                  }}
                  startDecorator={field.startDecorator}
                />
              )}
              {errors[field.name] && (
                <FormHelperText sx={{ color: "danger.500" }}>
                  {errors[field.name]}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        ))}
      </Grid>
    </Sheet>
  );
};

export default FormSection;
