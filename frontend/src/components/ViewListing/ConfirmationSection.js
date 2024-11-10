import React from "react";
import { Stack, Checkbox, Typography, Button } from "@mui/joy";

import { ReactComponent as Secure } from "../../assets/Secure.svg";
import theme from "../../themes";

const ConfirmationStep = ({ onSubmit, isAgreed, setIsAgreed }) => {
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
          bgcolor: theme.colors.backgroundColor,
          p: 2,
          borderRadius: "8px",
        }}
      >
        <Checkbox
          size="sm"
          checked={isAgreed}
          onChange={(e) => setIsAgreed(e.target.checked)}
        />
        <Typography level="body2" sx={{ color: "#1F2544" }}>
          I agree with your terms and conditions and privacy policy.
        </Typography>
      </Stack>

      <Button
        size="lg"
        color="primary"
        sx={{
          width: "140px",
          py: 1.5,
          fontWeight: 600,
          borderRadius: "8px",
          bgcolor: theme.colors.primary,
        }}
        onClick={onSubmit}
      >
        Post Now
      </Button>

      <Stack
        direction="column"
        spacing={2}
        sx={{
          mt: 2,
        }}
      >
        <Secure size={20} />
        <Stack spacing={2} direction="column" alignItems="start">
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
