import { Box } from "@mui/material";
import { useState } from "react";
import listsModule from "../../../listsModule";
import { BasicSelect } from "../../BasicSelectNames";

interface Courses {
  Course_name: string;
  Teacher_name: string;
}

export const ChosenCourse: React.FC = () => {
  // Inicializando com um curso vazio
  const [chosenCourses, setChosenCourses] = useState<Courses[]>([
    { Course_name: "", Teacher_name: "" },
  ]);

  const handleAddCourse = () => {
    setChosenCourses([...chosenCourses, { Course_name: "", Teacher_name: "" }]);
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
      gap={8}
      marginTop={10}
      width={500}
    >
      {chosenCourses.map((courseObject, index) => (
        <div key={index}>
          <div className="space-y-4">
            <BasicSelect
              name={`courses[${index}].Course_name`} // Mudando para associar 'course' corretamente no objeto
              label="Curso escolhido"
              list={listsModule.courses}
              value={courseObject.Course_name} // Passando o valor correto
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
              name={`courses[${index}].Teacher_name`} // Mudando para associar 'teacher' corretamente no objeto
              label="Professor"
              list={listsModule.teacher}
              value={courseObject.Teacher_name} // Passando o valor correto
              onChange={(event) => {
                setChosenCourses((prevCourses) =>
                  prevCourses.map((course, courseIndex) =>
                    courseIndex === index
                      ? { ...course, teacher: event.target.value } // Atualiza o teacher
                      : course
                  )
                );
              }}
            />
          </div>
          <div className="flex justify-between mt-8">
            <button
              className="btnForm"
              onClick={() => handleRemoveCourse(index)}
            >
              Remover
            </button>
            <button className="btnForm w-fit" onClick={handleAddCourse}>
              Adicionar Curso
            </button>
          </div>
        </div>
      ))}
    </Box>
  );
};
