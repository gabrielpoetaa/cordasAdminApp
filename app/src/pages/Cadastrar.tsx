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
import { SubmitMessage } from "../components/Form/SubmitMessage";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

const date = dayjs();
console.log(date instanceof dayjs); // true

const courseSchema = z.object({
  course: z.string().min(1, "Por favor, selecione um curso"), // Validação para o curso
  teacher: z.string().min(1, "Por favor, selecione um teacher"), // Validação para o teacher
});

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
    courses: z
      .array(courseSchema) // Validando o array de objetos `course` e `teacher`
      .min(1, "Por favor, escolha pelo menos um curso."),
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
    fields: ["previousKnowledge", "participateProjects"],
    Component: <MusicPreferences />,
    hasError: false,
  },
  {
    label: "Curso escolhido",
    fields: ["course", "teacher"],
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
      cpf: "",
      email: "",
      street: "",
      city: "",
      streetNumber: "",
      mobileNumber: "",
      telNumber: "",
      previousKnowledge: false,
      participateProjects: false,
      MusicPreferences: [],
      courses: [{ course: "", teacher: "" }],
      HowDidYouFindUs: [],
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCircularProgress, setShowCircularProgress] = useState(false);

  // Quando o envio do formulário for bem-sucedido
  const onSubmit = async (data: any) => {
    setIsSubmitting(true); // Ativa o estado de submissão

    try {
      const response = await fetch("http://localhost:5000/students", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro na requisicao");
      }

      setIsSubmitting(false);
      setShowCircularProgress(true);
    } catch (error) {
      console.error("Erro ao enviar dados: ", error);
      setIsSubmitting(false);
    }

    if (isSubmitting) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress /> {/* CircularProgress durante a submissão */}
        </Box>
      );
    }
  };

  // console.log("Valores do formulário:", methods.getValues());

  // Renderiza a mensagem de sucesso após 2 segundos
  if (showCircularProgress && methods.formState.isSubmitSuccessful) {
    return (
      <Box>
        <SubmitMessage />
        <Button onClick={() => methods.reset()}>
          Clique aqui para enviar um novo cadastro
        </Button>
      </Box>
    );
  }

  // console.log("Erros de validação:", methods.formState.errors);

  const steps = getSteps(Object.keys(methods.formState.errors));

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Steps items={steps} />
      </form>
    </FormProvider>
  );
}
