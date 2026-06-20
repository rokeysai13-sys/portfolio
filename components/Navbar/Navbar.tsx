'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'HOME',       href: '#home' },
  { label: 'ABOUT',      href: '#about' },
  { label: 'WORK',       href: '#work' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'CONTACT',    href: '#contact' },
];

export default function Navbar() {
  const [time, setTime] = useState('');
  const [isLight, setIsLight] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Live IST clock
  useEffect(() => {
    const tick = () => {
      const now = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(now);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Detect light (about) section for nav color switch
  useEffect(() => {
    const about = document.getElementById('about');
    if (!about) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsLight(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(about);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav ref={navRef} className={`${styles.nav} ${isLight ? styles.light : ''}`}>
      {/* Left: clock */}
      <div className={styles.clock}>
        IST&nbsp;—&nbsp;{time}
      </div>

      {/* Center: links */}
      <ul className={styles.links}>
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <button className={styles.link} onClick={() => scrollTo(href)}>
              {label}
            </button>
          </li>
        ))}
      </ul>

      {/* Right: CTA */}
      <a
        href="mailto:rokeysai13@gmail.com"
        className={styles.emailBtn}
        aria-label="Send email"
      >
        Email me
      </a>
    </nav>
  );
}
