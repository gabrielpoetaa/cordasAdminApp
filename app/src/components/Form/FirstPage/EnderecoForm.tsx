import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useFormControl } from '@mui/material/FormControl';



const EnderecoForm: React.FC = () => {
  const { register, formState: { errors }, setValue, setError } = useFormContext();

  const handleCepBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const cep = event.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setValue('Endereco.rua', data.logradouro);
          setValue('Endereco.bairro', data.bairro);
          setValue('Endereco.cidade', data.localidade);
          setValue('Endereco.estado', data.uf);
        } else {
          setError('Endereco.cep', {
            type: 'manual',
            message: 'CEP não encontrado',
          });
        }
      } catch (error) {
        setError('Endereco.cep', {
          type: 'manual',
          message: 'Erro ao buscar o CEP',
        });
      }
    } else {
      setError('Endereco.cep', {
        type: 'manual',
        message: 'Formato de CEP inválido',
      });
    }
  };

  const getErrorMessage = (error: any): string | null => {
    if (!error) return null;
    if (typeof error.message === 'string') return error.message;
    return 'Erro inválido';
  };

  return (
    <>
      <div className="flex flex-col gap-1 w-full md:w-1/2">
        <label htmlFor="cep">CEP</label>
        <input
          type="text"
          className="border border-zinc-200 shadow-sm rounded h-10 px-3"
          {...register('Endereco.cep', { required: 'CEP é obrigatório', minLength: { value: 8, message: 'O CEP deve ter oito dígitos' } })}
          onBlur={handleCepBlur}
        />
        {errors?.Endereco && 'cep' in errors.Endereco && (
          <span>{getErrorMessage(errors.Endereco.cep)}</span>
        )}
      </div>

      <div className="flex flex-col md:flex-row md:gap-4">
        <div className="flex flex-col gap-1 w-full md:w-1/2">
          <label htmlFor="numero">Número</label>
          <input
            type="text"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register('Endereco.numero')}
          />
          {errors?.Endereco && 'numero' in errors.Endereco && (
            <span>{getErrorMessage(errors.Endereco.numero)}</span>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full md:w-1/2">
          <label htmlFor="complemento">Complemento</label>
          <input
            type="text"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register('Endereco.complemento')}
          />
          {errors?.Endereco && 'complemento' in errors.Endereco && (
            <span>{getErrorMessage(errors.Endereco.complemento)}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="rua">Rua</label>
        <input
          type="text"
          className="border border-zinc-200 shadow-sm rounded h-10 px-3"
          {...register('Endereco.rua')}
        />
        {errors?.Endereco && 'rua' in errors.Endereco && (
          <span>{getErrorMessage(errors.Endereco.rua)}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="bairro">Bairro</label>
        <input
          type="text"
          className="border border-zinc-200 shadow-sm rounded h-10 px-3"
          {...register('Endereco.bairro')}
        />
        {errors?.Endereco && 'bairro' in errors.Endereco && (
          <span>{getErrorMessage(errors.Endereco.bairro)}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="cidade">Cidade</label>
        <input
          type="text"
          className="border border-zinc-200 shadow-sm rounded h-10 px-3"
          {...register('Endereco.cidade')}
        />
        {errors?.Endereco && 'cidade' in errors.Endereco && (
          <span>{getErrorMessage(errors.Endereco.cidade)}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="estado">Estado</label>
        <input
          type="text"
          className="border border-zinc-200 shadow-sm rounded h-10 px-3"
          {...register('Endereco.estado')}
        />
        {errors?.Endereco && 'estado' in errors.Endereco && (
          <span>{getErrorMessage(errors.Endereco.estado)}</span>
        )}
      </div>
    </>
  );
};

export default EnderecoForm;
