import React from 'react';
import { useFormContext } from 'react-hook-form';
import phonesCodes from './phoneCodes.json'; // Certifique-se de ajustar o caminho conforme necessário

interface Country {
  name: string;
  dial: string;
  code: string;
}

interface TelefoneInputProps {
  onCountryChange: (country: Country) => void; // Prop para notificar a mudança de país
}

const TelefoneInput: React.FC<TelefoneInputProps> = ({ onCountryChange }) => {
  const { register, setValue } = useFormContext();
  const [countries, setCountries] = React.useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = React.useState<Country>({ dial: '+55', code: 'BR', name: 'Brasil' });

  React.useEffect(() => {
    const formattedCountries = phonesCodes.map((country: Country) => ({
      name: country.name,
      dial: country.dial,
      code: country.code
    }));
    setCountries(formattedCountries);
  }, []);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const country = countries.find(c => c.code === event.target.value);
    if (country) {
      setSelectedCountry(country);
      onCountryChange(country); // Notifica a mudança de país
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor="telefone">Telefone</label>
      <div className="flex gap-2">
        <select
          className="w-20 border border-zinc-200 shadow-sm rounded-l h-10 px-3 max-h-40 overflow-y-auto"
          onChange={handleCountryChange}
          value={selectedCountry.code} // Define o valor padrão do select
        >
          {countries.map((country, index) => (
            <option key={index} value={country.code}>
              {country.dial} ({country.name})
            </option>
          ))}
        </select>
        <input
          type="text"
          className="border w-60 border-zinc-200 shadow-sm rounded-r h-10 px-3"
          placeholder="DDD e número de telefone"
          {...register('telefone')}
        />
      </div>
    </div>
  );
};

export default TelefoneInput;