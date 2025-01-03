import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import StepButton from "@mui/material/StepButton";

type Step = {
  label: string;
  Component: React.ReactNode;
  hasError: boolean;
};

type StepProps = {
  items: Step[];
};

export function Steps({ items }: StepProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const isLastStep = activeStep === items.length - 1;

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} nonLinear>
        {items.map(({ label, hasError }, index) => {
          return (
            <Step
              sx={{
                "& .MuiStepLabel-root .Mui-completed": {
                  // color: "#f9f6ed",
                  // circle color (COMPLETED)
                },
                "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                  {
                    color: "#a06a2e", // Just text label (COMPLETED)
                  },
                "& .MuiStepLabel-root .Mui-active": {
                  color: "#ba8638", // circle color (ACTIVE)
                },
                "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                  {
                    color: "common.white", // Just text label (ACTIVE)
                  },
                "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                  fill: "#f9f6ed", // circle's number (ACTIVE)
                },
              }}
              key={label}
            >
              <StepButton onClick={() => setActiveStep(index)}>
                <StepLabel error={hasError}>{label}</StepLabel>
              </StepButton>
            </Step>
          );
        })}
      </Stepper>

      <Box minHeight={"50vh"}>{items[activeStep].Component}</Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          pt: 2,
          maxWidth: "900px",
          marginInline: "auto",
        }}
      >
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: "500",
            fontSize: "14px",
            color: "#ba8638",
            border: "1px solid #ba8638",
            "&:hover": {
              color: "#f9f6ed",
            },
            "&.Mui-disabled": {
              color: "#ba8638",

              opacity: 1, // Remove a opacidade padrão aplicada aos botões desabilitados
              pointerEvents: "none", // Impede a interação com o botão
            },
          }}
          className="btnForm"
        >
          Voltar
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        {isLastStep ? (
          <Button
            key="enviar"
            type="submit"
            color="inherit"
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "14px",
              color: "#ba8638",
              border: "1px solid #ba8638",
              "&:hover": {
                color: "#f9f6ed",
              },
            }}
            className="btnForm"
          >
            Enviar
          </Button>
        ) : (
          <Button
            key="proximo"
            type="button"
            onClick={handleNext}
            color="inherit"
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "14px",
              color: "#ba8638",
              border: "1px solid #ba8638",
              "&:hover": {
                color: "#f9f6ed",
              },
            }}
            className="btnForm"
          >
            Próximo
          </Button>
        )}
      </Box>
    </Box>
  );
}
