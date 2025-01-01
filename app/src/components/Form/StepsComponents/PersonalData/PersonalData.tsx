import { Box } from "@mui/material"
// import { NameInput } from "./Form/FirstPage/NameInput"
import { FormInput } from "../../FormInput"
import BasicDatePicker from "../../../BasicDatePicker"

export const PersonalData = () => {

    return(
        <Box marginY={10} marginX="auto" display="flex" flexDirection="column" gap={2} marginTop={10} width={500}>
            {/* <NameInput /> */}
            <FormInput name="name" label="Nome" />
            <BasicDatePicker name="dateOfBirth" label="Data de Nascimento" />
            <FormInput name="cpf" label="CPF do responsável" />
            <FormInput name="email" label="Email" />
            {/* <FormInput name="telNumber" label="Telefone" /> */}
            <FormInput name="mobileNumber" label="(DDD) + Celular / Whatsapp" />
        </Box>
    )
}