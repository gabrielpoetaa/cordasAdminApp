import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

type FormInputProps = {
  name: string;
  label: string;
};

export const FormInput = ({ name, label }: FormInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Box display="flex" flexDirection="column">
            <TextField
              label={label}
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              {...field}
              sx={{
                // Estilo da borda do TextField
                "& .MuiOutlinedInput-root": {
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ba8638", // Cor da borda no hover
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#c99b46", // Cor da borda quando focado
                  },
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#d6b56e", // Cor da borda padrão
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#5d3826", // Cor do texto
                },
                // Alteração da cor da label quando em foco
                "& .MuiInputLabel-root": {
                  color: "#d6b56e", // Cor padrão da label
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#c99b46", // Cor da label quando o campo está em foco
                },
              }}
            />
          </Box>
        );
      }}
    />
  );
};
