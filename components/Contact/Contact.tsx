'use client';

import { useEffect, useRef } from 'react';
import styles from './Contact.module.css';

interface ContactProps {
  isEntered: boolean;
}

export default function Contact({ isEntered }: ContactProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isEntered && videoRef.current) {
      videoRef.current.play().catch(e => console.error('Contact video play failed:', e));
    }
  }, [isEntered]);

  return (
    <section id="contact" className={styles.section}>
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

      {/* Watermark */}
      <div className={styles.watermark} aria-hidden="true">SAI KIRAN</div>

      {/* Grid */}
      <div className={styles.grid}>
        {/* Left */}
        <div className={styles.leftCol}>
          <div className={styles.greeting}>
            <span className={styles.dot} />
            AVAILABLE NOW
          </div>

          <div className={styles.socials}>
            <a href="https://github.com/rokeysai13-sys" target="_blank" rel="noopener noreferrer" className={styles.socialItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GITHUB
            </a>
            <span className={styles.sep}>|</span>
            <a href="https://www.linkedin.com/in/sai-kiran-putta-v-v-421497310" target="_blank" rel="noopener noreferrer" className={styles.socialItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LINKEDIN
            </a>
          </div>

          <a href="mailto:rokeysai13@gmail.com" className={styles.emailLink}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            rokeysai13@gmail.com
          </a>
        </div>

        {/* Right */}
        <div className={styles.rightCol}>
          <p className={styles.availLabel}>
            OPEN FOR FREELANCE, COLLABORATION &amp; FULL-TIME ROLES
          </p>
          <div className={styles.tagline}>
            <span className={styles.taglineWhite}>BUILDING AI THAT</span>
            <span className={styles.taglineWhite}>CHANGES</span>
            <span className={styles.taglineOrange}>EVERYTHING.</span>
          </div>
          <a href="mailto:rokeysai13@gmail.com" className={styles.ctaBtn}>
            LET&apos;S CONNECT
          </a>
        </div>
      </div>

      {/* Footer bar */}
      <div className={styles.footerBar}>
        <div className={styles.footerLeft}>
          <span className={styles.avatar}>SK</span>
          <div>
            <p className={styles.footerName}>© 2025 SAI KIRAN PUTTA V.V.</p>
            <p className={styles.footerSub}>ALL RIGHTS RESERVED</p>
          </div>
        </div>
        <p className={styles.footerRight}>DESIGNED &amp; DEVELOPED WITH PRECISION.</p>
      </div>
    </section>
  );
}
