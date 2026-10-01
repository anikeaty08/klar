import { useLayoutEffect, useRef } from 'react'
import { footer, links, manifesto } from '../data/content'
import { goTo, gsap } from '../lib/motion'
import { prefersReducedMotion } from '../lib/useCanvas'
import { FlipChars, FlipText, Scramble } from './fx'
import { DotWordPlay } from './Logo'
import { Button, Chevron } from './ui'

function Col({ title, children, className = '' }) {
  return (
    <div className={className}>
      <p className="caption text-[11px] text-taupe">{title}</p>
      <div className="mt-6">{children}</div>
    </div>
  )
}

const ext = { target: '_blank', rel: 'noopener noreferrer' }

function FooterLink({ href, children, external }) {
  return (
    <a href={href} {...(external ? ext : {})} className="group inline-block text-paper/80 transition-colors hover:text-paper">
      <FlipText text={children} stagger={12} />
    </a>
  )
}

export default function Footer() {
  const root = useRef(null)
  const inner = useRef(null)

  // the footer sits "under" the page and slides up into place as the page lifts away
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from(inner.current, {
        yPercent: -22,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 15%', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={root} className="relative -mt-[28px] overflow-hidden bg-ink pt-[28px] text-stone">
      <div ref={inner}>
        <div className="container-x pt-24 lg:pt-32">
          <p className="caption text-[11px] text-taupe">Start with a free assessment call</p>
          <FlipChars as="p" text={manifesto} onScroll className="mt-8 max-w-[19ch] font-serif text-[clamp(2.4rem,5.4vw,5.2rem)] leading-[1.04] text-paper" />
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href={links.booking} external variant="light">
              Book a free consultation
            </Button>
            <Button href={`mailto:${links.email}`} variant="outline" className="text-paper">
              Email us
            </Button>
          </div>
        </div>

        <div className="container-x mt-24 grid gap-12 border-t border-paper/10 pt-14 sm:grid-cols-2 lg:grid-cols-12">
          <Col title="Our vision" className="sm:col-span-2 lg:col-span-5">
            <p className="max-w-sm leading-relaxed text-paper/75">{footer.vision}</p>
          </Col>
          <Col title="Company" className="lg:col-span-2 lg:col-start-7">
            <ul className="space-y-3">
              {footer.company.map((c) => (
                <li key={c.label}>
                  <FooterLink href={c.href} external={c.external}>
                    {c.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </Col>
          <Col title="Offices" className="lg:col-span-2">
            <ul className="space-y-3">
              {footer.offices.map((o) => (
                <li key={o} className="text-paper/80">
                  <Scramble text={o} />
                </li>
              ))}
            </ul>
          </Col>
          <Col title="Connect" className="lg:col-span-2">
            <ul className="space-y-3">
              <li>
                <FooterLink href={links.linkedin} external>
                  LinkedIn
                </FooterLink>
              </li>
              <li>
                <FooterLink href={links.github} external>
                  GitHub
                </FooterLink>
              </li>
              <li>
                <FooterLink href={`mailto:${links.email}`}>Email</FooterLink>
              </li>
              <li>
                <FooterLink href={links.german}>Deutsch</FooterLink>
              </li>
            </ul>
          </Col>
        </div>

        <div className="container-x mt-24">
          <DotWordPlay />
        </div>

        <div className="container-x mt-12 flex flex-col gap-4 border-t border-paper/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="caption text-[11px] text-taupe">
            © {new Date().getFullYear()} KlarDataLabs <span className="mx-2">•</span> {links.email}
          </p>
          <button type="button" onClick={() => goTo('#top')} className="caption group inline-flex items-center gap-2 text-[11px] text-taupe transition-colors hover:text-paper">
            <FlipText text="Back to top" stagger={12} />
            <Chevron className="h-3 w-3 -rotate-90 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  )
}
