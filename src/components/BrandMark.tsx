interface BrandMarkProps {
  variant?: 'blue' | 'cream';
  className?: string;
}

export function BrandMark({ variant = 'blue', className = 'w-8 h-8' }: BrandMarkProps) {
  const isBlue = variant === 'blue';
  const primary = isBlue ? '#1438B8' : '#FAF6EE';
  const accent = isBlue ? '#2563EB' : '#93C5FD';
  const innerCut = isBlue ? '#FAF6EE' : '#091B5C';

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer studio aperture frame */}
      <rect x="3" y="3" width="34" height="34" rx="9" fill={primary} />
      {/* Interlocking pixel-nest geometry */}
      <rect x="10" y="10" width="9" height="9" rx="2.5" fill={innerCut} />
      <rect x="21" y="10" width="9" height="9" rx="2.5" fill={accent} />
      <rect x="10" y="21" width="9" height="9" rx="2.5" fill={accent} opacity="0.65" />
      <path
        d="M21 21H27.5C28.8807 21 30 22.1193 30 23.5V27.5C30 28.8807 28.8807 30 27.5 30H23.5C22.1193 30 21 28.8807 21 27.5V21Z"
        fill={innerCut}
      />
    </svg>
  );
}
