'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import profile from '@/data/profile.json';
import styles from '@/styles/sections/AboutSection.module.css';
import Marquee from '@/components/ui/Marquee';

const BIO = profile.bio;
const WHO_ITEMS = profile.skills;

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.002 3.002 0 0 0-2.11 2.108C0 8.024 0 12 0 12s0 3.976.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.525 0 9.388-.51a3.002 3.002 0 0 0 2.11-2.108c.502-1.861.502-5.837.502-5.837s0-3.976-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const ICON_MAP: Record<string, React.ComponentType> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  YouTube: YouTubeIcon,
};

const SOCIALS = profile.socials.map(s => ({ Icon: ICON_MAP[s.label] || GitHubIcon, href: s.href, label: s.label }));

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [typed, setTyped] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function resetAnim() {
      if (intervalRef.current) clearInterval(intervalRef.current);
      gsap.killTweensOf(photoRef.current);
      gsap.killTweensOf(contentRef.current);
      const socialIcons = socialsRef.current?.querySelectorAll('a') ?? [];
      gsap.killTweensOf(socialIcons);
      gsap.set(photoRef.current,   { opacity: 0, x: -50 });
      gsap.set(contentRef.current, { opacity: 0, y:  40 });
      gsap.set(socialIcons, { opacity: 0, y: 20 });
      setTyped(0);
      setDone(false);
    }

    function playAnim() {
      resetAnim();
      gsap.to(photoRef.current,   { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' });
      gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.15 });
      const socialIcons = socialsRef.current?.querySelectorAll('a') ?? [];
      gsap.to(socialIcons, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1, delay: 0.5 });

      let i = 0;
      intervalRef.current = setInterval(() => {
        i = Math.min(i + 6, BIO.length);
        setTyped(i);
        if (i >= BIO.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDone(true);
        }
      }, 16);
    }

    resetAnim();

    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          playAnim();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(section);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="about">
      {/* Left Column: Photo Frame + Signature */}
      <div ref={photoRef} className={styles.photoCol}>
        <div className={styles.photoWrap}>
          <div className={styles.photoFrame} data-about-photo>
            <Image
              src="/assets/sai-about.png"
              alt={profile.name.full}
              fill
              quality={100}
              sizes="(min-width: 768px) 30vw, 100vw"
              className={styles.photoImg}
            />
          </div>
          <span className={styles.signature}>// {profile.name.first.toLowerCase()}</span>
        </div>

        {/* Social Link List */}
        <div ref={socialsRef} className={styles.socials}>
          {SOCIALS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={styles.socialLink}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      {/* Right Column: bio + skills marquee */}
      <div ref={contentRef} className={styles.content}>
        <p className={styles.whoLabel}>Who I Am</p>
        
        <Marquee items={WHO_ITEMS} speed={18} className={styles.marquee} />

        <div className={styles.bioWrap}>
          <p className={styles.bio}>
            {BIO.split('').map((char, i) => (
              <span
                key={i}
                className={
                  i < typed
                    ? (i === typed - 1 && !done ? styles.lastTyped : styles.typed)
                    : styles.untyped
                }
              >
                {char}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
