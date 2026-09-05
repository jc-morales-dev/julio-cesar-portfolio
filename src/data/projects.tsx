import type { ReactNode } from 'react'
import {
  FaBrain,
  FaCarSide,
  FaCode,
  FaFileInvoiceDollar,
  FaMobileAlt,
  FaRobot,
} from 'react-icons/fa'

/**
 * Modelo único para cada proyecto del portafolio.
 * Para agregar otro, crea un objeto en `projects` y coloca su imagen en `public/projects/`.
 */
export interface Project {
  slug: string
  title: string
  summary: string
  problem: string
  built: string
  technical: string
  result: string
  icon: ReactNode
  image: string
  tags: string[]
  github: string
  demo?: string
  /** Texto del botón cuando `demo` no lleva a una demo web (ej. descargar un APK). */
  demoLabel?: string
  /** Link de ejemplo público (ej. cotización compartida) visible en la card. */
  exampleUrl?: string
  /** Texto del botón del link de ejemplo. */
  exampleLabel?: string
  /** Ruta interna al caso de estudio detallado. */
  caseStudyPath?: string
  featured?: boolean
  status: 'live' | 'development' | 'completed' | 'code' | 'release'
}

export const projects: Project[] = [
  {
    slug: 'coti',
    title: 'Coti',
    summary:
      'App de cotizaciones con auth y link público: cargás los ítems, calculás el total y compartís una página que el cliente abre sin crear cuenta.',
    problem:
      'Pasar un presupuesto suele terminar en un PDF adjunto o un mensaje suelto: el cliente no sabe si está vigente y quien lo envía no tiene registro de en qué quedó cada uno.',
    built:
      'Cuentas con registro y recuperación de contraseña, editor de ítems con total en vivo, estados de borrador a cobrada, y una página pública por cotización con los datos de quien la emite.',
    technical:
      'Postgres con Row Level Security: los visitantes anónimos no tienen ninguna política sobre las tablas y entran por una función SECURITY DEFINER que recibe el slug. Una política del tipo "estado distinto de borrador" habría dejado listar los clientes de todos los usuarios, porque RLS filtra filas pero no puede exigir conocer el slug. El guardado de ítems es transaccional y los importes se suman en centavos enteros.',
    result:
      'Demo pública con auth, cuenta de prueba y SMTP propio; link público por cotización (responsive e imprimible) y CI en cada push.',
    icon: <FaFileInvoiceDollar className="text-5xl sm:text-7xl" />,
    image: '/projects/coti.webp',
    tags: ['React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'RLS', 'Tailwind v4'],
    github: 'https://github.com/jc-morales-dev/cotizador',
    demo: 'https://cotizador-opal-five.vercel.app',
    exampleUrl: 'https://cotizador-opal-five.vercel.app/c/Gh4zJFsjA4O2',
    exampleLabel: 'Ver ejemplo público',
    status: 'live',
  },
  {
    slug: 'nexus',
    title: 'NEXUS',
    summary:
      'Workspace multi-modelo con agente en sandbox (derivado de G0DM0D3/AGPL): planifica, ejecuta en E2B y entrega archivos descargables.',
    problem:
      'Los asistentes tradicionales describen cómo resolver una tarea, pero dejan la ejecución y los archivos finales en manos del usuario.',
    built:
      'Basado en G0DM0D3 (AGPL): aporté orquestación E2B, skills y timeline de herramientas en la UI, hardening (telemetry/CORS/BYOK) y la demo pública.',
    technical:
      'Derivado de G0DM0D3; encima: multi-modelo vía OpenRouter, sandbox E2B, captura de artefactos, y controles de telemetría/CORS/BYOK.',
    result:
      'Una demo pública donde el agente puede ejecutar y probar código, procesar archivos y entregar resultados descargables.',
    icon: <FaBrain className="text-5xl sm:text-7xl" />,
    image: '/projects/nexus.webp',
    tags: ['Next.js', 'TypeScript', 'AI Agents', 'E2B Sandbox', 'OpenRouter', 'Tailwind'],
    github: 'https://github.com/jc-morales-dev/NEXUS',
    demo: 'https://nexus-exec.vercel.app/',
    featured: true,
    status: 'live',
  },
  {
    slug: 'novaclaw',
    title: 'NovaClaw',
    summary:
      'Prototipo v0.1 de agente on-device en Android (1 device/tester): Linux embebido, Node.js y terminal real, sin root ni servidor.',
    problem:
      'Las apps de IA para móvil son clientes de chat: mandan el mensaje a un servidor y muestran texto. No pueden leer tus archivos, ejecutar lo que escriben ni comprobar si funciona.',
    built:
      'v0.1 temprano: empaqueté Linux (Termux) + Node en el APK y monté el agente (tools nativas, edits, PTY, conectores del teléfono). Probado por un tester en un solo dispositivo.',
    technical:
      'Ejecuta binarios sin root en Android moderno cargando proot como librería nativa, lo que evita la restricción W^X sin recurrir al truco de targetSdk 28. El servidor del agente escucha solo en loopback con token por instalación.',
    result:
      'APK firmado en un OPPO CPH2557 (Android 15). v0.1 / 1 device · 1 tester — no hay matriz multi-dispositivo validada. Tests unitarios en el repo; shell siempre pide aprobación.',
    icon: <FaMobileAlt className="text-5xl sm:text-7xl" />,
    image: '/projects/novaclaw.webp',
    tags: ['Kotlin', 'TypeScript', 'Android', 'Node.js', 'proot', 'AI Agents'],
    github: 'https://github.com/jc-morales-dev/NovaClaw',
    demo: 'https://github.com/jc-morales-dev/NovaClaw/releases/latest',
    demoLabel: 'Descargar APK',
    status: 'release',
  },
  {
    slug: 'chatbot-vortex',
    title: 'Chatbot Vortex',
    summary:
      'Cliente multimodal para conversar con varios proveedores de IA, analizar archivos y conservar el contexto entre turnos.',
    problem:
      'Probar modelos, adjuntar documentos y conservar conversaciones suele exigir herramientas separadas o una configuración opaca.',
    built:
      'Desarrollé la experiencia de chat, el historial persistente, la búsqueda, la exportación y el análisis de PDFs, imágenes y otros adjuntos.',
    technical:
      'React 19, TypeScript, almacenamiento local y BYOK para conectar Gemini, OpenAI, Groq, DeepSeek u OpenRouter desde una sola interfaz.',
    result:
      'Demo pública con modo offline por defecto, estados de error claros y flujos listos para validar conversaciones y claves propias.',
    icon: <FaRobot className="text-5xl sm:text-7xl" />,
    image: '/projects/vortex.webp',
    tags: ['React 19', 'TypeScript', 'BYOK', 'PDF e imágenes', 'Vite'],
    github: 'https://github.com/jc-morales-dev/Chatbot-Vortex',
    demo: 'https://chatbot-vortex.vercel.app/',
    caseStudyPath: '/case-studies/vortex',
    status: 'live',
  },
  {
    slug: 'editor-code',
    title: 'Editor Code',
    summary:
      'IDE local con edición, terminal, contexto de archivos y un agente de IA que propone cambios revisables.',
    problem:
      'Los flujos de desarrollo asistido pierden contexto cuando editor, terminal, archivos y vista previa viven en superficies distintas.',
    built:
      'Integré explorador de archivos, Monaco Editor, terminal real, diffs multiarchivo y una vista previa que devuelve errores al agente.',
    technical:
      'Electron IPC conecta React con Node.js, node-pty, el sistema de archivos y Chokidar sin convertir la interfaz en un simple chat.',
    result:
      'Prototipo funcional en desarrollo con CI para lint, tipos y tests; el código y la guía de instalación están disponibles.',
    icon: <FaCode className="text-5xl sm:text-7xl" />,
    image: '/projects/zenith.webp',
    tags: ['Electron', 'React', 'TypeScript', 'Monaco', 'Node-PTY'],
    github: 'https://github.com/jc-morales-dev/EDITOR-CODE',
    status: 'development',
  },
  {
    slug: 'escape-driver',
    title: 'Escape Driver',
    summary:
      'Juego arcade de persecución policial con física, dificultad progresiva y una ciudad de neón renderizada en Canvas.',
    problem:
      'Una persecución cenital necesita movimiento legible, colisiones consistentes y rivales que presionen sin limitarse a seguir al jugador.',
    built:
      'Programé el loop de juego, el HUD, los vehículos, los power-ups, la progresión de estrellas y roles coordinados para la policía.',
    technical:
      'Motor Canvas 2D desacoplado de React, mapa procedural y audio de motor y sirenas sintetizado con Web Audio API.',
    result:
      'Juego publicado y controlable con teclado, con tres dificultades, cuatro vehículos y logros persistidos en el navegador.',
    icon: <FaCarSide className="text-5xl sm:text-7xl" />,
    image: '/projects/escape-driver.png',
    tags: ['React 19', 'TypeScript', 'Canvas 2D', 'Web Audio', 'Game AI'],
    github: 'https://github.com/jc-morales-dev/Escape-Driver',
    demo: 'https://escape-driver.vercel.app/',
    status: 'live',
  },
]
