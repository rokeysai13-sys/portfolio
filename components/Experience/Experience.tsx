'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Experience.module.css';

gsap.registerPlugin(ScrollTrigger);

const EXP = [
  {
    num: '01',
    type: 'PERSONAL',
    dates: '2025 – PRESENT',
    company: 'AI & FULL STACK DEVELOPER',
    role: 'Personal Projects',
    desc: 'Building AI-powered applications, RAG systems, multi-agent architectures, and full-stack web platforms using Python, FastAPI, React, and modern AI frameworks.',
    tags: ['Python', 'FastAPI', 'React', 'LangChain', 'RAG', 'OpenAI'],
  },
  {
    num: '02',
    type: 'OPEN SOURCE',
    dates: '2025 – PRESENT',
    company: 'OPEN SOURCE CONTRIBUTOR',
    role: 'GitHub Projects',
    desc: 'Contributing to GitHub projects, improving codebases, fixing bugs, and collaborating with developers on AI and software engineering projects.',
    tags: ['Git', 'Python', 'TypeScript', 'Code Review', 'Documentation'],
  },
  {
    num: '03',
    type: 'RESEARCH',
    dates: '2024 – PRESENT',
    company: 'AI RESEARCH & LEARNING',
    role: 'Independent Research',
    desc: 'Exploring LLMs, Vector Databases, Retrieval-Augmented Generation (RAG), Agent Workflows, and local AI deployment using Ollama and open-source models.',
    tags: ['LLMs', 'Vector DB', 'Ollama', 'Embeddings', 'Agents'],
  },
];

interface ExperienceProps {
  isEntered: boolean;
}

export default function Experience({ isEntered }: ExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isEntered && videoRef.current) {
      videoRef.current.play().catch(e => console.error('Experience video play failed:', e));
    }
  }, [isEntered]);

  const [active, setActive] = [0, () => {}]; // eslint-disable-line
  const activeRef = useRef(0);
  const setActiveState = (i: number) => {
    activeRef.current = i;
    const cards = sectionRef.current?.querySelectorAll('[data-card]');
    cards?.forEach((c, idx) => {
      (c as HTMLElement).setAttribute('data-active', idx === i ? 'true' : 'false');
    });
    const nodes = sectionRef.current?.querySelectorAll('[data-node]');
    nodes?.forEach((n, idx) => {
      (n as HTMLElement).setAttribute('data-active', idx === i ? 'true' : 'false');
    });
  };

  useEffect(() => {
    setActiveState(0);

    const ctx = gsap.context(() => {
      gsap.fromTo('[data-timeline]',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );
      gsap.fromTo('[data-card]',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className={styles.section}>
      {/* Faded video bg */}
      <div className={styles.videoBg} aria-hidden="true">
        <video
          ref={videoRef}
          src="/video/hero.mp4"
          loop muted playsInline
          className={styles.video}
          suppressHydrationWarning
        />
        <div className={styles.videoOverlay} />
      </div>

      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.topRow}>
          <p className={styles.label}>WORK EXPERIENCE</p>
          <p className={styles.countLabel}>0{EXP.length} Roles</p>
        </div>

        {/* Timeline nodes */}
        <div className={styles.timeline} data-timeline>
          <div className={styles.timelineLine} />
          {EXP.map((e, i) => (
            <button
              key={e.num}
              data-node
              className={styles.timelineNode}
              onClick={() => setActiveState(i)}
              aria-label={`View ${e.company}`}
            >
              {e.num}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className={styles.cards}>
          {EXP.map((e, i) => (
            <div key={e.num} data-card className={styles.card} onClick={() => setActiveState(i)}>
              <div className={styles.cardTop}>
                <span className={styles.dates}>{e.dates}</span>
                <span className={styles.typeBadge}>{e.type}</span>
              </div>
              <h3 className={styles.company}>{e.company}</h3>
              <p className={styles.role}>{e.role}</p>
              <p className={styles.desc}>{e.desc}</p>
              <div className={styles.tags}>
                {e.tags.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
