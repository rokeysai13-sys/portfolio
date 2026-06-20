'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Loader.module.css';

interface LoaderProps {
  onEnter: () => void;
}

export default function Loader({ onEnter }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const line1Ref  = useRef<HTMLDivElement>(null);
  const line2Ref  = useRef<HTMLDivElement>(null);
  const btnRef    = useRef<HTMLButtonElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(line1Ref.current,
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1, ease: 'power4.out' }
    )
    .fromTo(line2Ref.current,
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1, ease: 'power4.out' },
      '-=0.75'
    )
    .fromTo(btnRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.3'
    );
  }, []);

  const handleEnter = () => {
    if (onEnter) onEnter();
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.9,
      ease: 'power2.inOut',
      onComplete: () => setHidden(true),
    });
  };

  if (hidden) return null;

  return (
    <div ref={overlayRef} className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.nameWrap}>
          <div className={styles.nameClip}>
            <div ref={line1Ref} className={styles.nameLine1}>SAI KIRAN</div>
          </div>
          <div className={styles.nameClip}>
            <div ref={line2Ref} className={styles.nameLine2}>PUTTA V.V.</div>
          </div>
        </div>
        <button ref={btnRef} className={styles.btn} onClick={handleEnter}>
          ENTER PORTFOLIO
        </button>
      </div>
      <div className={styles.corner}>AI ENGINEER · ML DEVELOPER</div>
    </div>
  );
}
