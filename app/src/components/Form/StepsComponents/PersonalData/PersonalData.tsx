import { Box } from "@mui/material";
// import { NameInput } from "./Form/FirstPage/NameInput"
import { FormInput } from "../../FormInput";
import BasicDatePicker from "../../../BasicDatePicker";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

export const PersonalData = () => {
  const { getValues, setValue, watch } = useFormContext();

  // Garante que sempre tenha pelo menos um telefone
  useEffect(() => {
    const currentPhones = getValues("mobileNumber");
    console.log("Current phones on mount:", currentPhones);
    if (!currentPhones || currentPhones.length === 0) {
      console.log("Setting initial phone field");
      setValue("mobileNumber", [""], { shouldValidate: true });
    }
  }, [getValues, setValue]);

  const phoneNumbers = watch("mobileNumber");
  console.log("Watched phone numbers:", phoneNumbers);

  const handleAddPhone = () => {
    const currentPhones = getValues("mobileNumber") || [""];
    console.log("Adding new phone, current phones:", currentPhones);
    setValue("mobileNumber", [...currentPhones, ""], { shouldValidate: true });
  };

  const handleRemovePhone = (index: number) => {
    const currentPhones = getValues("mobileNumber") || [""];
    console.log(
      "Removing phone at index:",
      index,
      "current phones:",
      currentPhones
    );
    const newPhoneNumbers = currentPhones.filter(
      (_: string, numberIndex: number) => numberIndex !== index
    );
    setValue(
      "mobileNumber",
      newPhoneNumbers.length > 0 ? newPhoneNumbers : [""],
      { shouldValidate: true }
    );
  };

  return (
    <Box
      marginY={10}
      marginX="auto"
      display="flex"
      flexDirection="column"
      gap={2}
      marginTop={10}
      width={500}
    >
      {/* <NameInput /> */}
      <FormInput name="student_name" label="Nome" />
      <BasicDatePicker name="Date_of_birth" label="Data de Nascimento" />
      <FormInput name="CPF" label="CPF do responsável" />
      <FormInput name="Email" label="Email" />
      {/* <FormInput name="telNumber" label="Telefone" /> */}
      {phoneNumbers?.map((_: string, index: number) => (
        <div key={index} className="flex gap-2 items-center">
          <FormInput
            name={`mobileNumber.${index}`}
            label="(DDD) + Celular / Whatsapp"
          />
          {index > 0 && (
            <button
              type="button"
              className="btnForm"
              onClick={() => handleRemovePhone(index)}
            >
              Remover
            </button>
          )}
        </div>
      ))}

      <button type="button" className="btnForm w-fit" onClick={handleAddPhone}>
        Adicionar Telefone
      </button>
    </Box>
  );
};
