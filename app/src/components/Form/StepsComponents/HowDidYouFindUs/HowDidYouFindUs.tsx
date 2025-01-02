import { Box } from "@mui/material";
import MultipleSelect from "../../MultipleSelect";
import listsModule from "../../../listsModule";

export const HowDidYouFindUs = () => {
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
      <MultipleSelect
        name="howDidYouFindUs"
        label="Como você nos conheceu?"
        list={listsModule.howDidYouFindUs}
      />
    </Box>
  );
};
