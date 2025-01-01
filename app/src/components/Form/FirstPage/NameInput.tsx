
import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export const NameInput = () => {
  const { control } = useFormContext ();
  // const { register, formState: { errors } } = useFormContext();

  // // Extrair a mensagem de erro corretamente
  // const getErrorMessage = (error: any): string | null => {
  //   if (!error) return null;
  //   if (typeof error.message === 'string') return error.message;
  //   return 'Erro inválido';
  // };

  return (
    <div className="flex flex-col gap-1">
      <Controller
      name="name"
      control={control}
      render={({field, fieldState}) => (
        <TextField
        label="Nome"
        error={Boolean(fieldState.error)}
        {...field}
        />
      )}
        />
    </div>
  );
}
