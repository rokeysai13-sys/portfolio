import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'glass';
  tone?: 'accent' | 'neutral' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Badge({
  children,
  variant = 'glass',
  tone = 'neutral',
  size = 'md',
  className = '',
}: BadgeProps) {
  const badgeClass = [
    styles.badge,
    styles[`variant-${variant}`],
    styles[`tone-${tone}`],
    styles[`size-${size}`],
    className,
  ].filter(Boolean).join(' ');

  return <span className={badgeClass}>{children}</span>;
}
