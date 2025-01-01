import { Box } from "@mui/material";
import { BasicSelectBool } from "../../BasicSelectBool";
import MultipleSelect from "../../MultipleSelect";
import listsModule from "../../../listsModule";
import { useForm, FormProvider } from "react-hook-form";

export const MusicPreferences = () => {
  const methods = useForm({
    defaultValues: {
      previousKnowledge: false,
      participateProjects: true,
    },
  });
  return (
    <FormProvider {...methods}>
      <Box
        marginY={10}
        marginX="auto"
        display="flex"
        flexDirection="column"
        gap={2}
        marginTop={10}
        width={500}
      >
        <BasicSelectBool
          name="previousKnowledge"
          label="Conhecimentos musicais prévios?"
        />
        <MultipleSelect
          name="musicPreferences"
          label="Quais estilos de música você mais gosta?"
          list={listsModule.musicStyles}
        />
        <BasicSelectBool
          name="participateProjects"
          label="Gostaria de participar dos projetos da escola?"
        />
      </Box>
    </FormProvider>
  );
};
