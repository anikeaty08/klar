import { useEffect, useState } from 'react'
import { goTo } from './motion'

/*
 * Tiny client-side router for the two pages: home and /contact, each optionally
 * prefixed with /de. Vercel rewrites every path to index.html (see vercel.json).
 */

export const langFromPath = (path = window.location.pathname) => (/^\/de(\/|$)/.test(path) ? 'de' : null)
const stripLang = (path) => path.replace(/^\/de(?=\/|$)/, '') || '/'
export const pageFromPath = (path = window.location.pathname) => (stripLang(path).replace(/\/+$/, '') === '/contact' ? 'contact' : 'home')

/** Path for a page in a language: pathFor('contact', 'de') → '/de/contact'. */
export const pathFor = (page, lang) => `${lang === 'de' ? '/de' : ''}${page === 'contact' ? '/contact' : '/'}`.replace(/^\/de\/$/, '/de')

export function navigate(to, { replace = false } = {}) {
  history[replace ? 'replaceState' : 'pushState'](null, '', to)
  window.dispatchEvent(new Event('routechange'))
}

export function usePage() {
  const [page, setPage] = useState(() => pageFromPath())
  useEffect(() => {
    const update = () => setPage(pageFromPath())
    window.addEventListener('popstate', update)
    window.addEventListener('routechange', update)
    return () => {
      window.removeEventListener('popstate', update)
      window.removeEventListener('routechange', update)
    }
  }, [])
  return page
}

/** Content links are written language-neutral ('#services', '/contact'); this localises them. */
export function localHref(href, lang) {
  if (href.startsWith('#')) return `${pathFor('home', lang)}${href}`
  if (href === '/contact') return pathFor('contact', lang)
  return href
}

/**
 * Follow an internal link without a page reload: same page → smooth-scroll to
 * the anchor (or the top); other page → switch page, and App scrolls to the anchor.
 */
export function followLink(href) {
  const url = new URL(href, window.location.href)
  const samePage = pageFromPath(url.pathname) === pageFromPath() && langFromPath(url.pathname) === langFromPath()
  if (samePage) goTo(url.hash || '#top')
  else navigate(url.pathname + url.hash)
}
