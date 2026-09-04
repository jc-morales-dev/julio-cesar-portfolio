import { motion } from 'framer-motion';
import { FaRocket, FaComments, FaBriefcase, FaBook } from 'react-icons/fa';

// Estado actual — actualizo esto cada que cambia algo importante
const statuses = [
  {
    icon: FaRocket,
    label: 'Enfocado en',
    text: 'Seguir mejorando Chatbot Vortex: contexto largo, memoria persistente y soporte multiagente.',
    link: 'https://github.com/jc-morales-dev/Chatbot-Vortex',
    iconColor: 'text-cyan-accent',
    bgColor: 'bg-cyan-accent/10 group-hover:bg-cyan-accent/20',
  },
  {
    icon: FaBook,
    label: 'Aprendiendo',
    text: 'Arquitecturas RAG, LangChain y patrones de agentes IA. Cada semana hay algo nuevo que aprender.',
    link: null,
    iconColor: 'text-purple-400',
    bgColor: 'bg-purple-400/10 group-hover:bg-purple-400/20',
  },
  {
    icon: FaComments,
    label: 'Beta testers',
    text: 'Busco personas que quieran probar mis herramientas de IA y darme feedback honesto.',
    link: null,
    iconColor: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10 group-hover:bg-yellow-400/20',
  },
  {
    icon: FaBriefcase,
    label: 'Open to Work',
    text: 'Disponible para proyectos freelance y colaboraciones Full Stack. Especialmente proyectos que involucren IA.',
    link: null,
    iconColor: 'text-green-400',
    bgColor: 'bg-green-400/10 group-hover:bg-green-400/20',
  },
];

export default function CurrentStatus() {
  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
      {statuses.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="flex items-start gap-4 p-5 rounded-xl bg-dark-card border border-dark-border hover:border-cyan-accent/25 transition-all duration-300 group"
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${s.bgColor}`}>
            <s.icon className={s.iconColor} />
          </div>
          <div>
            <div className="text-cyan-accent text-sm font-mono font-semibold mb-1">{s.label}</div>
            <p className="text-gray-300 text-sm leading-relaxed">{s.text}</p>
            {s.link && (
              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 px-3 py-2 -ml-3 rounded-lg text-cyan-accent text-sm hover:bg-cyan-accent/10 transition-colors"
              >
                Ver el repo
                <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
