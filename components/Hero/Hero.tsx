'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Hero.module.css';

interface HeroProps {
  isEntered: boolean;
}

export default function Hero({ isEntered }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  const toggleMute = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
    if (bgAudioRef.current) {
      bgAudioRef.current.muted = nextMuted;
    }
  };

  const togglePlay = () => {
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);

    if (!videoEnded) {
      const v = videoRef.current;
      if (v) {
        if (nextPlaying) {
          v.play().catch(e => console.error(e));
        } else {
          v.pause();
        }
      }
    } else {
      const a = bgAudioRef.current;
      if (a) {
        if (nextPlaying) {
          a.play().catch(e => console.error(e));
        } else {
          a.pause();
        }
      }
    }
  };

  const handleVideoEnded = () => {
    setVideoEnded(true);
    if (bgAudioRef.current) {
      bgAudioRef.current.muted = muted;
      bgAudioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error('Audio play failed:', e));
    }
  };

  const sectionRef = useRef<HTMLElement>(null);

  // Initialize background music
  useEffect(() => {
    bgAudioRef.current = new Audio('/bg_music.mp3');
    bgAudioRef.current.loop = true;

    return () => {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current = null;
      }
    };
  }, []);

  // Play video only when loader is entered
  useEffect(() => {
    if (isEntered && videoRef.current) {
      videoRef.current.muted = muted;
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log('Video autoplay blocked, trying muted:', err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            setMuted(true);
            videoRef.current.play()
              .then(() => setIsPlaying(true))
              .catch(e => console.error('Muted autoplay also failed:', e));
          }
        });
    }
  }, [isEntered]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ delay: 0.4 })
        .fromTo('[data-hero-greeting]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo('[data-hero-role]',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .fromTo('[data-hero-fn]',       { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power4.out' }, '-=0.5')
        .fromTo('[data-hero-ln]',       { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power4.out' }, '-=0.8')
        .fromTo('[data-hero-bio]',      { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
        .fromTo('[data-hero-socials]',  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .fromTo('[data-hero-right]',    { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 1,   ease: 'power3.out' }, '-=0.8');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'GOOD MORNING';
    if (h < 17) return 'GOOD AFTERNOON';
    return 'GOOD EVENING';
  };

  return (
    <section ref={sectionRef} id="home" className={styles.hero}>
      {/* Video Background */}
      <div className={styles.videoBg} aria-hidden="true">
        <video
          ref={videoRef}
          src="/video/hero.mp4"
          muted={muted}
          playsInline
          preload="auto"
          onEnded={handleVideoEnded}
          className={styles.video}
          suppressHydrationWarning
        />
        <div className={styles.videoOverlay} />
      </div>

      {/* Video Controls Group */}
      <div className={styles.controlsGroup}>
        {/* Play/Pause Button */}
        <button
          className={styles.playPauseBtn}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="10" y1="4" x2="10" y2="20" />
              <line x1="14" y1="4" x2="14" y2="20" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>

        {/* Mute Toggle Button */}
        <button
          className={styles.muteBtn}
          onClick={toggleMute}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
        >
          {muted ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
              TAP FOR SOUND
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              </svg>
              SOUND ON
            </>
          )}
        </button>
      </div>

      {/* Watermark */}
      <div className={styles.watermark} aria-hidden="true">SAI KIRAN</div>

      {/* Grid Layout */}
      <div className={styles.grid}>
        {/* ── Left Column ── */}
        <div className={styles.leftCol}>
          <div className={styles.greeting} data-hero-greeting>
            <span className={styles.dot} />
            {getGreeting()}
          </div>

          <p className={styles.role} data-hero-role>AI ENGINEER · ML DEVELOPER</p>

          <h1 className={styles.nameBlock} aria-label="Sai Kiran Putta V.V.">
            <span className={styles.firstName} data-hero-fn>SAI KIRAN</span>
            <span className={styles.lastName} data-hero-ln>PUTTA V.V.</span>
          </h1>

          <p className={styles.bio} data-hero-bio>
            CS &amp; Machine Learning student at NSRIT, building intelligent
            applications, autonomous AI agents, RAG systems, and modern web
            experiences that solve real-world problems.
          </p>

          <div className={styles.socials} data-hero-socials>
            <a href="https://github.com/rokeysai13-sys" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              {/* GitHub */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GITHUB
            </a>
            <span className={styles.sep}>|</span>
            <a href="https://www.linkedin.com/in/sai-kiran-putta-v-v-421497310" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              {/* LinkedIn */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LINKEDIN
            </a>
            <span className={styles.sep}>|</span>
            <a href="mailto:rokeysai13@gmail.com" className={styles.socialLink}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              EMAIL
            </a>
          </div>

          <p className={styles.emailText}>rokeysai13@gmail.com</p>
        </div>

        {/* ── Right Column ── */}
        <div className={styles.rightCol} data-hero-right>
          <p className={styles.availLabel}>OPEN TO OPPORTUNITIES — FREELANCE &amp; COLLABORATION</p>
          <div className={styles.tagline}>
            <span className={styles.taglineWhite}>AI THAT THINKS.</span>
            <span className={styles.taglineOrange}>CODE THAT SHIPS.</span>
          </div>
          <a href="mailto:rokeysai13@gmail.com" className={styles.ctaBtn}>
            LET&apos;S CONNECT
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <button className={styles.scrollHint} onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Scroll down">
        <span className={styles.scrollLabel}>SCROLL</span>
        <div className={styles.scrollLine}><div className={styles.scrollPulse} /></div>
      </button>
    </section>
  );
}
