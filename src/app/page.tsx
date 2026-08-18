'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const projects = [
  {
    id: 'vs-german-silver',
    tag: 'E-Commerce · Showcase Platform',
    title: 'VS GERMAN SILVER',
    role: 'Full-Stack Web Developer',
    year: '2026',
    desc: 'A modern, high-performance client-side e-commerce and showcase platform built for showcasing silver products with a fluid user interface and responsive layouts.',
    features: [
      'Fluid client-side product showcase interface',
      'Responsive design system & modern layout structure',
      'Optimized Vercel cloud deployment & asset delivery',
    ],
    tech: ['Next.js', 'Tailwind CSS', 'Vercel'],
    img: '/project-vsgerman.png',
    demoLink: 'https://www.vsgerman.online/',
    githubLink: 'https://github.com/gagancv28/vs-silver-clientside',
  },
  {
    id: 'mapreview',
    tag: 'Spatial Web · Location Analytics',
    title: 'MAP REVIEW',
    role: 'Full-Stack Developer',
    year: '2026',
    desc: 'An interactive location intelligence and map review platform engineered for streamlined visual analytics and spatial user feedback.',
    features: [
      'Location intelligence & visual analytics engine',
      'Spatial user feedback collection & review pipeline',
      'Interactive map visualizations & RESTful APIs',
    ],
    tech: ['Full-Stack Web Development', 'REST APIs', 'Interactive Maps'],
    img: '/project-mapreview.png',
    demoLink: 'https://map-reviews.vercel.app/',
    githubLink: 'https://github.com/gagancv28/mapReviews',
  },
]

const certificates = [
  { name: 'Adobe Creative Cloud', issuer: 'Adobe', year: 'Verified', actionText: 'View Certificate', link: 'https://www.linkedin.com/feed/update/urn:li:activity:7491096402345750529/' },
  { name: 'Brave', issuer: 'NIAT', year: 'Verified', actionText: 'View Certificate', link: 'https://www.linkedin.com/feed/update/urn:li:activity:7485670229382139904' },
  { name: 'Claude Code 101', issuer: 'Anthropic', year: 'Verified', actionText: 'Verify Certificate', link: 'https://verify.skilljar.com/c/aaatfix67rfb' },
  { name: 'Claude 101', issuer: 'Anthropic', year: 'Verified', actionText: 'Verify Certificate', link: 'https://verify.skilljar.com/c/qg7zs3jobdxu' },
  { name: 'AI Capabilities and Limitations', issuer: 'Anthropic / DeepLearning.AI', year: 'Verified', actionText: 'Verify Certificate', link: 'https://verify.skilljar.com/c/f74j2pkc3qte' },
  { name: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', year: 'Verified', actionText: 'Verify Certificate', link: 'https://verify.skilljar.com/c/tqxf3t9g84xr' },
  { name: 'Yuva AI for ALL', issuer: 'Yuva AI', year: 'Verified', actionText: 'View Document', link: 'https://drive.google.com/file/d/1OpzmdkDprjh0WJ4kcfWn8NrQcnCdgkfH/view' },
]

const navLinks = ['About', 'Skills', 'Projects', 'Certificates', 'Contact']

const avatarConfig: Record<string, { tip: string; src: string }> = {
  hero:          { tip: "Hey! I'm GAGAN.C.V 👋", src: '/avatar-about.png' },
  about:         { tip: "Full-Stack Engineer & AI Specialist! 🚀", src: '/avatar-about.png' },
  skills:        { tip: "Always levelling up 🧠", src: '/avatar-skills.png' },
  projects:      { tip: "My flagship builds! 🚀", src: '/avatar-projects.png' },
  certificates:  { tip: "Verified Credentials ✅", src: '/avatar-certificates.png' },
  contact:       { tip: "Let's build something real! 💖", src: '/avatar-contact.png' },
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [showTip, setShowTip] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  /* Lenis */
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  /* Custom cursor */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!cursorRef.current) return
      cursorRef.current.style.left = e.clientX + 'px'
      cursorRef.current.style.top = e.clientY + 'px'
    }
    const over = () => cursorRef.current?.classList.add('hovering')
    const out = () => cursorRef.current?.classList.remove('hovering')
    window.addEventListener('mousemove', move)
    document.querySelectorAll('a,button,.project-card,.cert-row').forEach(el => {
      el.addEventListener('mouseenter', over)
      el.addEventListener('mouseleave', out)
    })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  /* Navbar scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Active section tracking with scroll position calculation */
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'certificates', 'contact']
    
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          if (scrollPosition >= top - 120) {
            setActiveSection(prev => {
              if (prev !== id) {
                setShowTip(true)
                setTimeout(() => setShowTip(false), 3000)
              }
              return id
            })
            break
          }
        }
      }
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true })
    updateActiveSection()
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [])

  /* Scroll reveal */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => {
        gsap.from(el, {
          opacity: 0, y: 48,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        })
      })
      /* Hero text entrance */
      gsap.from('.hero-name span', {
        y: '100%', opacity: 0, duration: 1, stagger: 0.08,
        ease: 'power4.out', delay: 0.2,
      })
      gsap.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.8, delay: 0.8 })
      gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.8, delay: 1 })
      gsap.from('.hero-bottom', { opacity: 0, y: 20, duration: 0.8, delay: 1.2 })
      gsap.from('.hero-img-container', { opacity: 0, x: 40, duration: 1, delay: 0.4, ease: 'power3.out' })
      /* Certificates list stagger fade */
      gsap.fromTo(
        '.cert-row',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cert-list',
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Custom cursor */}
      <div id="cursor" ref={cursorRef} />

      {/* ── NAVBAR ── */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav-logo">GAGAN.C.V</a>
        {/* Desktop nav */}
        <div className="nav-links">
          {navLinks.map(n => (
            <button key={n} className="nav-link" onClick={() => scrollTo(n.toLowerCase())}>
              {n}
            </button>
          ))}
        </div>
        {/* Hamburger button (mobile only) */}
        <button
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── MOBILE NAV DRAWER ── */}
      <div className={`mobile-nav-drawer ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(n => (
          <button
            key={n}
            className="nav-link"
            onClick={() => { setMenuOpen(false); scrollTo(n.toLowerCase()) }}
          >
            {n}
          </button>
        ))}
      </div>

      {/* ── HERO ── */}
      <section id="hero" data-section="hero" className="hero">
        {/* Left: text column */}
        <div className="hero-text">
          <p className="hero-eyebrow">
            <span className="eyebrow-full">Full-Stack Software Engineer · AI Implementations Specialist · Bangalore, Karnataka, India</span>
            <span className="eyebrow-short">Full-Stack Engineer · AI Specialist · Bangalore</span>
          </p>

          <div className="hero-name">
            <span>GAGAN.C.V</span>
            <span style={{ color: 'var(--red)' }}>BUILDS.</span>
          </div>

          <p className="hero-subtitle">
            Full-Stack Developer building scalable web apps and AI-driven experiences.
          </p>

          <div className="hero-bottom">
            <div className="hero-available">
              <span className="hero-available-dot" />
              Available for projects & roles
            </div>
            <p className="hero-scroll">Scroll to explore</p>
          </div>
        </div>

        {/* Right: photo column */}
        <div className="hero-img-container">
          <Image src="/gagan-hero.png" alt="Gagan" fill style={{ objectFit: 'contain', objectPosition: 'center bottom' }} priority />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" data-section="about" className="about" style={{ position: 'relative' }}>
        <p className="section-label reveal">/ About me</p>
        <h2 className="about-headline reveal">ENGINEERING<br />SOLUTIONS</h2>
        <div className="about-grid">
          <div className="about-bio reveal">
            <p>
              Full-Stack Software Engineer specializing in Next.js, AI implementations, and robust web architectures. Experienced in building responsive e-commerce platforms, spatial web applications, and automated AI solutions that solve real-world problems.
            </p>
          </div>
          <div className="about-highlights reveal">
            {[
              { n: '7+', l: 'Certifications Earned' },
              { n: '2+', l: 'Core Production Web Apps Shipped' },
              { n: 'AI', l: 'Implementation Experience at Guduchi Ayurveda' },
            ].map(({ n, l }) => (
              <div key={l} className="highlight-card">
                <div className="highlight-number">{n}</div>
                <div className="highlight-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Bottom Left Corner Portrait Sticker */}
        <div className="about-corner-sticker bg-transparent border-0 shadow-none reveal">
          <img 
            src="/about-corner-avatar.png?v=17" 
            alt="Gagan Portrait Sticker" 
            style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom left', background: 'transparent' }} 
          />
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" data-section="skills" className="skills">
        <p className="section-label reveal" style={{ color: 'var(--text-muted)' }}>/ Technical Stack</p>
        <h2 className="skills-headline reveal">SKILLS &<br />EXPERTISE</h2>
        <div className="skills-grid reveal" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          <div className="skill-card">
            <div className="skill-card-title">Core Web & Frontend</div>
            <div className="skill-tags">
              {['Next.js', 'JavaScript', 'Tailwind CSS', 'Back-End Web Development', 'REST APIs', 'Rapid Prototyping'].map(s => (
                <span key={s} className="skill-tag">{s}</span>
              ))}
            </div>
          </div>
          <div className="skill-card">
            <div className="skill-card-title">AI & Machine Learning</div>
            <div className="skill-tags">
              {['Generative AI', 'Claude Code 101', 'MLOps', 'Python', 'Data Pipelines', 'Conversational AI', 'ChatGPT'].map(s => (
                <span key={s} className="skill-tag">{s}</span>
              ))}
            </div>
          </div>
          <div className="skill-card">
            <div className="skill-card-title">Databases & Architecture</div>
            <div className="skill-tags">
              {['PostgreSQL', 'Supabase', 'SQL', 'Relational Databases (DBMS)', 'Database Modeling', 'Data Structures'].map(s => (
                <span key={s} className="skill-tag">{s}</span>
              ))}
            </div>
          </div>
          <div className="skill-card">
            <div className="skill-card-title">Testing, Automation & Tools</div>
            <div className="skill-tags">
              {['Test Automation', 'GitHub', 'Build Automation', 'Workflow Automation', 'Scriptwriting'].map(s => (
                <span key={s} className="skill-tag">{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Experience Highlight Card — Light Luxury Silver-Glass Palette */}
        <div className="reveal" style={{ marginTop: '3.5rem' }}>
          {/* Outer wrapper provides the clean 4px wine-red top accent with proper rounding */}
          <div
            className="rounded-2xl bg-gradient-to-br from-white via-zinc-50 to-zinc-100/90 text-zinc-900"
            style={{
              padding: '2.5rem 2.75rem',
              borderTop: '4px solid #6b0f1a',
              boxShadow: '0 0 0 1px rgba(228,228,231,0.85), 0 20px 50px rgba(228,228,231,0.25)',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Role & Company Info */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#6b0f1a] bg-[#6b0f1a]/10 border border-[#6b0f1a]/30 w-max shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#6b0f1a] animate-pulse" />
                  FEATURED EXPERIENCE
                </div>

                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
                  AI Implementation Intern
                </h3>

                <p className="text-lg font-semibold text-[#6b0f1a]">
                  Guduchi Ayurveda
                </p>

                <p className="text-xs uppercase tracking-widest text-zinc-400 font-mono">
                  Specialized Technical Internship
                </p>
              </div>

              {/* Right Column: Achievements Bulleted List */}
              <div className="lg:col-span-7 flex flex-col gap-5">
                <h4 className="text-xs uppercase tracking-widest text-zinc-400 font-mono font-semibold">
                  Key Accomplishments &amp; Impact
                </h4>

                <ul className="flex flex-col gap-5 text-sm md:text-base text-zinc-700">
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#6b0f1a]/10 border border-[#6b0f1a]/30 text-[#6b0f1a] flex items-center justify-center text-xs mt-0.5 font-bold shadow-sm">
                      ✓
                    </span>
                    <span className="leading-relaxed">
                      Engineered automated data pipelines and conducted statistical data analysis to extract actionable business insights.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#6b0f1a]/10 border border-[#6b0f1a]/30 text-[#6b0f1a] flex items-center justify-center text-xs mt-0.5 font-bold shadow-sm">
                      ✓
                    </span>
                    <span className="leading-relaxed">
                      Designed and deployed report automation systems, significantly reducing manual data compilation time and improving operational efficiency.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#6b0f1a]/10 border border-[#6b0f1a]/30 text-[#6b0f1a] flex items-center justify-center text-xs mt-0.5 font-bold shadow-sm">
                      ✓
                    </span>
                    <span className="leading-relaxed">
                      Conducted comprehensive research on AI capabilities and limitations to determine optimal integration strategies and technical implementations for their ecosystem.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" data-section="projects" className="projects">
        <p className="projects-sub reveal">/ Selected Flagship Builds</p>
        <h2 className="projects-headline reveal">FEATURED<br />PROJECTS</h2>
        {projects.map((p, i) => (
          <div key={p.id} className={`project-card reveal ${i % 2 === 1 ? 'reverse' : ''}`}>
            <div className="project-img-wrap">
              <Image src={p.img} alt={p.title} fill style={{ objectFit: 'contain', padding: '0.5rem' }} priority />
            </div>
            <div className="project-info">
              <span className="project-tag">{p.tag} — {p.year}</span>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-role">{p.role}</p>
              <p className="project-desc">{p.desc}</p>
              <ul className="project-features">
                {p.features.map(f => (
                  <li key={f}>
                    <span className="project-check">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="project-tech">
                {p.tech.map(t => <span key={t} className="project-tech-tag">{t}</span>)}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={p.demoLink} target="_blank" rel="noopener noreferrer" className="project-btn">
                  Explore Project <span>→</span>
                </a>
                <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className="project-btn" style={{ background: '#f0efeb', color: '#0a0a0a', border: '1px solid #ddd' }}>
                  GitHub Repo <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certificates" data-section="certificates" className="certifications">
        <p className="certs-sub reveal">/ Credentials</p>
        <h2 className="certs-headline reveal">VERIFIED<br />CERTIFICATES</h2>
        <div className="cert-list">
          {certificates.map((cert, i) => (
            <a key={i} href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-row" style={{ textDecoration: 'none' }}>
              <span className="cert-name">{cert.name}</span>
              <span className="cert-issuer">{cert.issuer}</span>
              <span className="cert-year">{cert.actionText}</span>
              <span className="cert-arrow">↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" data-section="contact" className="contact">
        <h2 className="contact-headline reveal">
          LET&apos;S BUILD<br /><span>SOMETHING REAL.</span>
        </h2>
        <p className="contact-subtext reveal">
          If my technical capabilities and engineering approach align with the demands of your next project or open role, reach out. Let&apos;s connect.
        </p>
        <div className="contact-grid">
          <div>
            <p className="contact-info-label reveal">Contact Details</p>
            <div className="contact-socials reveal">
              {[
                { name: 'GitHub', handle: '@gagancv28', href: 'https://github.com/gagancv28' },
                { name: 'LinkedIn', handle: 'Gagan C V', href: 'https://www.linkedin.com/in/gagan-cv-5b3b22369/' },
                { name: 'Email', handle: 'gagancvcm28@gmail.com', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=gagancvcm28@gmail.com' },
                { name: 'Location', handle: 'Bangalore, Karnataka, India', href: '#' },
              ].map(s => (
                <a key={s.name} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="social-link">
                  <span className="social-name">{s.name}</span>
                  <span className="social-handle">{s.handle} {s.href !== '#' && '↗'}</span>
                </a>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <span className="footer-logo">GAGAN.C.V</span>
        <span className="footer-copy">© {new Date().getFullYear()} — Designed & Built by GAGAN.C.V · Bangalore, Karnataka, India</span>
      </footer>

      {/* ── AVATAR COMPANION ── */}
      <div className="avatar-companion">
        <AnimatePresence>
          {showTip && (
            <motion.div
              className="avatar-bubble"
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            >
              {avatarConfig[activeSection]?.tip}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          key={activeSection}
          className="avatar-img"
          style={{ position: 'relative' }}
          initial={{ y: 14, rotate: -6, scale: 0.9, opacity: 0.8 }}
          animate={{ y: [0, -6, 0], rotate: 0, scale: 1, opacity: 1 }}
          transition={{
            y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 0.45, ease: 'easeOut' },
            scale: { duration: 0.45, ease: 'easeOut' },
            opacity: { duration: 0.3 }
          }}
          onClick={() => setShowTip(v => !v)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full relative"
            >
              <img 
                src={(avatarConfig[activeSection]?.src || '/avatar-about.png') + '?v=10'} 
                alt="Avatar Companion" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  )
}

/* ─────────────────────────────────────────────
   CONTACT FORM (sub-component)
───────────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [isSent, setIsSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Send submission to Web3Forms endpoint for gagancvcm28@gmail.com
      const formData = new FormData()
      formData.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '')
      formData.append('name', form.name)
      formData.append('email', form.email)
      formData.append('message', form.message)
      formData.append('to_email', 'gagancvcm28@gmail.com')
      formData.append('subject', `New Portfolio Message from ${form.name}`)

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      // Also send to local API route
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } catch (err) {
      console.error('Contact form submission error:', err)
    }

    // Open Gmail web compose in new tab (bypasses OS mail app)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=gagancvcm28@gmail.com&su=${encodeURIComponent('Portfolio Message from ' + form.name)}&body=${encodeURIComponent('Name: ' + form.name + '\nEmail: ' + form.email + '\n\nMessage:\n' + form.message)}`
    window.open(gmailUrl, '_blank')

    setIsSubmitting(false)
    setIsSent(true)
  }

  if (isSent) return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="reveal p-6 bg-zinc-900/40 rounded-2xl border border-zinc-800"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', paddingTop: '1rem' }}
    >
      <span style={{ fontSize: '3rem' }}>🎉</span>
      <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--white)' }}>Message Sent Successfully!</p>
      <p style={{ color: 'var(--text-muted)' }}>Thank you! Your message has been dispatched to <strong>gagancvcm28@gmail.com</strong>. I&apos;ll get back to you shortly.</p>
    </motion.div>
  )

  return (
    <form onSubmit={handleSubmit} className="contact-form reveal">
      <input type="hidden" name="to_email" value="gagancvcm28@gmail.com" />
      <div className="form-group">
        <label className="form-label">Your Name</label>
        <input className="form-input" type="text" name="name" placeholder="Ada Lovelace" required
          value={form.name} onChange={e => setForm(s => ({ ...s, name: e.target.value }))} />
      </div>
      <div className="form-group">
        <label className="form-label">Email Address</label>
        <input className="form-input" type="email" name="email" placeholder="ada@example.com" required
          value={form.email} onChange={e => setForm(s => ({ ...s, email: e.target.value }))} />
      </div>
      <div className="form-group">
        <label className="form-label">Message</label>
        <textarea className="form-input form-textarea" name="message" placeholder="Tell me about your project..." required
          value={form.message} onChange={e => setForm(s => ({ ...s, message: e.target.value }))} />
      </div>
      <button type="submit" className="form-submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'SEND MESSAGE →'}
      </button>
    </form>
  )
}
