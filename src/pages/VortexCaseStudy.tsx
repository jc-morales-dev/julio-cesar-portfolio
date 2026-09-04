import { motion } from 'framer-motion'
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaGithub,
  FaRobot,
  FaCheckCircle,
  FaExclamationTriangle,
} from 'react-icons/fa'

/** Flagship commercial case study. Verified tests: 14 unit + 5 e2e. No invented user metrics. */

const architecture = [
  'React 19 + TypeScript + Vite + Tailwind CSS v4 — cliente SPA listo para demos.',
  'Chat multi-proveedor: Gemini, Groq, OpenAI, DeepSeek, OpenRouter y modo local.',
  'Modo offline por defecto: la demo funciona sin claves preconfiguradas.',
  'Settings BYOK: el usuario pega su propia API key en el navegador.',
  'Analisis de archivos (PDF, imagenes, CSV, codigo, etc.) y exportacion JSON/Markdown.',
]

const tradeoffs = [
  {
    title: 'BYOK en cliente vs SaaS multi-tenant',
    text: 'Las claves viven en el navegador. Acelera demos y validacion de flujos, pero no es un producto multi-usuario con credenciales protegidas en servidor.',
  },
  {
    title: 'Demo-first',
    text: 'Priorice onboarding offline, estados de error visibles, cancelacion de respuestas y exportacion frente a auth, cuotas o auditoria.',
  },
]

const outcomes: { label: string; value: string; href?: string }[] = [
  {
    label: 'Demo en vivo',
    value: 'chatbot-vortex.vercel.app',
    href: 'https://chatbot-vortex.vercel.app/',
  },
  {
    label: 'Repositorio',
    value: 'jc-morales-dev/Chatbot-Vortex',
    href: 'https://github.com/jc-morales-dev/Chatbot-Vortex',
  },
  {
    label: 'Tests unitarios (Vitest)',
    value: '14 casos en src/**/*.test.ts',
  },
  {
    label: 'E2E (Playwright)',
    value: '5 journeys: send / cancel / export / settings / BYOK',
  },
  {
    label: 'CI',
    value: 'lint + typecheck + unit + e2e + build en push/PR',
  },
]

const setupSteps = [
  'Clone jc-morales-dev/Chatbot-Vortex from GitHub',
  'Install dependencies with the project lockfile',
  'Start the Vite dev server (offline mode by default)',
  'Run Vitest unit suite and Playwright e2e suite',
]

const limits = [
  'BYOK client-side: keys viven en el navegador; no hay vault ni proxy de servidor.',
  'No es multi-tenant: sin autenticacion de usuarios, cuotas ni auditoria multi-equipo.',
  'Uso recomendado: demos, evaluacion de flujos y pruebas con clave propia — no soporte en produccion sin backend adicional.',
]

export default function VortexCaseStudy() {
  return (
    <div className="min-h-screen bg-dark-bg grid-bg">
      <header className="sticky top-0 z-50 border-b border-dark-border bg-[#0a0a0f]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3">
          <a
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-cyan-accent/5 hover:text-cyan-accent"
          >
            <FaArrowLeft className="text-xs" aria-hidden="true" />
            Volver al portafolio
          </a>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-cyan-accent">
            Caso de estudio
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-green-300">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden="true" />
              Demo en vivo
            </span>
            <span className="rounded-full border border-cyan-accent/40 bg-cyan-accent/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-cyan-accent">
              Flagship comercial
            </span>
          </div>

          <div className="mb-4 flex items-start gap-4">
            <span className="mt-1 hidden text-4xl text-cyan-accent/80 sm:block" aria-hidden="true">
              <FaRobot />
            </span>
            <div>
              <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Chatbot Vortex
              </h1>
              <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-gray-300 sm:text-lg">
                UI de chat multi-proveedor con BYOK, pensada para startups y equipos pequenos que
                necesitan validar demos y flujos sin montar un SaaS multi-tenant.
              </p>
            </div>
          </div>

          <div className="mb-10 overflow-hidden rounded-2xl border border-dark-border bg-dark-card">
            <img
              src="/projects/vortex.webp"
              alt="Vista previa de Chatbot Vortex"
              className="aspect-[16/9] w-full object-cover object-top"
              loading="eager"
            />
          </div>

          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="https://chatbot-vortex.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-accent px-5 py-2.5 text-sm font-bold text-black transition-all hover:bg-[#00e5ff] hover:shadow-lg hover:shadow-cyan-accent/20"
            >
              <FaExternalLinkAlt className="text-xs" aria-hidden="true" />
              Probar demo
            </a>
            <a
              href="https://github.com/jc-morales-dev/Chatbot-Vortex"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-500/70 bg-[#1a1a2e] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-cyan-accent/60 hover:bg-[#20203b]"
            >
              <FaGithub aria-hidden="true" />
              Ver codigo
            </a>
          </div>
        </motion.div>

        <Section title="Problema · para quien">
          <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
            Startups y equipos pequenos suelen necesitar una interfaz de chat con varios
            proveedores de IA para demos, evaluacion de modelos y validacion de flujos — sin
            esperar a un backend multi-tenant con auth, cuotas y claves en servidor. Vortex cubre
            ese hueco: BYOK en el cliente, modo local y exportacion, para probar la experiencia de
            verdad.
          </p>
        </Section>

        <Section title="Arquitectura">
          <ul className="space-y-3">
            {architecture.map(item => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-gray-300 sm:text-base">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-accent" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Decisiones y trade-offs">
          <div className="grid gap-4">
            {tradeoffs.map(item => (
              <div
                key={item.title}
                className="rounded-xl border border-dark-border bg-[#0a0a14] p-4 sm:p-5"
              >
                <h3 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-cyan-accent">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-300">{item.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Tests y CI">
          <p className="mb-4 text-sm leading-relaxed text-gray-300 sm:text-base">
            Evidencia verificada en el repositorio publico (conteo de casos it/test):
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-gray-300">
              <FaCheckCircle className="mt-0.5 shrink-0 text-green-400" aria-hidden="true" />
              <span>
                <strong className="text-white">Vitest:</strong> 14 tests unitarios (api, chat,
                export, files).
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-300">
              <FaCheckCircle className="mt-0.5 shrink-0 text-green-400" aria-hidden="true" />
              <span>
                <strong className="text-white">Playwright:</strong> 5 e2e — conversacion offline,
                BYOK + envio mockeado, fallback local, cancel + export JSON, settings + Markdown.
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-300">
              <FaCheckCircle className="mt-0.5 shrink-0 text-green-400" aria-hidden="true" />
              <span>
                <strong className="text-white">CI en push/PR:</strong> lint, typecheck, unit, e2e
                (Chromium) y build.
              </span>
            </li>
          </ul>
        </Section>

        <Section title="Limites (honestos)">
          <ul className="space-y-3">
            {limits.map(item => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-gray-300">
                <FaExclamationTriangle className="mt-0.5 shrink-0 text-yellow-400" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Resultados medibles (evidencia real)">
          <dl className="divide-y divide-dark-border rounded-xl border border-dark-border bg-[#0a0a14]">
            {outcomes.map(item => (
              <div
                key={item.label}
                className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <dt className="font-mono text-[11px] font-semibold uppercase tracking-wider text-cyan-accent">
                  {item.label}
                </dt>
                <dd className="text-sm text-gray-200 sm:text-right">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-accent underline-offset-4 hover:underline"
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 rounded-xl border border-dark-border bg-dark-card p-4 sm:p-5">
            <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-cyan-accent">
              Setup local
            </h3>
            <pre className="overflow-x-auto rounded-lg bg-[#0a0a14] p-4 font-mono text-[12px] leading-relaxed text-gray-300">
              {setupSteps.join('\n')}
            </pre>
          </div>
        </Section>

        <Section title="Tambien · NEXUS">
          <div className="rounded-xl border border-cyan-accent/25 bg-cyan-accent/5 p-5">
            <p className="text-sm leading-relaxed text-gray-300">
              <strong className="text-white">NEXUS</strong> es un workspace de agente derivado de{' '}
              <span className="font-mono text-cyan-100">G0DM0D3</span> (AGPL): orquestacion local,
              sandbox E2B, skills y timeline de herramientas en la UI. Complementa a Vortex cuando
              el cliente necesita ejecucion real, no solo chat.
            </p>
            <a
              href="https://nexus-exec.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cyan-accent underline-offset-4 hover:underline"
            >
              <FaExternalLinkAlt className="text-xs" aria-hidden="true" />
              nexus-exec.vercel.app
            </a>
          </div>
        </Section>

        <div className="mt-12 border-t border-dark-border pt-8 text-center">
          <a
            href="/#projects"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-cyan-accent/50 bg-cyan-accent/10 px-5 py-2.5 text-sm font-semibold text-cyan-accent transition-colors hover:bg-cyan-accent/20"
          >
            <FaArrowLeft className="text-xs" aria-hidden="true" />
            Ver todos los proyectos
          </a>
        </div>
      </main>

      <footer className="border-t border-dark-border py-8 text-center">
        <p className="font-mono text-xs text-gray-400">
          © {new Date().getFullYear()} Julio Cesar Morales · Caso de estudio Vortex
        </p>
      </footer>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
      <div className="gradient-line mt-3 mb-6 w-20" />
      {children}
    </section>
  )
}
