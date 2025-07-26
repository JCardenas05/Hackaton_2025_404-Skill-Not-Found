import { motion } from "framer-motion";
import { MessageCircle, BotIcon } from "lucide-react";
import logo from "../../assets/logo.png";

export const Overview = () => {
  return (
    <>
      <motion.div
        key="overview"
        className="max-w-3xl mx-auto md:mt-20"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ delay: 0.75 }}
      >
        <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
          <p className="flex flex-row justify-center gap-4 items-center">
            <BotIcon size={44} />
            <span>+</span>
            <MessageCircle size={44} />
          </p>
          <p>
            Bienvenidos a el chatbot de <strong>Ingelab</strong>
            <br />
            tu asistente virtual para resolver tus dudas y preguntas.
            <br />
          </p>
          <div className="p-2 h-fit bg-orange-800 rounded-lg">
            <img src={logo} alt="Ingelab Logo" className="w-48 mx-auto" />
          </div>
        </div>
      </motion.div>
    </>
  );
};
