import { Box } from "@mui/material";
import { BasicSelectBool } from "../../BasicSelectBool";
import MultipleSelect from "../../MultipleSelect";
import listsModule from "../../../listsModule";
import { useForm, FormProvider } from "react-hook-form";

export const MusicPreferences = () => {
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
      <BasicSelectBool
        name="Previous_knowledge"
        label="Conhecimentos musicais prévios?"
      />
      <MultipleSelect
        name="Music_Preferences"
        label="Quais estilos de música você mais gosta?"
        list={listsModule.musicStyles}
      />
      <BasicSelectBool
        name="Participate_projects"
        label="Gostaria de participar dos projetos da escola?"
      />
    </Box>
  );
};
