'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Impact.module.css';

gsap.registerPlugin(ScrollTrigger);

const INITIATIVES = [
  {
    num: '01',
    title: 'Kirannn OS',
    badge: 'AGENTIC AI',
    desc: 'Next-generation agentic operating system combining AI agents, memory layers, custom toolsets, and autonomous workflows.',
    year: '2025',
  },
  {
    num: '02',
    title: 'ATS-Friendly Resume Builder',
    badge: 'FULL STACK',
    desc: 'Intelligent resume platform with AI-driven content optimization, resume scoring, PDF export, and modern responsive design.',
    year: '2025',
  },
  {
    num: '03',
    title: 'AI Council',
    badge: 'MULTI-LLM',
    desc: 'A collaborative multi-model debate and reasoning platform that allows multiple LLMs to interact and solve complex problems.',
    year: '2025',
  },
  {
    num: '04',
    title: 'Open Source Contributions',
    badge: 'COLLABORATION',
    desc: 'Active contributions to AI and machine learning repositories on GitHub, helping maintain code quality and build tools.',
    year: '2025',
  },
  {
    num: '05',
    title: 'RAG & Agentic Systems Research',
    badge: 'RESEARCH',
    desc: 'Independent research into vector databases, local model deployments with Ollama, retrieval workflows, and AI safety.',
    year: '2024',
  },
];

interface ImpactProps {
  isEntered: boolean;
}

export default function Impact({ isEntered }: ImpactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isEntered && videoRef.current) {
      videoRef.current.play().catch(e => console.error('Impact video play failed:', e));
    }
  }, [isEntered]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-impact-header]',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo('[data-impact-row]',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="impact" className={styles.section}>
      {/* Video Background */}
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
        <div className={styles.header} data-impact-header>
          <div className={styles.headerLeft}>
            <p className={styles.label}>AI &amp; MACHINE LEARNING</p>
            <h2 className={styles.title}>
              KEY INITIATIVES &amp; <span className={styles.accent}>IMPACT.</span>
            </h2>
          </div>
          <span className={styles.count}>0{INITIATIVES.length} Focus Areas</span>
        </div>

        {/* List of initiatives */}
        <div className={styles.list}>
          {INITIATIVES.map((item) => (
            <div key={item.num} className={styles.row} data-impact-row>
              <div className={styles.rowLeft}>
                <span className={styles.num}>{item.num}.</span>
                <div className={styles.info}>
                  <div className={styles.titleRow}>
                    <h3 className={styles.rowTitle}>{item.title}</h3>
                    <span className={styles.badge}>{item.badge}</span>
                  </div>
                  <p className={styles.desc}>{item.desc}</p>
                </div>
              </div>
              <span className={styles.year}>{item.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
