/**
 * Genera public/github-stats.json con las estadísticas de GitHub.
 *
 * Antes esto lo hacía el navegador de cada visitante: 2 peticiones + 2 por cada
 * repo propio (14 en total). La API sin token permite 60 por hora y por IP, así
 * que a partir del cuarto visitante desde la misma red la sección se rompía sola.
 *
 * Ahora se resuelve una vez en el deploy y el navegador descarga un JSON.
 *
 *   node scripts/fetch-github-stats.mjs
 *
 * Con GITHUB_TOKEN en el entorno el límite sube a 5000/h (en Actions viene dado).
 */

import { writeFile, mkdir } from 'node:fs/promises'

const USERNAME = 'jc-morales-dev'
const OUTPUT = 'public/github-stats.json'

const langColors = {
  JavaScript: '#00C9FF',
  TypeScript: '#0099cc',
  HTML: '#00e5ff',
  CSS: '#0077aa',
  Python: '#005577',
  Java: '#00aadd',
  Shell: '#00b8e6',
  'C++': '#008fbf',
  Go: '#00ddff',
  Dart: '#004466',
  Kotlin: '#007799',
  Ruby: '#009dcc',
  PHP: '#00bbee',
  SCSS: '#006688',
  Swift: '#008CAA',
  Astro: '#00B4D8',
  C: '#0088aa',
}

function colorFor(name, i) {
  return langColors[name] || `hsl(${185 + ((i * 17) % 45)}, 90%, ${55 - ((i * 6) % 25)}%)`
}

async function get(url) {
  const headers = { Accept: 'application/vnd.github.v3+json', 'User-Agent': 'portfolio-stats' }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`)
  return res.json()
}

async function main() {
  const [user, allRepos] = await Promise.all([
    get(`https://api.github.com/users/${USERNAME}`),
    get(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`),
  ])

  const ownRepos = allRepos.filter(r => !r.fork)
  const stars = allRepos.reduce((s, r) => s + (r.stargazers_count || 0), 0)
  const forks = allRepos.reduce((s, r) => s + (r.forks_count || 0), 0)

  const repoData = await Promise.all(
    ownRepos.map(async r => {
      const [langs, contributors] = await Promise.all([
        get(`https://api.github.com/repos/${USERNAME}/${r.name}/languages`).catch(() => ({})),
        get(`https://api.github.com/repos/${USERNAME}/${r.name}/contributors?per_page=100`).catch(() => []),
      ])
      const me = Array.isArray(contributors)
        ? contributors.find(c => c.login?.toLowerCase() === USERNAME.toLowerCase())
        : null
      return { langs, commits: me?.contributions || 0 }
    })
  )

  const langBytes = {}
  let totalCommits = 0
  for (const { langs, commits } of repoData) {
    totalCommits += commits
    for (const [lang, bytes] of Object.entries(langs)) {
      langBytes[lang] = (langBytes[lang] || 0) + bytes
    }
  }

  const totalBytes = Object.values(langBytes).reduce((a, b) => a + b, 0)
  const languages = Object.entries(langBytes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, bytes], i) => ({
      name,
      bytes,
      percent: totalBytes > 0 ? Math.round((bytes / totalBytes) * 1000) / 10 : 0,
      color: colorFor(name, i),
    }))

  const stats = {
    repos: allRepos.length,
    ownRepos: ownRepos.length,
    stars,
    forks,
    commits: totalCommits,
    followers: user.followers || 0,
    languages,
    profileUrl: user.html_url,
    updatedAt: Date.now(),
  }

  await mkdir('public', { recursive: true })
  await writeFile(OUTPUT, JSON.stringify(stats, null, 2) + '\n', 'utf8')

  console.log(`${OUTPUT} generado`)
  console.log(`  ${stats.ownRepos} repos propios · ${stats.commits} commits · ${languages.length} lenguajes`)
}

main().catch(err => {
  console.error('Error al generar las stats:', err.message)
  process.exit(1)
})
