'use client';

import { useMagnetic } from '@/hooks/useMagnetic';

interface MagneticWrapperProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default function MagneticWrapper({
  children,
  style,
  className,
}: MagneticWrapperProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic();

  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transition: 'transform .15s', ...style }}
      className={className}
    >
      {children}
    </span>
  );
}
