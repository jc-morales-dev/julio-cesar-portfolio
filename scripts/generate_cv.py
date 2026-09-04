"""
Genera el CV en PDF.

Diseño a dos columnas: barra lateral oscura con foto, contacto y habilidades;
columna principal en blanco con perfil, proyectos y formación.

La foto se detecta sola: pon un retrato cuadrado en cualquiera de las rutas de
PHOTO_CANDIDATES y se usa. Si no hay ninguna, dibuja las iniciales y el CV
sigue saliendo bien.

    python scripts/generate_cv.py
"""

import os

from reportlab.lib import colors
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    FrameBreak,
    KeepTogether,
    NextPageTemplate,
    PageTemplate,
    Paragraph,
    Spacer,
)

OUTPUT = "public/CV-Julio-Cesar.pdf"

PHOTO_CANDIDATES = [
    "assets/foto.jpg",
    "assets/foto.png",
    "public/foto.jpg",
    "public/foto.png",
    "public/projects/foto.jpg",
]

NAME = "Julio Cesar Morales Alvarado"
TITLE = "Desarrollador web · React · TypeScript · Integración de APIs de IA"
EMAIL = "juliocesarmoralesalvarado9@gmail.com"
GITHUB = "https://github.com/jc-morales-dev"
GITHUB_LABEL = "github.com/jc-morales-dev"
LINKEDIN = "https://www.linkedin.com/in/julio-cesar-406314373/"
LINKEDIN_LABEL = "linkedin.com/in/julio-cesar"
SITE = "https://julio-cesar-portfolio.vercel.app"
SITE_LABEL = "julio-cesar-portfolio.vercel.app"
LOCATION = "Montevideo, Uruguay (UTC-3)"
AVAILABILITY = "Disponible · remoto"

SUMMARY = (
    "Desarrollador web con React y TypeScript. Construyo aplicaciones completas por mi cuenta, "
    "de la primera línea al despliegue, y publico el código para que se pueda revisar: un agente que "
    "ejecuta código en un sandbox y un cliente de chat multiproveedor. Cuando el proyecto lo pide, "
    "integro APIs de modelos de lenguaje dentro del producto."
)

SKILLS = {
    "Frontend": ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Vite", "Next.js"],
    "Backend": ["Node.js", "Hono", "REST APIs", "Sesiones y roles", "Supabase"],
    "IA": ["Gemini API", "OpenAI API", "OpenRouter", "Sandbox E2B"],
    "Herramientas": ["Git", "GitHub", "Vercel", "Despliegue continuo"],
}

LANGUAGES = [("Español", "Nativo"), ("Inglés", "Técnico")]

# Tres datos concretos para leer de un vistazo. Solo cosas comprobables:
# si alguien abre el GitHub, cuadra.
HIGHLIGHTS = [
    ("2", "productos propios\nconstruidos enteros"),
    ("4", "años\nprogramando"),
    ("6", "repos públicos\nen GitHub"),
]

PROJECTS = [
    {
        "role": "NEXUS – Agente que ejecuta el código que escribe",
        "org": "Proyecto propio",
        "period": "2026 – Presente",
        "bullets": [
            "Loop de agente contra un sandbox de E2B: planifica, ejecuta y devuelve los archivos generados.",
            "Orquestación entre varios modelos a través de OpenRouter.",
            "Interfaz que muestra el plan y el razonamiento paso a paso.",
        ],
        "tech": "Next.js, TypeScript, E2B Sandbox, OpenRouter",
        "links": [
            ("Demo", "https://nexus-exec.vercel.app/"),
            ("Repo", "https://github.com/jc-morales-dev/NEXUS"),
        ],
    },
    {
        "role": "Chatbot Vortex – Cliente multiproveedor de IA",
        "org": "Proyecto propio, demo pública",
        "period": "Sep 2024 – Presente",
        "bullets": [
            "PDFs, imágenes y texto en una sola interfaz, con conversación multi-turno.",
            "Manejo del contexto entre turnos: cuánto historial enviar y qué recortar al alargarse.",
            "Modo local y BYOK; despliegue continuo desde GitHub.",
        ],
        "tech": "React, TypeScript, Gemini API, OpenAI API, PDF.js, Vercel",
        "links": [
            ("Demo", "https://chatbot-vortex.vercel.app/"),
            ("Repo", "https://github.com/jc-morales-dev/Chatbot-Vortex"),
        ],
    },
]

EDUCATION = [
    {
        "title": "CS50x – Introduction to Computer Science",
        "org": "Harvard University (en curso)",
        "period": "En curso",
        "desc": "Problem sets entregados hasta Tideman: punteros, memoria y complejidad en C.",
    },
    {
        "title": "React, TypeScript e integración de APIs de IA",
        "org": "Formación autodidacta, documentación oficial",
        "period": "desde 2022",
        "desc": "Aprendido construyendo: estado y hooks en React, tipado en TypeScript y conexión real de las APIs de Gemini y OpenAI.",
    },
    {
        "title": "Bachillerato completo",
        "org": "Uruguay",
        "period": "2024",
        "desc": "Formación secundaria terminada.",
    },
]

# ---------------------------------------------------------------- paleta
INK = colors.HexColor("#12222B")        # texto principal
MUTED = colors.HexColor("#5B6B73")      # fechas y notas
ACCENT = colors.HexColor("#0E7C92")     # titulares en la columna blanca
SIDEBAR_BG = colors.HexColor("#12222B")
SIDEBAR_TEXT = colors.HexColor("#D7E3E7")
SIDEBAR_MUTED = colors.HexColor("#8FA6AE")
SIDEBAR_ACCENT = colors.HexColor("#3FC7E0")  # cian claro: legible sobre oscuro
RULE = colors.HexColor("#D7E3E7")

# ---------------------------------------------------------------- métricas
PAGE_W, PAGE_H = LETTER
SIDEBAR_W = 2.35 * inch
SIDE_PAD = 0.28 * inch
MAIN_PAD_L = 0.42 * inch
MAIN_PAD_R = 0.55 * inch
TOP_PAD = 0.55 * inch
BOTTOM_PAD = 0.5 * inch
PHOTO_R = 0.62 * inch

styles = getSampleStyleSheet()

# Columna principal
styles.add(ParagraphStyle("H1", fontName="Helvetica-Bold", fontSize=22, leading=25,
                          spaceAfter=1, textColor=INK))
styles.add(ParagraphStyle("Role", fontName="Helvetica", fontSize=10.2, leading=13.5,
                          textColor=ACCENT))
styles.add(ParagraphStyle("H2", fontName="Helvetica-Bold", fontSize=10.5, leading=12.5,
                          spaceBefore=13, spaceAfter=6, textColor=ACCENT))
styles.add(ParagraphStyle("Body", fontSize=9.6, leading=13.2, textColor=INK))
styles.add(ParagraphStyle("Summary", fontSize=9.6, leading=13.4, textColor=INK,
                          alignment=TA_JUSTIFY))
styles.add(ParagraphStyle("Item", fontName="Helvetica-Bold", fontSize=10, leading=13,
                          spaceBefore=8, textColor=INK))
styles.add(ParagraphStyle("Meta", fontSize=8.4, leading=11, textColor=MUTED))
styles.add(ParagraphStyle("Contact", fontSize=9, leading=12, textColor=INK))
styles.add(ParagraphStyle("Dot", fontSize=9.4, leading=12.6, textColor=INK,
                          leftIndent=11, bulletIndent=2, spaceBefore=1.5))
styles.add(ParagraphStyle("Tech", fontSize=8.3, leading=11, textColor=ACCENT,
                          spaceBefore=2.5))

# Barra lateral
styles.add(ParagraphStyle("SideH", fontName="Helvetica-Bold", fontSize=8.6, leading=11,
                          textColor=SIDEBAR_ACCENT, spaceBefore=13, spaceAfter=5))
styles.add(ParagraphStyle("SideBody", fontSize=8.5, leading=11.6, textColor=SIDEBAR_TEXT))
styles.add(ParagraphStyle("SideMuted", fontSize=8, leading=10.8, textColor=SIDEBAR_MUTED))
styles.add(ParagraphStyle("SideSkill", fontName="Helvetica-Bold", fontSize=8.3, leading=11,
                          textColor=SIDEBAR_TEXT, spaceBefore=5))


def find_photo():
    for path in PHOTO_CANDIDATES:
        if os.path.exists(path):
            return path
    return None


class ChipRow(Flowable):
    """Etiquetas en recuadros redondeados, con salto de línea automático.

    Una lista separada por puntos es un muro de texto; en chips se lee de un
    vistazo y le da aire a la columna.
    """

    def __init__(self, items, width, fg, border, bg=None, size=7.6,
                 pad_x=5, pad_y=3.2, gap=3.5):
        Flowable.__init__(self)
        self.items = items
        self.avail = width
        self.fg, self.border, self.bg = fg, border, bg
        self.size, self.pad_x, self.pad_y, self.gap = size, pad_x, pad_y, gap
        self.rows = []

    def _layout(self):
        if self.rows:
            return
        fila, ancho_fila = [], 0.0
        for it in self.items:
            w = stringWidth(it, "Helvetica", self.size) + self.pad_x * 2
            if fila and ancho_fila + w + self.gap > self.avail:
                self.rows.append(fila)
                fila, ancho_fila = [], 0.0
            fila.append((it, w))
            ancho_fila += w + self.gap
        if fila:
            self.rows.append(fila)

    def wrap(self, availWidth, availHeight):
        self.avail = availWidth
        self.rows = []
        self._layout()
        alto_chip = self.size + self.pad_y * 2
        self.height = len(self.rows) * (alto_chip + self.gap) - self.gap
        return availWidth, self.height

    def draw(self):
        c = self.canv
        alto = self.size + self.pad_y * 2
        y = self.height - alto
        for fila in self.rows:
            x = 0
            for texto, w in fila:
                if self.bg:
                    c.setFillColor(self.bg)
                c.setStrokeColor(self.border)
                c.setLineWidth(0.6)
                c.roundRect(x, y, w, alto, 3, stroke=1, fill=1 if self.bg else 0)
                c.setFillColor(self.fg)
                c.setFont("Helvetica", self.size)
                c.drawString(x + self.pad_x, y + self.pad_y + 0.6, texto)
                x += w + self.gap
            y -= alto + self.gap


class IconLink(Flowable):
    """Enlace con un badge cuadrado delante. Los enlaces sueltos quedaban
    desnudos; el badge les da peso visual y separa cada uno del siguiente."""

    HEIGHT = 15.5

    def __init__(self, glifo, texto, url, width, accent, fg, size=8.4):
        Flowable.__init__(self)
        self.glifo, self.texto, self.url = glifo, texto, url
        self.avail = width
        self.accent, self.fg, self.size = accent, fg, size

    def wrap(self, availWidth, availHeight):
        self.avail = availWidth
        return availWidth, self.HEIGHT

    def draw(self):
        c = self.canv
        lado = 12.5
        y = (self.HEIGHT - lado) / 2

        c.setFillColor(colors.Color(self.accent.red, self.accent.green,
                                    self.accent.blue, alpha=0.14))
        c.setStrokeColor(colors.Color(self.accent.red, self.accent.green,
                                      self.accent.blue, alpha=0.5))
        c.setLineWidth(0.7)
        c.roundRect(0, y, lado, lado, 3, stroke=1, fill=1)

        c.setFillColor(self.accent)
        gs = 7.2 if len(self.glifo) > 1 else 8
        c.setFont("Helvetica-Bold", gs)
        c.drawCentredString(lado / 2, y + (lado - gs) / 2 + 1.2, self.glifo)

        tx = lado + 6
        texto = self.texto
        while stringWidth(texto, "Helvetica", self.size) > self.avail - tx and len(texto) > 8:
            texto = texto[:-2]
        if texto != self.texto:
            texto = texto[:-1] + "…"

        c.setFillColor(self.fg)
        c.setFont("Helvetica", self.size)
        c.drawString(tx, y + 3.4, texto)

        ancho_texto = stringWidth(texto, "Helvetica", self.size)
        c.linkURL(self.url, (0, y, tx + ancho_texto, y + lado), relative=1, thickness=0)


class Highlights(Flowable):
    """Tres datos en grande. Rompe el bloque de texto del perfil y da
    algo concreto que mirar en los primeros segundos."""

    HEIGHT = 42

    def __init__(self, datos, width, accent, ink, muted):
        Flowable.__init__(self)
        self.datos = datos
        self.avail = width
        self.accent, self.ink, self.muted = accent, ink, muted

    def wrap(self, availWidth, availHeight):
        self.avail = availWidth
        return availWidth, self.HEIGHT

    def draw(self):
        c = self.canv
        col = self.avail / len(self.datos)
        for i, (cifra, etiqueta) in enumerate(self.datos):
            x = i * col
            if i:
                c.setStrokeColor(colors.HexColor("#DCE6EA"))
                c.setLineWidth(0.7)
                c.line(x - 6, 6, x - 6, self.HEIGHT - 6)
            c.setFillColor(self.accent)
            c.setFont("Helvetica-Bold", 17)
            c.drawString(x, self.HEIGHT - 20, cifra)
            c.setFillColor(self.muted)
            c.setFont("Helvetica", 7.6)
            for j, linea in enumerate(etiqueta.split("\n")):
                c.drawString(x, self.HEIGHT - 32 - j * 9, linea)


def draw_page(canvas, doc):
    """Fondo de la barra lateral, foto y detalle de color. Se pinta en cada página."""
    canvas.saveState()

    # Barra lateral a toda altura
    canvas.setFillColor(SIDEBAR_BG)
    canvas.rect(0, 0, SIDEBAR_W, PAGE_H, stroke=0, fill=1)

    # Filo cian que separa las dos columnas
    canvas.setFillColor(SIDEBAR_ACCENT)
    canvas.rect(SIDEBAR_W - 2.2, 0, 2.2, PAGE_H, stroke=0, fill=1)

    if doc.page == 1:
        cx = SIDEBAR_W / 2
        cy = PAGE_H - TOP_PAD - PHOTO_R
        photo = find_photo()

        # Aro exterior
        canvas.setStrokeColor(SIDEBAR_ACCENT)
        canvas.setLineWidth(1.6)
        canvas.circle(cx, cy, PHOTO_R + 3.5, stroke=1, fill=0)

        if photo:
            canvas.saveState()
            path = canvas.beginPath()
            path.circle(cx, cy, PHOTO_R)
            canvas.clipPath(path, stroke=0, fill=0)
            canvas.drawImage(
                photo,
                cx - PHOTO_R, cy - PHOTO_R,
                width=PHOTO_R * 2, height=PHOTO_R * 2,
                preserveAspectRatio=True, anchor="c", mask="auto",
            )
            canvas.restoreState()
        else:
            # Sin foto: iniciales dentro del círculo
            canvas.setFillColor(colors.HexColor("#1B3540"))
            canvas.circle(cx, cy, PHOTO_R, stroke=0, fill=1)
            canvas.setFillColor(SIDEBAR_ACCENT)
            canvas.setFont("Helvetica-Bold", 26)
            canvas.drawCentredString(cx, cy - 9, "JC")

    # Pie: solo en la columna blanca, discreto
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawRightString(PAGE_W - MAIN_PAD_R, 0.32 * inch, SITE_LABEL)

    canvas.restoreState()


def side_rule():
    """Regla fina para separar bloques dentro de la barra lateral."""
    return Paragraph(
        '<para spaceb="6"><font color="#2C4450">'
        + "_" * 34
        + "</font></para>",
        styles["SideMuted"],
    )


def section(title):
    """Titular de sección con un cuadrado de acento delante."""
    return Paragraph(f'<font color="#3FC7E0">■</font>  {title.upper()}', styles["H2"])


def fit_link(label, url, style, max_width):
    """Acorta la etiqueta si no cabe: mejor recortada que desbordada."""
    font, size = style.fontName, style.fontSize
    text = label
    while stringWidth(text, font, size) > max_width and len(text) > 8:
        text = text[:-2]
    if text != label:
        text = text[:-1] + "…"
    return f'<a href="{url}" color="#3FC7E0">{text}</a>'


def build():
    doc = BaseDocTemplate(
        OUTPUT,
        pagesize=LETTER,
        title=f"CV - {NAME}",
        author=NAME,
        subject="Curriculum Vitae",
        leftMargin=0, rightMargin=0, topMargin=0, bottomMargin=0,
    )

    side_frame = Frame(
        SIDE_PAD,
        BOTTOM_PAD,
        SIDEBAR_W - SIDE_PAD * 2,
        PAGE_H - TOP_PAD - BOTTOM_PAD - PHOTO_R * 2 - 0.3 * inch,
        id="side", showBoundary=0,
        leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
    )
    main_frame = Frame(
        SIDEBAR_W + MAIN_PAD_L,
        BOTTOM_PAD,
        PAGE_W - SIDEBAR_W - MAIN_PAD_L - MAIN_PAD_R,
        PAGE_H - TOP_PAD - BOTTOM_PAD,
        id="main", showBoundary=0,
        leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
    )
    # Páginas siguientes: solo columna principal, la lateral queda decorativa
    cont_frame = Frame(
        SIDEBAR_W + MAIN_PAD_L,
        BOTTOM_PAD,
        PAGE_W - SIDEBAR_W - MAIN_PAD_L - MAIN_PAD_R,
        PAGE_H - TOP_PAD - BOTTOM_PAD,
        id="cont", showBoundary=0,
        leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
    )

    doc.addPageTemplates([
        PageTemplate(id="first", frames=[side_frame, main_frame], onPage=draw_page),
        PageTemplate(id="rest", frames=[cont_frame], onPage=draw_page),
    ])

    side_w = SIDEBAR_W - SIDE_PAD * 2
    main_w = PAGE_W - SIDEBAR_W - MAIN_PAD_L - MAIN_PAD_R
    story = []

    # ============================ BARRA LATERAL ============================
    # El email no va aquí: es demasiado largo para la columna y se cortaba.
    # Un email recortado en un CV no sirve de nada, así que va en la cabecera.
    story.append(Paragraph("ENLACES", styles["SideH"]))
    for glifo, etiqueta, url in [
        ("GH", GITHUB_LABEL, GITHUB),
        ("in", LINKEDIN_LABEL, LINKEDIN),
        # Helvetica base no trae flechas: un glifo que no existe sale como
        # cuadrado. Solo letras aquí.
        ("W", "Ver portfolio online", SITE),
    ]:
        story.append(IconLink(glifo, etiqueta, url, side_w, SIDEBAR_ACCENT, SIDEBAR_TEXT))

    story.append(side_rule())
    story.append(Paragraph("DISPONIBILIDAD", styles["SideH"]))
    story.append(Paragraph(AVAILABILITY, styles["SideBody"]))
    story.append(Spacer(1, 4))
    story.append(ChipRow(["Freelance", "Full-time"], side_w,
                         SIDEBAR_TEXT, colors.HexColor("#3D5A66")))

    story.append(side_rule())
    story.append(Paragraph("HABILIDADES", styles["SideH"]))
    for group, items in SKILLS.items():
        story.append(Paragraph(group, styles["SideSkill"]))
        story.append(Spacer(1, 3))
        story.append(ChipRow(items, side_w, SIDEBAR_TEXT, colors.HexColor("#33505C")))
        story.append(Spacer(1, 3))

    story.append(side_rule())
    story.append(Paragraph("IDIOMAS", styles["SideH"]))
    for lang, level in LANGUAGES:
        story.append(Paragraph(
            f'{lang} <font color="#8FA6AE">— {level}</font>', styles["SideBody"]))

    story.append(FrameBreak())

    # ========================= COLUMNA PRINCIPAL =========================
    story.append(Paragraph(NAME, styles["H1"]))
    story.append(Paragraph(TITLE, styles["Role"]))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        f'<a href="mailto:{EMAIL}" color="#12222B">{EMAIL}</a>'
        f'<font color="#B7C7CD">  ·  </font>{LOCATION}',
        styles["Contact"]))

    story.append(section("Perfil"))
    story.append(Paragraph(SUMMARY, styles["Summary"]))
    story.append(Spacer(1, 10))
    story.append(Highlights(HIGHLIGHTS, main_w, ACCENT, INK, MUTED))

    story.append(section("Proyectos"))
    for p in PROJECTS:
        links = "  ".join(
            f'<a href="{url}" color="#0E7C92">{label}</a>' for label, url in p["links"]
        )
        block = [
            Paragraph(p["role"], styles["Item"]),
            Paragraph(f'{p["org"]} · {p["period"]} · {links}', styles["Meta"]),
        ]
        block += [
            Paragraph(b, styles["Dot"], bulletText="•") for b in p["bullets"]
        ]
        block.append(Paragraph(p["tech"], styles["Tech"]))
        story.append(KeepTogether(block))

    story.append(NextPageTemplate("rest"))
    story.append(section("Formación"))
    for e in EDUCATION:
        block = [
            Paragraph(e["title"], styles["Item"]),
            Paragraph(f'{e["org"]} · {e["period"]}', styles["Meta"]),
            Paragraph(e["desc"], styles["Body"]),
        ]
        story.append(KeepTogether(block))

    story.append(Spacer(1, 12))
    story.append(Paragraph(
        '<font color="#5B6B73">El código de todo lo anterior está publicado en GitHub.</font>',
        styles["Meta"]))

    doc.build(story)

    photo = find_photo()
    print(f"CV generado en {OUTPUT}")
    print(f"Foto: {photo}" if photo else
          f"Foto: no encontrada — copia un retrato cuadrado a {PHOTO_CANDIDATES[0]}")


if __name__ == "__main__":
    build()
