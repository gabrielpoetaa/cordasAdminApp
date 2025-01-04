import { motion } from "framer-motion";

interface ResetFormButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>; // Tipando onClick
}

export const ResetFormButton: React.FC<ResetFormButtonProps> = ({
  onClick,
}) => {
  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.9, type: "spring", stiffness: 100 }}
      >
        <button className="btnFormOutline" type="button" onClick={onClick}>
          Retornar ao início
        </button>
      </motion.button>
    </div>
  );
};
