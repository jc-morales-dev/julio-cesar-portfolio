import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaCheckCircle,
  FaEnvelope,
  FaExclamationTriangle,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
} from 'react-icons/fa'

const DEFAULT_FORMSPREE_URL = 'https://formspree.io/f/mvzbnkwk'
const configuredFormspreeUrl = import.meta.env.VITE_FORMSPREE_URL
const FORMSPREE_URL =
  configuredFormspreeUrl &&
  /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9_-]+$/.test(configuredFormspreeUrl) &&
  !configuredFormspreeUrl.includes('TU_ID_AQUI')
    ? configuredFormspreeUrl
    : DEFAULT_FORMSPREE_URL

const subjectOptions = [
  { value: 'Proyecto Freelance', label: 'Proyecto freelance' },
  { value: 'Colaboración', label: 'Colaboración' },
  { value: 'Oportunidad Laboral', label: 'Oportunidad laboral' },
  { value: 'Consulta sobre IA', label: 'Consulta sobre IA' },
  { value: 'Otro', label: 'Otro' },
] as const

const socialLinks = [
  {
    icon: FaEnvelope,
    label: 'Gmail',
    href: 'mailto:juliocesarmoralesalvarado9@gmail.com',
    description: 'juliocesarmoralesalvarado9@gmail.com',
    color: 'hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-300',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/julio-cesar-406314373/',
    description: 'Julio Cesar',
    color: 'hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-300',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    href: 'https://github.com/jc-morales-dev',
    description: '@jc-morales-dev',
    color: 'hover:bg-gray-500/10 hover:border-gray-400/50 hover:text-white',
  },
]

type FormState = 'idle' | 'loading' | 'success' | 'error'
type FieldName = 'name' | 'email' | 'subject' | 'message'
type FormErrors = Partial<Record<FieldName, string>>

interface ContactData {
  name: string
  email: string
  subject: string
  message: string
  website: string
}

const emptyForm: ContactData = { name: '', email: '', subject: '', message: '', website: '' }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(data: ContactData): FormErrors {
  const errors: FormErrors = {}
  const name = data.name.trim()
  const email = data.email.trim()
  const message = data.message.trim()

  if (name.length < 2 || name.length > 80) {
    errors.name = 'Escribe un nombre de entre 2 y 80 caracteres.'
  }
  if (email.length > 120 || !emailPattern.test(email)) {
    errors.email = 'Escribe un email válido de hasta 120 caracteres.'
  }
  if (!subjectOptions.some(option => option.value === data.subject)) {
    errors.subject = 'Selecciona el motivo de tu mensaje.'
  }
  if (message.length < 10 || message.length > 2000) {
    errors.message = 'Escribe un mensaje de entre 10 y 2000 caracteres.'
  }

  return errors
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1.5 text-xs font-medium text-red-300" role="alert">
      {message}
    </p>
  )
}

export default function Contact() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData] = useState<ContactData>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [globalError, setGlobalError] = useState('')
  const successRef = useRef<HTMLDivElement>(null)
  const lastAttemptRef = useRef(0)

  useEffect(() => {
    if (formState === 'success') successRef.current?.focus()
  }, [formState])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData(previous => ({ ...previous, [name]: value }))

    if (name === 'name' || name === 'email' || name === 'subject' || name === 'message') {
      setErrors(previous => ({ ...previous, [name]: undefined }))
    }
    if (formState === 'error') setFormState('idle')
    if (globalError) setGlobalError('')
  }

  const focusFirstError = (fieldErrors: FormErrors) => {
    const first = (Object.keys(fieldErrors) as FieldName[])[0]
    if (first) requestAnimationFrame(() => document.getElementById(first)?.focus())
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (formState === 'loading') return

    // Campo trampa: un usuario no puede verlo ni enfocarlo, los bots suelen completarlo.
    if (formData.website) {
      setFormState('success')
      setFormData(emptyForm)
      return
    }

    const fieldErrors = validate(formData)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      setGlobalError('Revisa los campos marcados antes de enviar.')
      focusFirstError(fieldErrors)
      return
    }

    const now = Date.now()
    if (now - lastAttemptRef.current < 15_000) {
      setFormState('error')
      setGlobalError('Espera unos segundos antes de volver a enviar el formulario.')
      return
    }

    setFormState('loading')
    setGlobalError('')

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject,
      message: formData.message.trim(),
      _gotcha: formData.website,
    }

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 12_000)

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })

      if (!response.ok) throw new Error('Form submission failed')

      lastAttemptRef.current = Date.now()
      setFormState('success')
      setFormData(emptyForm)
      setErrors({})
    } catch {
      setFormState('error')
      setGlobalError('No se pudo enviar el mensaje. Puedes escribirme directamente por email.')
    } finally {
      window.clearTimeout(timeout)
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-2 text-lg font-semibold text-white">¿Hablamos?</h3>
            <p className="text-sm leading-relaxed text-gray-300">
              Estoy disponible para proyectos freelance, oportunidades remotas y colaboraciones en
              productos web o integraciones de IA.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="available-badge inline-flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-4 py-2"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="font-mono text-sm text-green-300">Disponible para trabajar</span>
          </motion.div>

          <div className="space-y-3">
            {socialLinks.map((link, index) => {
              const external = link.href.startsWith('http')
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  aria-label={`Contactar por ${link.label}: ${link.description}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 + 0.2 }}
                  whileHover={{ x: 4 }}
                  className={`flex min-h-14 items-center gap-3 rounded-xl border border-dark-border bg-dark-card px-4 py-3 text-gray-200 transition-all duration-200 ${link.color}`}
                >
                  <link.icon className="shrink-0 text-lg" aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold leading-tight">{link.label}</div>
                    <div className="truncate font-mono text-xs text-gray-300">{link.description}</div>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3"
        >
          <div className="glow-border rounded-2xl border border-dark-border bg-dark-card p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2 border-b border-dark-border pb-4" aria-hidden="true">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-2 font-mono text-xs text-gray-300">contact.tsx</span>
            </div>

            {formState === 'success' ? (
              <motion.div
                ref={successRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <FaCheckCircle className="mb-4 text-4xl text-green-400" aria-hidden="true" />
                <h4 className="mb-2 text-lg font-semibold text-white">¡Mensaje enviado!</h4>
                <p className="max-w-sm text-sm text-gray-300">
                  Recibí tu consulta. Gracias por contarme sobre tu proyecto.
                </p>
                <button
                  type="button"
                  onClick={() => setFormState('idle')}
                  className="mt-6 min-h-11 rounded-lg border border-cyan-accent/50 px-4 py-2 text-sm font-semibold text-cyan-accent transition-all hover:bg-cyan-accent/10"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                aria-label="Formulario de contacto"
                aria-busy={formState === 'loading'}
                noValidate
              >
                <div className="honeypot-field" aria-hidden="true">
                  <label htmlFor="website">Deja este campo vacío</label>
                  <input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block font-mono text-xs font-medium text-gray-200">
                      Nombre *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      minLength={2}
                      maxLength={80}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      className="form-input"
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    <FieldError id="name-error" message={errors.name} />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block font-mono text-xs font-medium text-gray-200">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      maxLength={120}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className="form-input"
                      autoComplete="email"
                      inputMode="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    <FieldError id="email-error" message={errors.email} />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-1.5 block font-mono text-xs font-medium text-gray-200">
                    Asunto *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  >
                    <option value="" disabled>Selecciona un asunto...</option>
                    {subjectOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <FieldError id="subject-error" message={errors.subject} />
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block font-mono text-xs font-medium text-gray-200">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={2000}
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Cuéntame sobre tu proyecto o idea..."
                    className="form-input resize-y"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : 'message-help'}
                  />
                  <div className="mt-1.5 flex items-start justify-between gap-3">
                    <span id="message-help" className="text-xs text-gray-400">Mínimo 10 caracteres.</span>
                    <span className="font-mono text-xs text-gray-300" aria-label={`${formData.message.length} de 2000 caracteres`}>
                      {formData.message.length}/2000
                    </span>
                  </div>
                  <FieldError id="message-error" message={errors.message} />
                </div>

                <p className="text-xs leading-relaxed text-gray-400">
                  El envío se procesa mediante Formspree. No incluyas contraseñas, claves API ni
                  otra información sensible.
                </p>

                {globalError && (
                  <div
                    className="flex items-start gap-2 rounded-lg border border-red-500/35 bg-red-500/10 px-3 py-2 text-sm text-red-200"
                    role="alert"
                    aria-live="assertive"
                  >
                    <FaExclamationTriangle className="mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      {globalError}{' '}
                      {formState === 'error' && globalError.includes('email') && (
                        <a href="mailto:juliocesarmoralesalvarado9@gmail.com" className="font-semibold underline underline-offset-2">
                          Abrir email
                        </a>
                      )}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-cyan-accent px-6 py-3 text-sm font-bold text-black transition-all hover:bg-[#00e5ff] hover:shadow-lg hover:shadow-cyan-accent/20 disabled:cursor-wait disabled:opacity-70"
                >
                  {formState === 'loading' ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" aria-hidden="true" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-xs" aria-hidden="true" />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
