import { useState, useEffect } from 'react';

// Línea decorativa del hero. El título de verdad es el <h1>, que no se anima:
// esto es solo adorno, por eso va oculto a lectores de pantalla.
const phrases = [
  'demos web y APIs',
  'React · TypeScript · Node',
  'IA en demos e integraciones',
  'disponible para trabajar',
];

// El ancho se reserva con la frase más larga (en ch, que en monoespaciada es
// exacto): así el texto no empuja el layout mientras se escribe. Cada salto
// contaba como layout shift, y eran infinitos mientras la pestaña estuviera abierta.
const maxChars = Math.max(...phrases.map(p => p.length)) + 1;

export default function TypingEffect() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(media.matches);
    const listener = () => setPrefersReducedMotion(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setText(phrases[phraseIndex]);
      const timeout = setTimeout(() => {
        setPhraseIndex((phraseIndex + 1) % phrases.length);
      }, 4000);
      return () => clearTimeout(timeout);
    }

    const current = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex <= current.length) {
      setText(current.slice(0, charIndex));
      timeout = setTimeout(() => setCharIndex(charIndex + 1), 55);
    } else if (!isDeleting && charIndex > current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && charIndex > 0) {
      setText(current.slice(0, charIndex - 1));
      timeout = setTimeout(() => setCharIndex(charIndex - 1), 25);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((phraseIndex + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, prefersReducedMotion]);

  return (
    <div
      className="flex justify-center mb-6 font-mono text-xs sm:text-sm text-gray-400"
      aria-hidden="true"
    >
      <div className="inline-flex items-baseline gap-2 max-w-full px-4">
        <span className="text-cyan-accent shrink-0">~$</span>
        <span
          className="text-left whitespace-nowrap overflow-hidden"
          style={{ minWidth: `${maxChars}ch`, maxWidth: '100%' }}
        >
          {text}
          {!prefersReducedMotion && <span className="cursor-blink text-cyan-accent">▌</span>}
        </span>
      </div>
    </div>
  );
}
