import React from "react";
import { Box, Stepper, Step, StepLabel, Typography } from "@mui/material";
import {
  AccessTime as ClockIcon,
  LocalShipping as TruckIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { styled } from "@mui/material/styles";

// Custom styled connector component
const CustomConnector = styled("span")(({ theme, completed }) => ({
  width: "80%",
  borderTop: "1.5px dotted",
  borderColor: completed ? "#A26E6C" : "#gray",
  position: "absolute",
  top: "25%",
  left: "calc(-60% + 20px)",
  right: "calc(60% + 20px)",
}));

// Custom styling for the stepper
const CustomStepper = styled(Stepper)(({ theme }) => ({
  "& .MuiStepLabel-root": {
    flexDirection: "column",
    alignItems: "center",
  },
  "& .MuiStepLabel-iconContainer": {
    paddingRight: 0,
    marginBottom: theme.spacing(1),
    zIndex: 1, // Ensure icons are above the connector lines
  },
  "& .MuiStepLabel-label": {
    marginTop: theme.spacing(1),
    color: "#000 !important", // Force black color for all text
  },
  // Hide default connector
  "& .MuiStepConnector-root": {
    display: "none",
  },
  // Custom step container for connector positioning
  "& .MuiStep-root": {
    position: "relative",
    padding: "0 16px",
    "&:not(:last-child)": {
      marginRight: theme.spacing(2),
    },
  },
}));

const OrderStepper = () => {
  const activeStep = 1;

  const CustomStepIcon = ({ active, completed, icon }) => {
    const getIcon = () => {
      if (completed) {
        return (
          <CheckCircleOutlineIcon sx={{ color: "#A26E6C", fontSize: 30 }} />
        );
      }
      switch (icon) {
        case 1:
          return (
            <CheckCircleOutlineIcon
              sx={{ color: active ? "#A26E6C" : "grey", fontSize: 30 }}
            />
          );
        case 2:
          return (
            <ClockIcon
              sx={{ color: active ? "#A26E6C" : "grey", fontSize: 30 }}
            />
          );
        case 3:
          return (
            <TruckIcon
              sx={{ color: active ? "#A26E6C" : "grey", fontSize: 30 }}
            />
          );
        case 4:
          return (
            <LocationIcon
              sx={{ color: active ? "#A26E6C" : "grey", fontSize: 30, ml: -2 }}
            />
          );
        default:
          return null;
      }
    };

    return (
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {getIcon()}
      </Box>
    );
  };

  const steps = [
    { label: "Created", icon: CheckCircleOutlineIcon },
    { label: "Dispatched", icon: ClockIcon },
    { label: "In Transit", icon: TruckIcon },
    { label: "Delivered", icon: LocationIcon },
  ];

  return (
    <Box
      sx={{
        width: "58%",
        py: 3,
        border: 1,
        borderColor: "grey",
        borderRadius: 2,
      }}
    >
      <CustomStepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label}>
            {index !== 0 && <CustomConnector completed={index <= activeStep} />}
            <StepLabel
              StepIconComponent={(props) => (
                <CustomStepIcon
                  {...props}
                  active={index === activeStep}
                  completed={index < activeStep}
                />
              )}
            >
              <Typography
                sx={{
                  color: "#000", // Force black color
                  fontWeight: index === activeStep ? "medium" : "normal",
                }}
              >
                {step.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </CustomStepper>
    </Box>
  );
};

export default OrderStepper;
