import { useState } from 'react';
import { CarFront } from 'lucide-react';

interface ShowroomImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  fallbackTitle?: string;
  priority?: boolean;
}

export function ShowroomImage({
  src,
  alt,
  className = '',
  aspectClass = '',
  fallbackTitle,
  priority = false,
}: ShowroomImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#131b2e] via-[#1c253d] to-[#0b0f19] text-white ${aspectClass} ${className}`}
        role="img"
        aria-label={alt}
      >
        <CarFront className="h-10 w-10 text-[#dc2c4f] opacity-85" strokeWidth={1.5} />
        {fallbackTitle && (
          <span className="mt-3 px-4 text-center font-display text-sm font-semibold tracking-tight text-white/90">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
      className={`${aspectClass} ${className}`}
    />
  );
}
