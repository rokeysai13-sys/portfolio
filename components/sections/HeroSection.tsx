'use client';

import { useEffect, useRef, Fragment } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { gsap } from '@/lib/gsap';

import profile from '@/data/profile.json';
import content from '@/data/content.json';
import styles from '@/styles/sections/HeroSection.module.css';

const HeroBackground = dynamic(() => import('@/components/three/HeroBackground'), { ssr: false });

const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const SOCIAL_ICON_MAP: Record<string, React.ComponentType> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
};

const SIDEBAR_LABELS = ['Instagram', 'GitHub', 'LinkedIn'];

function splitTagline(text: string, highlight: string) {
  if (!highlight) return [text];
  const parts = text.split(highlight);
  return parts.reduce<React.ReactNode[]>((acc, part, i) => {
    acc.push(part);
    if (i < parts.length - 1) {
      acc.push(<span key={i} className={styles.taglineAccent}>{highlight}</span>);
    }
    return acc;
  }, []);
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const greetRef = useRef<HTMLParagraphElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const firstName = useRef<HTMLParagraphElement>(null);
  const lastName = useRef<HTMLParagraphElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const taglineCardRef = useRef<HTMLDivElement>(null);
  const availCardRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  function handleViewProjects() {
    const scroller = document.querySelector('main');
    if (scroller) {
      gsap.to(scroller, { scrollTop: 3 * window.innerHeight, duration: 1.0, ease: 'power3.inOut' });
    }
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const fadeY = [
      greetRef.current, roleRef.current,
      firstName.current, lastName.current,
      pillsRef.current, ctaBtnRef.current, statsRef.current,
    ].filter(Boolean) as HTMLElement[];

    const fadeX = [taglineCardRef.current, availCardRef.current].filter(Boolean) as HTMLElement[];

    gsap.set(fadeY, { opacity: 0, y: 30 });
    gsap.set(fadeX, { opacity: 0, x: 20 });
    if (photoRef.current)  gsap.set(photoRef.current,  { opacity: 0, x: 80 });
    if (socialRef.current) gsap.set(socialRef.current, { opacity: 0, x: -20 });

    const tl = gsap.timeline({ paused: true });
    tl.to(greetRef.current,       { opacity: 1, y: 0, duration: 0.5,  ease: 'power2.out' })
      .to(roleRef.current,        { opacity: 1, y: 0, duration: 0.5,  ease: 'power2.out' }, '-=0.3')
      .to(firstName.current,      { opacity: 1, y: 0, duration: 0.6,  ease: 'power2.out' }, '-=0.2')
      .to(lastName.current,       { opacity: 1, y: 0, duration: 0.6,  ease: 'power2.out' }, '-=0.4')
      .to(photoRef.current,       { opacity: 1, x: 0, duration: 0.7,  ease: 'power2.out' }, '-=0.5')
      .to(pillsRef.current,       { opacity: 1, y: 0, duration: 0.5,  ease: 'power2.out' }, '-=0.3')
      .to(ctaBtnRef.current,      { opacity: 1, y: 0, duration: 0.4,  ease: 'power2.out' }, '-=0.2')
      .to(statsRef.current,       { opacity: 1, y: 0, duration: 0.5,  ease: 'power2.out' }, '-=0.2')
      .to(taglineCardRef.current, { opacity: 1, x: 0, duration: 0.5,  ease: 'power2.out' }, '-=0.5')
      .to(availCardRef.current,   { opacity: 1, x: 0, duration: 0.5,  ease: 'power2.out' }, '-=0.3')
      .to(socialRef.current,      { opacity: 1, x: 0, duration: 0.5,  ease: 'power2.out' }, '-=0.4');

    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { tl.play(); observer.disconnect(); } },
      { threshold: 0.3 },
    );
    observer.observe(section);
    return () => { observer.disconnect(); tl.kill(); };
  }, []);

  const sidebarSocials = SIDEBAR_LABELS
    .map(label => profile.socials.find(s => s.label === label))
    .filter(Boolean);

  return (
    <section ref={sectionRef} className={styles.section}>
      <HeroBackground />

      {/* Main portrait image layout */}
      <div ref={photoRef} className={styles.photo}>
        <Image
          src="/assets/hero1.png" alt={profile.name.full}
          fill priority quality={100}
          sizes="(min-width: 768px) 55vw, 100vw"
          className={styles.photoImg}
        />
      </div>

      {/* Vertical Social sidebar */}
      <div ref={socialRef} className={styles.socialSidebar}>
        {sidebarSocials.map(social => {
          if (!social) return null;
          const Icon = SOCIAL_ICON_MAP[social.label];
          if (!Icon) return null;
          return (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={social.label}
            >
              <Icon />
              <span className={styles.socialLabel}>{social.label}</span>
            </a>
          );
        })}
        <div className={styles.scrollIndicator}>
          <span className={styles.scrollText}>Scroll down</span>
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="1" y="1" width="12" height="20" rx="6" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="7" cy="6" r="2" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* Left aligned copy column */}
      <div className={styles.content}>
        <div className={styles.greeting}>
          <p ref={greetRef} className={styles.greetText}>{"Hi, I'm"}</p>
          <p ref={roleRef}  className={styles.roleText}>{profile.roles.short}</p>
        </div>

        <div className={styles.nameBlock}>
          <p ref={firstName} className={styles.name}>{profile.name.first}</p>
          <p ref={lastName}  className={styles.name}>{profile.name.last}</p>
        </div>

        <div ref={pillsRef} className={styles.pills}>
          {content.hero.pills.map((tag, i) => (
            <Fragment key={tag}>
              <span className={styles.pill}>{tag}</span>
              {i < content.hero.pills.length - 1 && (
                <span className={styles.pillDot} aria-hidden="true" />
              )}
            </Fragment>
          ))}
        </div>

        <button ref={ctaBtnRef} type="button" className={styles.viewBtn} onClick={handleViewProjects}>
           View Work <ArrowIcon />
        </button>

        <div ref={statsRef} className={styles.stats}>
          {[...profile.stats.slice(0, 2), content.hero.specialistStat].map(s => (
            <div key={s.label} className={styles.statCard}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right aligned status & tagline cards */}
      <div className={styles.cardsCol}>
        <div ref={taglineCardRef} className={styles.taglineCard}>
          <p className={styles.taglineText}>
            {splitTagline(profile.tagline, content.hero.taglineHighlight)}
          </p>
          <p className={styles.freelanceNote}>{content.hero.freelanceNote}</p>
        </div>

        {profile.available && (
          <div ref={availCardRef} className={styles.availCard}>
            <div className={styles.availHeader}>
              <span className={styles.availDot} />
              <span className={styles.availStatus}>{content.hero.availableLabel}</span>
            </div>
            <p className={styles.locationLine}>Based in {profile.location.based}</p>
            <p className={styles.locationLine}>Available {profile.location.availability}</p>
          </div>
        )}
      </div>
    </section>
  );
}
