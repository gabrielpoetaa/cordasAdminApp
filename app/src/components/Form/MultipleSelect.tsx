import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Controller, useFormContext } from "react-hook-form";
import { FormHelperText } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  // Garantir que personName seja sempre um array (mesmo que seja undefined ou null)
  const safePersonName = Array.isArray(personName) ? personName : [];
  return {
    fontWeight: safePersonName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

type MultipleSelectProps = {
  name: string;
  label: string;
  list: string[]; // Agora, 'list' é um array de strings
};

const MultipleSelect = ({ name, label, list }: MultipleSelectProps) => {
  const theme = useTheme();
  const { control } = useFormContext(); // Aqui acessamos o control diretamente com useFormContext()

  return (
    <Controller
      name={name}
      control={control} // Control é passado automaticamente do useFormContext
      render={({ field, fieldState }) => (
        <FormControl fullWidth error={Boolean(fieldState.error)}>
          <InputLabel
            sx={{
              color: "#ba8638",
              "&.Mui-focused": {
                color: "#ba8638",
              },
            }}
            id="demo-multiple-chip-label"
          >
            {label}
          </InputLabel>
          <Select
            sx={{
              color: "#5d3826",
              fontWeight: "200",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "#d6b56e",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#c99b46",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ba8638",
              },
              ".MuiSvgIcon-root ": {
                fill: "#d6b56e !important",
              },
            }}
            label={label}
            {...field} // 'field' contém o valor e o método onChange
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple // Necessário para permitir múltiplos valores
            value={field.value || []} // Asegura que 'field.value' seja um array, se estiver vazio, usa um array vazio
            onChange={(event) => {
              const { value } = event.target; // Pega os valores selecionados
              field.onChange(value); // Atualiza o estado do formulário com os valores selecionados
            }}
            input={<OutlinedInput id="select-multiple-chip" label={label} />}
            renderValue={(
              selected: string[] // Especificando explicitamente o tipo de 'selected' como string[]
            ) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map(
                  (
                    value: string // Especificando explicitamente o tipo de 'value'
                  ) => (
                    <Chip
                      key={value}
                      label={value}
                      style={{ backgroundColor: "#f9f6ed", color: "#5d3826" }}
                    />
                  )
                )}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {list.map(
              (
                name // Aqui você vai mapear a lista passada como props
              ) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, field.value, theme)} // Aplica o estilo baseado nos itens selecionados
                >
                  {name}
                </MenuItem>
              )
            )}
          </Select>
          {fieldState.error && (
            <FormHelperText>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default MultipleSelect;
