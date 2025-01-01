import { Box } from "@mui/material";
// import MultipleSelect from "../../MultipleSelect";
import listsModule from "../../../listsModule";
import { BasicSelect } from "../../BasicSelectNames";

export const ChosenCourse = () => {
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
      <BasicSelect
        name="courses"
        label="Curso escolhido"
        list={listsModule.courses}
      />
      <BasicSelect
        name="teachers"
        label="Professores"
        list={listsModule.teacher}
      />
    </Box>
  );
};
