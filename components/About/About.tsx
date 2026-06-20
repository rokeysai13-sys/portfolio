'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  'PYTHON','MACHINE LEARNING','TENSORFLOW','PYTORCH','LANGCHAIN',
  'RAG SYSTEMS','AGENTIC AI','VECTOR DATABASES','OLLAMA','FASTAPI',
  'REACT','NEXT.JS','TYPESCRIPT','DOCKER','OPENAI API','HUGGING FACE',
  'OLLAMA','NODE.JS','POSTGRESQL','REDIS',
];

interface AboutProps {
  isEntered: boolean;
}

export default function About({ isEntered }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isEntered && videoRef.current) {
      videoRef.current.play().catch(e => console.error('About video play failed:', e));
    }
  }, [isEntered]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-reveal]',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className={styles.about}>
      <div className={styles.inner}>

        {/* ── Left: Photo Card ── */}
        <div className={styles.photoSide} data-reveal>
          <div className={styles.photoCard}>
            <video
              ref={videoRef}
              src="/video/hero.mp4"
              loop muted playsInline
              className={styles.photoVideo}
              suppressHydrationWarning
            />
            {/* Cursive overlay name */}
            <div className={styles.cursiveName}>Sai Kiran</div>
          </div>
          {/* Social row below card */}
          <div className={styles.cardSocials}>
            <a href="https://github.com/rokeysai13-sys" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/sai-kiran-putta-v-v-421497310" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* ── Right: Bio ── */}
        <div className={styles.bioSide}>
          <p className={styles.whoLabel} data-reveal>WHO I AM</p>

          {/* Skills Marquee */}
          <div className={styles.marqueeWrap} data-reveal aria-hidden="true">
            <div className={styles.marqueeTrack}>
              {[...SKILLS, ...SKILLS].map((s, i) => (
                <span key={i} className={styles.skillTag}>
                  {s} <span className={styles.skillDot}>·</span>
                </span>
              ))}
            </div>
          </div>

          <p className={styles.bioParagraph} data-reveal>
            I&apos;m a Computer Science &amp; Machine Learning student at{' '}
            <strong>NSRIT</strong>, passionate about Artificial Intelligence,
            Machine Learning, Agentic AI Systems, and Full-Stack Development.
            I enjoy building intelligent applications, autonomous AI agents,
            RAG systems, and modern web experiences that solve real-world
            problems.
          </p>

          <div className={styles.statRow} data-reveal>
            <div className={styles.stat}>
              <span className={styles.statNum}>5+</span>
              <span className={styles.statLabel}>AI Projects</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>3+</span>
              <span className={styles.statLabel}>Open Source Roles</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>10+</span>
              <span className={styles.statLabel}>Technologies</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
