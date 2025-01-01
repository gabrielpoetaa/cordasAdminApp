import React from 'react';
import { useFormContext } from 'react-hook-form';

const CpfInput: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  // Extrair a mensagem de erro corretamente
  const getErrorMessage = (error: any): string | null => {
    if (!error) return null;
    if (typeof error.message === 'string') return error.message;
    return 'Erro inválido';
  };

  return (
    <div className="flex flex-col gap-1 w-full md:w-1/2">
      <label htmlFor="cpf">CPF</label>
      <input
        type="text"
        className="border border-zinc-200 shadow-sm rounded h-10 px-3"
        {...register('cpf')}
      />
      {errors.cpf && <span>{getErrorMessage(errors.cpf)}</span>}
    </div>
  );
};

export default CpfInput;