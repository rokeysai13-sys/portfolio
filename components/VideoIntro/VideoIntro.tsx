'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import styles from './VideoIntro.module.css';

export default function VideoIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const fgVideoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const soundHintRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);

  // ─── GSAP Entrance ────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.6 });

      // Section fade-in
      tl.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.6, ease: 'power2.out' }
      );

      // Tagline
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20, letterSpacing: '0.4em' },
        { opacity: 1, y: 0, letterSpacing: '0.25em', duration: 1.1, ease: 'power3.out' },
        '-=0.9'
      );

      // First name
      tl.fromTo(
        firstNameRef.current,
        { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1.0, ease: 'power4.out' },
        '-=0.7'
      );

      // Last name
      tl.fromTo(
        lastNameRef.current,
        { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 1.0, ease: 'power4.out' },
        '-=0.8'
      );

      // Role
      tl.fromTo(
        roleRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.6'
      );

      // Controls
      tl.fromTo(
        controlsRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      );
    });

    return () => ctx.revert();
  }, []);

  // ─── Auto-hide sound hint ─────────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      if (soundHintRef.current) {
        gsap.to(soundHintRef.current, {
          opacity: 0,
          y: -8,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => setShowSoundHint(false),
        });
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // ─── Toggle mute ──────────────────────────────────────────────────────────
  const toggleMute = useCallback(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;
    const next = !isMuted;
    fg.muted = next;
    bg.muted = next;
    setIsMuted(next);

    // Hide sound hint once user has interacted
    if (showSoundHint && soundHintRef.current) {
      gsap.to(soundHintRef.current, {
        opacity: 0,
        y: -8,
        duration: 0.4,
        onComplete: () => setShowSoundHint(false),
      });
    }
  }, [isMuted, showSoundHint]);

  // ─── Toggle play/pause ────────────────────────────────────────────────────
  const togglePlay = useCallback(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;
    if (isPlaying) {
      fg.pause();
      bg.pause();
    } else {
      fg.play().catch(() => {});
      bg.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // ─── Scroll to next section ──────────────────────────────────────────────
  const scrollToNext = useCallback(() => {
    const next = document.getElementById('next-section');
    if (next) {
      next.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero} aria-label="Portfolio Hero">
      {/* ── Ambient blurred BG video ── */}
      <div className={styles.ambientBg} aria-hidden="true">
        <video
          ref={bgVideoRef}
          className={styles.bgVideo}
          src="/video/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        <div className={styles.ambientBlur} />
      </div>

      {/* ── Foreground video ── */}
      <div className={styles.fgVideoWrapper} aria-hidden="true">
        <video
          ref={fgVideoRef}
          className={styles.fgVideo}
          src="/video/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        {/* Cinematic vignette on the fg video */}
        <div className={styles.fgVignette} />
      </div>

      {/* ── Gradient overlays for text readability ── */}
      <div className={styles.gradientLeft}   aria-hidden="true" />
      <div className={styles.gradientBottom} aria-hidden="true" />
      <div className={styles.gradientTop}    aria-hidden="true" />

      {/* ── Noise film grain texture ── */}
      <div className={styles.grain} aria-hidden="true" />

      {/* ── Main content ── */}
      <div ref={contentRef} className={styles.content}>
        {/* Tagline */}
        <p ref={taglineRef} className={styles.tagline}>
          <span className={styles.taglineDot} />
          Open to Opportunities
          <span className={styles.taglineDot} />
        </p>

        {/* Name */}
        <h1 className={styles.nameBlock} aria-label="Sai Kiran">
          <span ref={firstNameRef} className={styles.firstName}>Sai</span>
          <span ref={lastNameRef} className={styles.lastName}>Kiran</span>
        </h1>

        {/* Role */}
        <p ref={roleRef} className={styles.role}>
          <span className={styles.roleInner}>AI &amp; ML Developer</span>
          <span className={styles.roleSeparator}>·</span>
          <span className={styles.roleInner}>Building Intelligent Systems</span>
        </p>

        {/* Controls */}
        <div ref={controlsRef} className={styles.controls}>
          <button
            className={styles.controlBtn}
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              /* Pause icon */
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              /* Play icon */
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            )}
            <span className={styles.btnLabel}>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            className={styles.controlBtn}
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              /* Muted icon */
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              /* Sound icon */
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" stroke="none" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
            <span className={styles.btnLabel}>{isMuted ? 'Unmute' : 'Mute'}</span>
          </button>
        </div>
      </div>

      {/* ── Sound hint badge ── */}
      {showSoundHint && (
        <div ref={soundHintRef} className={styles.soundHint} aria-hidden="true">
          <span className={styles.soundHintPulse} />
          Tap for sound
        </div>
      )}

      {/* ── Scroll indicator ── */}
      <button
        ref={scrollIndicatorRef}
        className={styles.scrollIndicator}
        onClick={scrollToNext}
        aria-label="Scroll to next section"
      >
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollPulse} />
        </div>
      </button>
    </section>
  );
}
