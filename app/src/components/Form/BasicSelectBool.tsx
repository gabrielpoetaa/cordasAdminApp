// import * as React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
// import { SelectChangeEvent } from '@mui/material/Select';

type BasicSelectBoolProps = {
  name: string;
  label: string;
};

export const BasicSelectBool = ({ name, label }: BasicSelectBoolProps) => {
  const { control, watch } = useFormContext();

  const watchedValue = watch(name);

  console.log("Valor selecionado: ", watchedValue);
  console.log("Tipo do valor selecionado: ", typeof watchedValue);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Box display="flex" flexDirection="column">
          <FormControl fullWidth error={Boolean(fieldState.error)}>
            <InputLabel>{label}</InputLabel>
            <Select
              label={label}
              error={Boolean(fieldState.error)}
              {...field}
              onChange={(e) => field.onChange(e.target.value === "true")}
              value={field.value === true ? "true" : "false"}
            >
              <MenuItem value="true">Sim</MenuItem>
              <MenuItem value="false">Não</MenuItem>
            </Select>
            {fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        </Box>
      )}
    />
  );
};
