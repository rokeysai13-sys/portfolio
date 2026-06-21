import React from 'react';
import styles from './Marquee.module.css';

interface MarqueeProps {
  items: string[];
  speed?: number; // duration of animation in seconds
  className?: string;
}

export default function Marquee({ items, speed = 20, className = '' }: MarqueeProps) {
  return (
    <div className={`${styles.marqueeContainer} ${className}`}>
      <div className={styles.marqueeTrack} style={{ animationDuration: `${speed}s` }}>
        {items.map((item, i) => (
          <span key={`t1-${i}`} className={styles.marqueeItem}>
            {item}
            <span className={styles.marqueeDot}>·</span>
          </span>
        ))}
      </div>
      <div className={styles.marqueeTrack} style={{ animationDuration: `${speed}s` }} aria-hidden="true">
        {items.map((item, i) => (
          <span key={`t2-${i}`} className={styles.marqueeItem}>
            {item}
            <span className={styles.marqueeDot}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
