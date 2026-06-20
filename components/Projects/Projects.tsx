'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    num: '01',
    name: 'Kirannn OS',
    desc: 'A next-generation agentic operating system powered by AI agents, memory, tools, and autonomous workflows.',
    tags: ['Python', 'LangChain', 'Agentic AI', 'RAG', 'Memory Systems'],
    href: 'https://github.com/rokeysai13-sys',
  },
  {
    num: '02',
    name: 'ATS-Friendly Resume Builder',
    desc: 'An intelligent resume platform with ATS optimization, PDF export, and modern UI/UX design.',
    tags: ['Next.js', 'FastAPI', 'OpenAI', 'PDF Generation', 'TypeScript'],
    href: 'https://github.com/rokeysai13-sys',
  },
  {
    num: '03',
    name: 'AI Council',
    desc: 'A multi-model AI debate and reasoning system integrating multiple LLMs for collaborative problem-solving.',
    tags: ['Python', 'Multi-LLM', 'LangChain', 'Ollama', 'Reasoning'],
    href: 'https://github.com/rokeysai13-sys',
  },
  {
    num: '04',
    name: 'SmartCareerX',
    desc: 'An AI-powered career guidance platform providing personalized learning and career recommendations.',
    tags: ['React', 'FastAPI', 'OpenAI', 'Vector DB', 'Recommendations'],
    href: 'https://github.com/rokeysai13-sys',
  },
  {
    num: '05',
    name: 'SmartNoteX',
    desc: 'An intelligent note-taking and knowledge management platform with AI-assisted organization and retrieval.',
    tags: ['Next.js', 'RAG', 'Vector DB', 'Embeddings', 'TypeScript'],
    href: 'https://github.com/rokeysai13-sys',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-card]',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.label}>FEATURED WORK</p>
          <h2 className={styles.title}>
            Projects that <span className={styles.accent}>think.</span>
          </h2>
        </div>

        <div className={styles.list}>
          {PROJECTS.map((p) => (
            <a
              key={p.num}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              data-card
            >
              <div className={styles.cardLeft}>
                <span className={styles.cardNum}>{p.num}</span>
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardName}>{p.name}</h3>
                  <p className={styles.cardDesc}>{p.desc}</p>
                  <div className={styles.tags}>
                    {p.tags.map((t) => (
                      <span key={t} className={styles.tag}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.arrow}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
