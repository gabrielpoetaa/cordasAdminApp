import { motion } from "motion/react";

export const SubmitMessage = () => {
  return (
    <div className="muted:max-w-[500px] mx-auto min-h-[80vh] flex items-center justify-center">
      <div className="space-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
        >
          <h1 className="text-center text-4xl text-goldCordas_400 font-semibold ">
            Formulário enviado com sucesso!
          </h1>
        </motion.div>
        <div className="text-center">{/* <CircularProgress /> */}</div>
      </div>
    </div>
  );
};
