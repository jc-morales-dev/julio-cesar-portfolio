import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'

import { projects, type Project } from '../data/projects'

const statusConfig = {
  live: { label: 'Demo en vivo', color: 'text-green-300', bg: 'bg-green-400' },
  code: { label: 'Código disponible', color: 'text-cyan-accent', bg: 'bg-cyan-accent' },
  development: { label: 'En desarrollo', color: 'text-yellow-300', bg: 'bg-yellow-300' },
  completed: { label: 'Completado', color: 'text-gray-200', bg: 'bg-gray-200' },
  // Para lo que no se prueba en el navegador: se descarga y se instala.
  release: { label: 'APK descargable', color: 'text-orange-300', bg: 'bg-orange-400' },
}

const detailLabels = {
  problem: 'Problema',
  built: 'Qué construí',
  technical: 'Decisión técnica',
  result: 'Estado / resultado',
} as const

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver código de ${project.title} en GitHub`}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-500/70 bg-[#1a1a2e] px-4 py-2 text-sm font-semibold text-white transition-all hover:border-cyan-accent/60 hover:bg-[#20203b]"
      >
        <FaGithub className="text-base" aria-hidden="true" />
        Ver código
      </a>
      {project.caseStudyPath && (
        <a
          href={project.caseStudyPath}
          aria-label={`Leer caso de estudio de ${project.title}`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-cyan-accent/50 bg-cyan-accent/10 px-4 py-2 text-sm font-semibold text-cyan-accent transition-all hover:bg-cyan-accent/20"
        >
          Caso de estudio
        </a>
      )}
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.demoLabel ?? 'Probar demo en vivo'} de ${project.title}`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-accent px-4 py-2 text-sm font-bold text-black transition-all hover:bg-[#00e5ff] hover:shadow-lg hover:shadow-cyan-accent/20"
        >
          <FaExternalLinkAlt className="text-xs" aria-hidden="true" />
          {project.demoLabel ?? 'Probar demo'}
        </a>
      )}
      {project.exampleUrl && (
        <a
          href={project.exampleUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.exampleLabel ?? 'Ver ejemplo público'} de ${project.title}`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-cyan-accent/50 bg-cyan-accent/10 px-4 py-2 text-sm font-semibold text-cyan-accent transition-all hover:bg-cyan-accent/20"
        >
          <FaExternalLinkAlt className="text-xs" aria-hidden="true" />
          {project.exampleLabel ?? 'Ver ejemplo público'}
        </a>
      )}
    </div>
  )
}

function ProjectVisual({ project }: { project: Project }) {
  const status = statusConfig[project.status]

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#0a1628] to-[#0a0a14] ${project.featured ? 'aspect-[16/8.5]' : 'aspect-[16/9]'}`}>
      <img
        src={project.image}
        alt={`Vista previa de ${project.title}`}
        loading="lazy"
        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
        <div>
          <h3 className={`font-bold text-white drop-shadow-lg ${project.featured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
            {project.title}
          </h3>
          <div className="mt-1.5 flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${status.bg}`} aria-hidden="true" />
            <span className={`${status.color} text-xs font-semibold uppercase tracking-wide`}>{status.label}</span>
          </div>
        </div>
        <span className="hidden text-3xl text-cyan-accent/80 sm:block sm:text-4xl" aria-hidden="true">
          {project.icon}
        </span>
      </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="group overflow-hidden rounded-2xl border border-dark-border bg-dark-card transition-colors duration-300 hover:border-cyan-accent/50"
    >
      <ProjectVisual project={project} />

      <div className="p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap gap-2" aria-label={`Tecnologías de ${project.title}`}>
          {project.tags.map(tag => (
            <span
              key={tag}
              className="rounded-full border border-cyan-accent/35 bg-cyan-accent/10 px-2.5 py-1 font-mono text-[11px] font-medium text-cyan-100"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mb-5 text-sm leading-relaxed text-gray-200">{project.summary}</p>

        <dl className="mb-5 divide-y divide-dark-border rounded-xl border border-dark-border bg-[#0a0a14] px-4">
          {(Object.keys(detailLabels) as Array<keyof typeof detailLabels>).map(key => (
            <div key={key} className="py-3">
              <dt className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-cyan-accent">
                {detailLabels[key]}
              </dt>
              <dd className="text-xs leading-relaxed text-gray-200">{project[key]}</dd>
            </div>
          ))}
        </dl>

        <ProjectLinks project={project} />
      </div>
    </motion.article>
  )
}

function NexusCase({ project }: { project: Project }) {
  const facts = [
    { label: 'Problema', text: project.problem },
    { label: 'Solución', text: project.built },
    { label: 'Resultado técnico', text: project.result },
  ]

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group overflow-hidden rounded-2xl border border-cyan-accent/45 bg-dark-card shadow-[0_0_40px_rgba(0,201,255,0.08)]"
    >
      <div className="relative">
        <ProjectVisual project={project} />
        <div className="absolute right-4 top-4 rounded-full border border-cyan-accent/60 bg-[#07111d]/90 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-accent backdrop-blur-sm">
          Caso principal
        </div>
      </div>

      <div className="p-5 sm:p-8">
        <p className="max-w-3xl text-base font-medium leading-relaxed text-white sm:text-lg">
          {project.summary}
        </p>

        <div className="my-6 grid gap-3 md:grid-cols-3">
          {facts.map(fact => (
            <div key={fact.label} className="rounded-xl border border-dark-border bg-[#0a0a14] p-4">
              <h4 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-cyan-accent">
                {fact.label}
              </h4>
              <p className="text-sm leading-relaxed text-gray-200">{fact.text}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 rounded-xl border border-cyan-accent/25 bg-cyan-accent/5 p-4">
          <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-wider text-cyan-accent">
            Decisión técnica clave
          </p>
          <p className="text-sm leading-relaxed text-gray-200">{project.technical}</p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2" aria-label="Tecnologías de NEXUS">
          {project.tags.map(tag => (
            <span key={tag} className="rounded-full border border-cyan-accent/40 bg-cyan-accent/10 px-3 py-1 font-mono text-[11px] font-medium text-cyan-100">
              {tag}
            </span>
          ))}
        </div>

        <ProjectLinks project={project} />
      </div>
    </motion.article>
  )
}

export default function FeaturedProject() {
  const featuredProject = projects.find(project => project.featured) ?? projects[0]
  const demoProjects = projects.filter(project => project.slug !== featuredProject.slug)

  return (
    <div className="mx-auto w-full max-w-5xl">
      <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-gray-300 sm:text-base">
        Productos propios que se pueden abrir, probar y revisar en código. NEXUS es el trabajo más
        completo técnicamente; Vortex es el caso de estudio comercial (BYOK multi-proveedor). Los demás
        muestran amplitud entre agentes móviles, herramientas de desarrollo y Canvas.
      </p>

      <NexusCase project={featuredProject} />

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {demoProjects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index + 1} />
        ))}
      </div>
    </div>
  )
}
