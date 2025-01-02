import { Box } from "@mui/material";
import { useState } from "react";
import listsModule from "../../../listsModule";
import { BasicSelect } from "../../BasicSelectNames";

interface Course {
  course: string;
  professor: string;
}

export const ChosenCourse: React.FC = () => {
  // Inicializando com um curso vazio
  const [chosenCourses, setChosenCourses] = useState<Course[]>([{ course: '', professor: '' }]);

  const handleAddCourse = () => {
    setChosenCourses([...chosenCourses, { course: '', professor: '' }]);
  };

  const handleRemoveCourse = (index: number) => {
    setChosenCourses((prevCourses) =>
      prevCourses.filter((_, courseIndex) => courseIndex !== index)
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
      {chosenCourses.map((courseObject, index) => (
        <div key={index}>
          <BasicSelect
            name={`courses[${index}]`} // Dynamic name for each course select
            label="Curso escolhido"
            list={listsModule.courses}
            value={courseObject.course} // Passando o valor correto
            onChange={(event) => {
              setChosenCourses((prevCourses) =>
                prevCourses.map((course, courseIndex) =>
                  courseIndex === index
                    ? { ...course, course: event.target.value } // Atualiza o curso
                    : course
                )
              );
            }}
          />
          <BasicSelect
            name={`teachers[${index}]`} // Dynamic name for each teacher select
            label="Professores"
            list={listsModule.teacher}
            value={courseObject.professor} // Passando o valor correto
            onChange={(event) => {
              setChosenCourses((prevCourses) =>
                prevCourses.map((course, courseIndex) =>
                  courseIndex === index
                    ? { ...course, professor: event.target.value } // Atualiza o professor
                    : course
                )
              );
            }}
          />
          <button onClick={() => handleRemoveCourse(index)}>Remover</button>
        </div>
      ))}
      <button onClick={handleAddCourse}>Adicionar Curso</button>
    </Box>
  );
};
