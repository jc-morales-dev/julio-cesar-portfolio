import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import TypingEffect from './components/TypingEffect'
import ParticleField from './components/ParticleField'
import GitHubStats from './components/GitHubStats'
import TechStack from './components/TechStack'
import FeaturedProject from './components/FeaturedProject'
import CurrentStatus from './components/CurrentStatus'
import Contact from './components/Contact'
import Education from './components/Education'
import Experience from './components/Experience'
import { FaTerminal, FaDownload, FaBriefcase, FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa'

// Navegación — primero la oferta y la evidencia; después, el contexto personal.
const nav = [
  { label: 'Servicios', href: '#services', primary: true },
  { label: 'Proyectos', href: '#projects', primary: true },
  { label: 'Casos', href: '#experience', primary: true },
  { label: 'Tech', href: '#tech', primary: false },
  { label: 'Sobre Mí', href: '#about', primary: false },
  { label: 'Educación', href: '#education', primary: false },
  { label: 'Actividad', href: '#stats', primary: false },
  { label: 'Contacto', href: '#contact', primary: true },
]

const services = [
  {
    title: 'Aplicaciones React + TypeScript',
    description: 'Interfaces responsivas, formularios, validación y estados de carga, error y éxito preparados para despliegue.',
  },
  {
    title: 'Integración de IA',
    description: 'Chat, archivos, streaming e historial mediante backend o BYOK, según las restricciones de cada proveedor.',
  },
  {
    title: 'Dashboards y herramientas internas',
    description: 'Pantallas operativas con datos, filtros y estados claros para que un equipo pueda decidir y actuar.',
  },
  {
    title: 'Estabilización de frontend y APIs',
    description: 'Corrección de builds, tipos, errores de integración y pruebas enfocadas para recuperar una entrega.',
  },
]

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-16 px-4 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 tabIndex={-1} className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
        <div className="gradient-line w-24 mx-auto mt-4" />
      </motion.div>
      {children}
    </section>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const handleMobileNavigation = (href: string) => {
    setOpen(false)
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(`${href} h2`)?.focus({ preventScroll: true })
    })
  }

  // Cerrar con Escape — si abriste el menú y te arrepentiste
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        requestAnimationFrame(() => menuButtonRef.current?.focus())
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a0a0f]/80 border-b border-dark-border"
      aria-label="Navegación principal"
    >
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        <a
          href="#hero"
          className="flex items-center gap-2 px-2 py-2 -ml-2 rounded-lg text-cyan-accent font-mono font-bold text-lg hover:bg-cyan-accent/5 transition-colors"
        >
          <FaTerminal aria-hidden="true" />
          <span>JC</span>
          <span className="sr-only">Julio Cesar — ir al inicio</span>
        </a>

        {/* Desktop: solo lo esencial */}
        <div className="hidden md:flex items-center gap-1">
          {nav.filter(i => i.primary).map(item => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2.5 text-sm text-gray-300 hover:text-cyan-accent rounded-lg hover:bg-cyan-accent/5 transition-all font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Móvil: hamburguesa */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-haspopup="true"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 rounded-lg text-gray-300 hover:text-cyan-accent hover:bg-cyan-accent/5 transition-colors"
        >
          {open ? <FaTimes className="text-lg" aria-hidden="true" /> : <FaBars className="text-lg" aria-hidden="true" />}
        </button>
      </div>

      {/* Panel desplegable móvil */}
      {open && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100svh-60px)] overflow-y-auto overscroll-contain border-t border-dark-border bg-[#0a0a0f]/95 backdrop-blur-xl md:hidden"
        >
          <div className="px-4 py-2 flex flex-col">
            {nav.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleMobileNavigation(item.href)}
                className="px-3 py-3.5 text-sm text-gray-300 hover:text-cyan-accent rounded-lg hover:bg-cyan-accent/5 transition-all font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.nav>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-dark-bg grid-bg">
      <Navbar />

      <main id="main-content">
        {/* ===== Hero ===== */}
        <section id="hero" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-16">
          <ParticleField />
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-accent/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-accent/5 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 w-full max-w-5xl px-4 py-16 text-center sm:py-24">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-accent to-cyan-dark p-[3px]"
            >
              <div className="w-full h-full rounded-full bg-dark-bg overflow-hidden">
                {/* Foto propia servida desde /public: antes venía de
                    github.com, que añadía una conexión externa en el hero
                    justo donde se mide el LCP. */}
                <img
                  src="/foto-julio.webp"
                  alt="Julio Cesar Morales"
                  width={106}
                  height={106}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover rounded-full"
                  onError={e => {
                    const el = e.target as HTMLImageElement
                    el.style.display = 'none'
                    el.parentElement!.innerHTML =
                      '<span class="text-cyan-accent text-3xl font-bold flex items-center justify-center h-full">JC</span>'
                  }}
                />
              </div>
            </motion.div>

            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-accent sm:text-sm">
              Julio Cesar Morales · Montevideo, Uruguay
            </p>

            {/* Título principal — fijo y directo: rol, especialidad y propuesta de valor. */}
            <h1 className="mx-auto max-w-4xl text-balance text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              Desarrollador React / TypeScript — demos e integración de IA.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mx-auto mt-5 max-w-3xl text-pretty text-base leading-relaxed text-gray-200 sm:text-lg"
            >
              Construyo demos y prototipos: agentes que ejecutan tareas, chatbots multimodales y
              aplicaciones de punta a punta, desde la interfaz hasta el despliegue.
            </motion.p>

            {/* Línea de terminal decorativa */}
            <div className="mt-6">
              <TypingEffect />
            </div>

            {/* Botones CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mx-auto flex w-full max-w-3xl flex-col justify-center gap-3 sm:flex-row sm:flex-wrap"
            >
              <a
                href="#projects"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-cyan-accent px-6 py-3 text-sm font-bold text-black transition-all hover:bg-[#00e5ff] hover:shadow-lg hover:shadow-cyan-accent/20"
              >
                Ver lo que he construido
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-cyan-accent/60 px-6 py-3 text-sm font-semibold text-cyan-accent transition-all hover:bg-cyan-accent/10"
              >
                Hablemos de tu proyecto
              </a>
              {/*
                CV: Sube tu archivo PDF a /public/CV-Julio-Cesar.pdf
                y este botón funcionará automáticamente.
              */}
              <a
                href="/CV-Julio-Cesar.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-gray-500/70 px-6 py-3 text-sm font-medium text-gray-200 transition-all hover:border-cyan-accent/60 hover:text-cyan-accent"
              >
                <FaDownload className="text-xs" aria-hidden="true" />
                Descargar CV
              </a>
            </motion.div>

            {/* Badge disponible */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex justify-center mt-6"
            >
              <a
                href="#contact"
                className="available-badge flex items-center gap-2 px-4 py-2.5 rounded-full bg-green-500/10 border border-green-500/40 text-green-300 text-xs font-mono hover:bg-green-500/15 transition-all"
              >
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-60" />
                  <span className="relative rounded-full h-2 w-2 bg-green-400" />
                </span>
                Disponible para proyectos
              </a>
            </motion.div>

            {/* Social links rápidos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex justify-center gap-4 mt-6"
            >
              {[
                { href: 'https://github.com/jc-morales-dev', icon: <FaGithub />, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/julio-cesar-406314373/', icon: <FaLinkedin />, label: 'LinkedIn' },
                { href: 'mailto:juliocesarmoralesalvarado9@gmail.com', icon: <FaEnvelope />, label: 'Email' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 flex items-center justify-center rounded-lg border border-dark-border text-gray-300 hover:text-cyan-accent hover:border-cyan-accent/40 hover:bg-cyan-accent/5 transition-all text-lg"
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator — hijo de la section, no del bloque de contenido */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block"
            aria-hidden="true"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-5 h-8 rounded-full border-2 border-cyan-accent/30 flex items-start justify-center p-1"
            >
              <div className="w-1 h-2 rounded-full bg-cyan-accent/60" />
            </motion.div>
          </motion.div>
        </section>

        {/* ===== Servicios: oferta concreta antes de la evidencia ===== */}
        <Section id="services" title="Servicios que puedo entregar">
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2">
            {services.map(service => (
              <article
                key={service.title}
                className="rounded-xl border border-dark-border bg-dark-card p-6 text-left glow-border"
              >
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-300">{service.description}</p>
              </article>
            ))}
          </div>
        </Section>

        <div className="gradient-line max-w-lg mx-auto" />

        {/* ===== Proyectos: evidencia pública después de la oferta de servicios ===== */}
        <Section id="projects" title="Demos que he construido">
          <FeaturedProject />
        </Section>

        <div className="gradient-line max-w-lg mx-auto" />

        {/* ===== Casos de estudio ===== */}
        <Section id="experience" title="Casos de estudio">
          <Experience />
        </Section>

        <div className="gradient-line max-w-lg mx-auto" />

        {/* ===== Tech Stack ===== */}
        <Section id="tech" title="Tech Stack con evidencia">
          <TechStack />
        </Section>

        <div className="gradient-line max-w-lg mx-auto" />

        {/* ===== Sobre Mí ===== */}
        <Section id="about" title="Sobre Mí">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-dark-card border border-dark-border rounded-xl p-6 sm:p-8 glow-border">
              {/* Header tipo terminal */}
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-dark-border">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-gray-400 text-xs font-mono">about.md</span>
              </div>

              <div className="space-y-5 font-mono text-sm leading-relaxed">
                {/* Párrafo 1: quién soy */}
                <p className="text-gray-300">
                  <span className="text-cyan-accent mr-2" aria-hidden="true">{'>'}</span>
                  Soy <span className="text-cyan-accent font-semibold">Julio Cesar</span>, desarrollador
                  React / TypeScript enfocado en Node.js e integración de IA en demos y prototipos.
                </p>

                {/* Párrafo 2: especialidad */}
                <p className="text-gray-300">
                  <span className="text-cyan-accent mr-2" aria-hidden="true">{'>'}</span>
                  Trabajo de extremo a extremo: diseño la interfaz, conecto servicios y modelos,
                  resuelvo estados de carga y error, y preparo el despliegue para que el demo se
                  pueda probar de verdad.
                </p>

                {/* Párrafo 3: cómo trabajo */}
                <p className="text-gray-300">
                  <span className="text-cyan-accent mr-2" aria-hidden="true">{'>'}</span>
                  Mis mejores ejemplos son <span className="text-cyan-accent font-semibold">NEXUS</span>,
                  que ejecuta tareas en un sandbox, y{' '}
                  <a href="/case-studies/vortex"
                    className="text-cyan-accent underline-offset-4 hover:underline">
                    Chatbot Vortex
                  </a>
                  , una interfaz multimodal con varios proveedores y BYOK.
                </p>

                {/* Párrafo 4: actualmente */}
                <p className="text-gray-300">
                  <span className="text-cyan-accent mr-2" aria-hidden="true">{'>'}</span>
                  Actualmente estoy aprendiendo sobre{' '}
                  <span className="text-cyan-accent font-semibold">
                    arquitecturas RAG, agentes IA y LangChain
                  </span>
                  , que es lo que necesito para la siguiente versión de NEXUS.
                </p>

                {/* Info rápida */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-dark-border">
                  {[
                    { label: 'Ubicación', value: 'Montevideo, Uruguay (UTC-3)' },
                    { label: 'Idiomas', value: 'Español (nativo) · Inglés (técnico)' },
                    { label: 'Disponibilidad', value: 'Freelance · Full-time remoto' },
                    { label: 'Intereses', value: 'IA · Web · Open Source' },
                  ].map(item => (
                    <div key={item.label}>
                      <span className="text-gray-400 text-[11px] block mb-0.5">{item.label}</span>
                      <span className="text-gray-300 text-xs">{item.value}</span>
                    </div>
                  ))}
                </div>

                <p aria-hidden="true">
                  <span className="cursor-blink text-cyan-accent">█</span>
                </p>
              </div>
            </div>
          </motion.div>
        </Section>

        <div className="gradient-line max-w-lg mx-auto" />

        {/* ===== Educación ===== */}
        <Section id="education" title="Formación">
          <Education />
        </Section>

        <div className="gradient-line max-w-lg mx-auto" />

        {/* ===== GitHub Stats ===== */}
        <Section id="stats" title="Actividad en GitHub">
          <GitHubStats />
        </Section>

        <div className="gradient-line max-w-lg mx-auto" />

        {/* ===== Estado Actual ===== */}
        <Section id="status" title="Estado Actual">
          <CurrentStatus />
        </Section>

        <div className="gradient-line max-w-lg mx-auto" />

        {/* ===== Contacto ===== */}
        <Section id="contact" title="Conectemos">
          <Contact />
        </Section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="py-10 text-center border-t border-dark-border">
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-3">
          <a
            href="/CV-Julio-Cesar.pdf"
            download
            className="flex items-center gap-2 px-2 py-2 text-xs text-gray-300 hover:text-cyan-accent transition-colors font-mono"
          >
            <FaDownload className="text-[10px]" aria-hidden="true" />
            Descargar CV
          </a>
          <span className="text-gray-500" aria-hidden="true">·</span>
          <a
            href="https://github.com/jc-morales-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-2 text-xs text-gray-300 hover:text-cyan-accent transition-colors font-mono"
          >
            @jc-morales-dev
          </a>
          <span className="text-gray-500" aria-hidden="true">·</span>
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-2 py-2 text-xs text-gray-300 hover:text-cyan-accent transition-colors font-mono"
          >
            <FaBriefcase className="text-[10px]" aria-hidden="true" />
            Disponible
          </a>
        </div>
        <p className="text-gray-400 text-xs font-mono">
          © {new Date().getFullYear()} Julio Cesar Morales · Hecho con React + TypeScript + ☕
        </p>
      </footer>
    </div>
  )
}
