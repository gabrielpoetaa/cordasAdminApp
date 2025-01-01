import { Controller, useFormContext } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import "dayjs/locale/pt-br"; // Importa o locale para português do Brasil

// Configura o locale globalmente para o dayjs
dayjs.locale("pt-br"); // Define o locale global como português do Brasil

type BasicDatePickerProps = {
  name: string;
  label: string;
};

export default function BasicDatePicker({ name, label }: BasicDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="pt-br" // Garante que o locale correto seja utilizado
        >
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              {...field}
              label={label}
              format="DD-MM-YYYY" // Formato desejado para a data
              value={field.value ? dayjs(field.value) : null} // Garantir que é um objeto dayjs
              onChange={(date) => {
                // Passar o valor como um objeto dayjs, sem formatar para string
                field.onChange(date ? date.format("YYYY-MM-DD") : null); // Enviar para o React Hook Form no formato ISO (YYYY-MM-DD)

                console.log("Valor do DatePicker:", date);
                console.log("Tipo do valor:", typeof date);
              }}
            />
          </DemoContainer>
          {fieldState?.error && (
            <FormHelperText error={true}>
              {fieldState?.error?.message}
            </FormHelperText>
          )}
        </LocalizationProvider>
      )}
    />
  );
}
