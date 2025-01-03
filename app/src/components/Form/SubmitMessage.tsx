import { CircularProgress } from "@mui/material";

export const SubmitMessage = () => {
  return (
    <div className="muted:max-w-[500px] mx-auto min-h-[80vh] flex items-center justify-center">
      <div className="space-y-12">
        <h1 className="text-center text-3xl text-goldCordas_500 font-semibold ">
          Formulário enviado com sucesso!
        </h1>
        <div className="text-center">{/* <CircularProgress /> */}</div>
      </div>
    </div>
  );
};
