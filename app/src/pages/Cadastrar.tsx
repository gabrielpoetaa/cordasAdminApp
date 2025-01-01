import { FormProvider, useForm } from "react-hook-form";
import { Steps } from "../components/Form/Stepper";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { PersonalData } from "../components/Form/StepsComponents/PersonalData/PersonalData";
import { MusicPreferences } from "../components/Form/StepsComponents/MusicPreferences/MusicPreferences";
import { Address } from "../components/Form/StepsComponents/Address/Address";
import { ChosenCourse } from "../components/Form/StepsComponents/ChosenCourse/ChosenCourse";
import { HowDidYouFindUs } from "../components/Form/StepsComponents/HowDidYouFindUs/HowDidYouFindUs";
import dayjs from "dayjs";

const date = dayjs();
console.log(date instanceof dayjs); // true

const schema = z
  .object({
    name: z
      .string({ message: "Por favor, preencha o campo." })
      .min(1, "O nome deve conter ao menos 1 caractere.")
      .max(50, "O máximo de caracteres é 50, por favor corrigir"),
    dateOfBirth: z.string(),
    cpf: z
      .string({ message: "Este campo deve conter digitos." })
      .min(11, "O CPF deve conter 11 digitos"),
    email: z
      .string({ message: "Por favor, preencha o campo." })
      .min(1, { message: "Por favor, preencha o campo." })
      .email("Esse não é um endereço de e-mail válido"),
    street: z.string().min(1),
    streetNumber: z.string().min(1),
    city: z.string().min(1),
    mobileNumber: z
      .string({ message: "Por favor, preencha o campo." })
      .min(10, "O celular deve conter ao menos 10 dígitos"),
    previousKnowledge: z.boolean(),
    participateProjects: z.boolean(),
    musicPreferences: z
      .array(z.string())
      .min(1, "Por favor, selecione pelo menos uma preferência musical"),
    courses: z.string({ message: "Por favor, preencha o campo." }),
    teachers: z.string({ message: "Por favor, preencha o campo." }),
    howDidYouFindUs: z
      .array(z.string())
      .min(1, "Por favor, selecione pelo menos uma opção"),
  })
  .required();

// type FormValues = z.infer<typeof schema>;

const sourceSteps = [
  {
    label: "Dados Pessoais",
    Component: <PersonalData />,
    fields: ["name", "dateOfBirth", "cpf", "email", "mobileNumber"],
    hasError: false,
  },
  {
    label: "Dados de Endereço",
    fields: ["street", "streetNumber", "city"],
    Component: <Address />,
    hasError: false,
  },
  {
    label: "Preferências Musicais",
    fields: ["previousKnowledge", "participateProjects", "musicPreferences"],
    Component: <MusicPreferences />,
    hasError: false,
  },
  {
    label: "Curso escolhido",
    fields: ["courses", "teachers"],
    Component: <ChosenCourse />,
    hasError: false,
  },
  {
    label: "Como você nos conheceu?",
    fields: ["howDidYouFindUs"],
    Component: <HowDidYouFindUs />,
    hasError: false,
  },
];

const getSteps = (errors: string[]) => {
  return sourceSteps.map((step) => {
    return {
      ...step,
      hasError: errors.some((error) => step.fields.includes(error)),
    };
  });
};

export function Cadastrar() {
  const methods = useForm({
    resolver: zodResolver(schema),
    criteriaMode: "all",
    mode: "all",
    defaultValues: {
      name: "",
      dateOfBirth: "",
      street: "",
      city: "",
      streetNumber: "",
      mobileNumber: "",
      telNumber: "",
      previousKnowledge: "",
      musicPreferences: [],
      participateProjects: "",
      courses: [],
      teachers: [],
      HowDidYouFindUs: [],
    },
  });

  if (methods.formState.isSubmitSuccessful) {
    return (
      <Box>
        <Typography variant="h2">Formulário enviado com sucesso!</Typography>
        <Button onClick={() => methods.reset()}>
          Clique aqui para enviar um novo cadastro
        </Button>
      </Box>
    );
  }

  const steps = getSteps(Object.keys(methods.formState.errors));

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
        <Steps items={steps} />
      </form>
    </FormProvider>
  );
}
