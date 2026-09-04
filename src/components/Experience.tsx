import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'

interface CaseStudy {
  title: string
  context: string
  problem: string
  decisions: string[]
  result: string
  github?: string
  demo?: string
}

const cases: CaseStudy[] = [
  {
    title: 'NEXUS',
    context: 'Agente autónomo · 2026–presente',
    problem:
      'Pasar de una respuesta conversacional a un agente que haga el trabajo y entregue archivos fuera de su entorno de ejecución.',
    decisions: [
      'Controlar el ciclo de plan, herramienta, observación y parada desde código propio.',
      'Aislar la ejecución en E2B y capturar los artefactos antes de cerrar el sandbox.',
    ],
    result:
      'Un flujo verificable: el usuario ve el plan, sigue las herramientas y descarga los archivos producidos por el agente.',
    github: 'https://github.com/jc-morales-dev/NEXUS',
    demo: 'https://nexus-exec.vercel.app/',
  },
  {
    title: 'Chatbot Vortex',
    context: 'Cliente multimodal · 2024–presente',
    problem:
      'Mantener conversaciones útiles con distintos modelos y formatos sin ocultar al usuario cómo se configura cada proveedor.',
    decisions: [
      'Guardar historial y preferencias en el navegador, con exportación a JSON y Markdown.',
      'Usar modo offline y BYOK para que la demo no distribuya claves preconfiguradas.',
    ],
    result:
      'Una interfaz pública para probar texto, PDFs, imágenes y otros adjuntos con contexto, búsqueda y errores visibles.',
    github: 'https://github.com/jc-morales-dev/Chatbot-Vortex',
    demo: 'https://chatbot-vortex.vercel.app/',
  },
]

export default function Experience() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-gray-300 sm:text-base">
        El foco aquí no es repetir las funciones de cada producto, sino mostrar cómo abordé
        problemas técnicos distintos.
      </p>

      <div className="grid gap-5 lg:grid-cols-2">
        {cases.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.45 }}
            className="flex h-full flex-col rounded-xl border border-dark-border bg-dark-card p-5 transition-colors hover:border-cyan-accent/40 sm:p-6"
          >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-cyan-accent">
              {item.context}
            </p>
            <h3 className="mt-2 text-xl font-bold text-white">{item.title}</h3>

            <dl className="mt-5 space-y-5">
              <div>
                <dt className="mb-1.5 text-xs font-bold uppercase tracking-wide text-gray-100">Problema</dt>
                <dd className="text-sm leading-relaxed text-gray-300">{item.problem}</dd>
              </div>
              <div>
                <dt className="mb-1.5 text-xs font-bold uppercase tracking-wide text-gray-100">
                  Decisiones técnicas
                </dt>
                <dd>
                  <ul className="space-y-2">
                    {item.decisions.map(decision => (
                      <li key={decision} className="flex items-start gap-2 text-sm leading-relaxed text-gray-300">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-accent" aria-hidden="true" />
                        <span>{decision}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="mb-1.5 text-xs font-bold uppercase tracking-wide text-gray-100">Resultado</dt>
                <dd className="text-sm leading-relaxed text-gray-300">{item.result}</dd>
              </div>
            </dl>

            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              {item.github && (
                <a
                  href={item.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-gray-500/60 px-3 py-2 text-sm font-semibold text-gray-100 transition-colors hover:border-cyan-accent/60 hover:text-cyan-accent"
                >
                  <FaGithub aria-hidden="true" />
                  Código
                </a>
              )}
              {item.demo && (
                <a
                  href={item.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-cyan-accent/50 bg-cyan-accent/10 px-3 py-2 text-sm font-semibold text-cyan-accent transition-colors hover:bg-cyan-accent/20"
                >
                  <FaExternalLinkAlt className="text-xs" aria-hidden="true" />
                  Demo
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
