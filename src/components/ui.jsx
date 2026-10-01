import { useEffect, useRef } from 'react'
import { FlipText, useScramble } from './fx'

export function Chevron({ className = 'h-3 w-3' }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className={className}>
      <path d="M4.5 2.5 8 6l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Tribe-style button: the fill swells on hover, letters roll over and a chevron slides in. */
export function Button({ href, children, variant = 'dark', external = false, className = '', ...rest }) {
  const variants = {
    dark: 'text-paper before:bg-ink hover:before:bg-ink-2',
    light: 'text-ink before:bg-paper hover:before:bg-card',
    outline: 'text-current before:border before:border-current/40 hover:before:border-current',
  }
  const Tag = href ? 'a' : 'button'
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <Tag
        href={href}
        {...ext}
        {...rest}
        className={`group caption relative isolate inline-flex items-center justify-center rounded-md px-6 py-2.5 text-[13px] transition-[padding] duration-[450ms] ease-snap hover:pr-[30px] before:absolute before:inset-0 before:-z-10 before:rounded-md before:transition-[inset,background-color,border-color] before:duration-[450ms] before:ease-snap hover:before:-inset-1 active:before:-inset-0.5 ${variants[variant]} ${className}`}
      >
        {typeof children === 'string' ? <FlipText text={children} /> : children}
        <Chevron className="pointer-events-none absolute right-3 h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Tag>
  )
}

/** Uppercase text link that scrambles on hover. */
export function TextLink({ href, children, external = false, className = '' }) {
  const [ref, run] = useScramble(children)
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <a href={href} {...ext} onMouseEnter={run} onFocus={run} className={`caption group inline-flex items-center gap-2 ${className}`}>
      <span ref={ref}>{children}</span>
      <Chevron className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  )
}

export function CircleArrow({ invert = false, className = '' }) {
  const hover = invert ? 'group-hover:border-paper group-hover:bg-paper group-hover:text-ink' : 'group-hover:border-ink group-hover:bg-ink group-hover:text-paper'
  return (
    <span className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-stone transition-colors duration-300 ${hover} ${className}`}>
      <Chevron className="h-3 w-3 transition-transform duration-500 ease-snap group-hover:translate-x-6" />
      <Chevron className="absolute h-3 w-3 -translate-x-6 transition-transform duration-500 ease-snap group-hover:translate-x-0" />
    </span>
  )
}

export function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])
  return <div ref={ref} aria-hidden="true" className="fixed inset-x-0 bottom-0 z-[100] h-1.5 origin-left scale-x-0 bg-taupe" />
}
