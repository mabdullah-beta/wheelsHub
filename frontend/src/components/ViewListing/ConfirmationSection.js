import React from "react";
import { Stack, Checkbox, Typography, Button } from "@mui/joy";
import { Lock } from "lucide-react";

const ConfirmationStep = ({ onSubmit }) => {
  return (
    <Stack
      spacing={3}
      sx={{
        mb: 4,
        p: 4,
        borderRadius: "12px",
        bgcolor: "background.surface",
        boxShadow: "sm",
        width: "90%",
      }}
    >
      {/* Title and Subtitle */}
      <Stack>
        <Stack>
          <Typography level="h4" sx={{ fontWeight: "bold" }}>
            Confirmation
          </Typography>
        </Stack>
        <Stack
          display="flex"
          marginTop="2px"
          direction="row"
          justifyContent="space-between"
        >
          <Typography level="body2">
            We are getting to the end. Just a few clicks and your car is ready
            to be sold!
          </Typography>
          <Typography
            sx={{
              color: "text.tertiary",
              fontSize: "14px",
            }}
          >
            Step 3 of 3
          </Typography>
        </Stack>
      </Stack>

      {/* Terms and Conditions */}
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          alignItems: "center",
          bgcolor: "background.level1",
          p: 2,
          borderRadius: "8px",
        }}
      >
        <Checkbox size="sm" />
        <Typography level="body2" sx={{ color: "text.secondary" }}>
          I agree with your terms and conditions and privacy policy.
        </Typography>
      </Stack>

      {/* Submit Button */}
      <Button
        size="lg"
        color="primary"
        sx={{
          width: "100%",
          py: 1.5,
          fontWeight: 600,
          borderRadius: "8px",
        }}
        onClick={onSubmit}
      >
        Post Now
      </Button>

      {/* Security Notice */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Lock size={20} />
        <Stack spacing={0.5} alignItems="center">
          <Typography
            level="body2"
            sx={{ color: "text.primary", fontWeight: "bold" }}
          >
            All your data are safe
          </Typography>
          <Typography
            level="body2"
            sx={{
              color: "text.tertiary",
              textAlign: "center",
              fontSize: "12px",
            }}
          >
            We are using the most advanced security to provide you the best
            experience ever.
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ConfirmationStep;
