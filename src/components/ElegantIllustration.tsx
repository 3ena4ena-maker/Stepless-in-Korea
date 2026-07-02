import React from 'react';

interface IllustrationProps {
  type: 'temple' | 'park' | 'food' | 'cafe' | 'sea' | 'transit' | 'village' | 'history' | 'culture' | 'default';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export default function ElegantIllustration({ type, className = '', size = 'md' }: IllustrationProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    hero: 'w-32 h-32 sm:w-40 sm:h-40',
  };

  const selectedSize = sizeClasses[size];

  // Modern design colors matching our sophisticated travel theme
  const strokeColor = 'currentColor';

  switch (type) {
    case 'temple':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${selectedSize} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Platform */}
          <path d="M10 85 H90" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
          <path d="M18 80 H82" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          
          {/* Supporting Pillars */}
          <line x1="30" y1="52" x2="30" y2="80" stroke={strokeColor} strokeWidth="3" />
          <line x1="42" y1="52" x2="42" y2="80" stroke={strokeColor} strokeWidth="3" />
          <line x1="58" y1="52" x2="58" y2="80" stroke={strokeColor} strokeWidth="3" />
          <line x1="70" y1="52" x2="70" y2="80" stroke={strokeColor} strokeWidth="3" />
          
          {/* Traditional Curved Roof Layer 1 */}
          <path
            d="M20 52 C20 52 35 48 50 48 C65 48 80 52 80 52"
            stroke={strokeColor}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M24 48 L24 43 H76 L76 48"
            stroke={strokeColor}
            strokeWidth="1.5"
          />

          {/* Majestic Main Curved Hanok Roof Top */}
          <path
            d="M5 40 C15 36 30 30 50 30 C70 30 85 36 95 40"
            stroke={strokeColor}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M10 38 L15 15 C30 18 40 18 50 18 C60 18 70 18 85 15 L90 38"
            stroke={strokeColor}
            strokeWidth="1"
            strokeDasharray="2 3"
            opacity="0.6"
          />
          
          {/* Ornamental Central Peak */}
          <path d="M50 15 V30" stroke={strokeColor} strokeWidth="2.5" />
          <circle cx="50" cy="12" r="3" fill={strokeColor} />
        </svg>
      );

    case 'park':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${selectedSize} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized Bamboo / Pine trees */}
          <path
            d="M20 85 V30 C20 30 25 22 35 25"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="M15 50 Q20 45 28 52" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 38 Q25 35 32 40" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Second Tree */}
          <path
            d="M45 85 V15 C45 15 52 8 62 10"
            stroke={strokeColor}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path d="M37 40 Q45 35 55 42" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          <path d="M45 28 Q52 22 62 30" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          <path d="M45 55 Q35 50 38 62" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />

          {/* Elegant Floating Leaf */}
          <path
            d="M72 50 C62 55 60 70 80 80 C82 65 82 55 72 50 Z"
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M68 68 L76 60" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />

          {/* Ground Contours */}
          <path d="M5 85 C30 82 70 88 95 85" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'food':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${selectedSize} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Table/Plate Outline */}
          <circle cx="50" cy="50" r="38" stroke={strokeColor} strokeWidth="2" strokeDasharray="3 3" opacity="0.5" />
          <circle cx="50" cy="50" r="30" stroke={strokeColor} strokeWidth="3" />
          <circle cx="50" cy="50" r="22" stroke={strokeColor} strokeWidth="1" opacity="0.8" />
          
          {/* Gourmet Content Details */}
          <circle cx="42" cy="45" r="5" stroke={strokeColor} strokeWidth="2" />
          <circle cx="58" cy="42" r="4" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="50" cy="58" r="6" stroke={strokeColor} strokeWidth="2.5" />

          {/* Sleek Chopsticks */}
          <line x1="22" y1="18" x2="78" y2="82" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="15" y1="22" x2="72" y2="88" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" opacity="0.9" />

          {/* Aromatic Steaming Waves */}
          <path d="M42 12 Q45 8 48 12 T54 12" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M48 8 Q51 4 54 8 T60 8" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'cafe':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${selectedSize} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Modern Coffee Cup / Mug */}
          <path
            d="M25 35 C25 35 25 75 50 75 C75 75 75 35 75 35 Z"
            stroke={strokeColor}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Mug Handle */}
          <path
            d="M75 42 C84 42 88 50 88 55 C88 62 82 65 75 65"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Minimal Plate/Saucer */}
          <path d="M15 82 H85" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
          
          {/* Rising Steam Lines */}
          <path d="M38 25 C40 18 43 18 45 12" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          <path d="M50 25 C52 15 55 15 57 8" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          <path d="M62 25 C64 18 67 18 69 12" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'sea':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${selectedSize} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Minimalist Geometric Sun */}
          <circle cx="50" cy="40" r="18" stroke={strokeColor} strokeWidth="3" />
          
          {/* Horizon Line */}
          <line x1="10" y1="58" x2="90" y2="58" stroke={strokeColor} strokeWidth="2.5" />
          
          {/* Elegant Ocean Waves */}
          <path
            d="M15 68 C25 65 35 71 50 68 C65 65 75 71 85 68"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M10 78 C20 75 30 81 45 78 C60 75 70 81 80 78 C85 76.5 90 78 90 78"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Seagulls / Birds */}
          <path d="M28 22 Q32 18 36 22 Q40 18 44 22" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M66 18 Q69 15 72 18 Q75 15 78 18" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" opacity="0.7" />
        </svg>
      );

    case 'transit':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${selectedSize} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Track/Rail */}
          <line x1="10" y1="75" x2="90" y2="75" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="15" y1="80" x2="85" y2="80" stroke={strokeColor} strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />

          {/* Minimal Coastal Train/Monorail Silhouette */}
          <rect x="20" y="38" width="52" height="28" rx="5" stroke={strokeColor} strokeWidth="3.5" />
          {/* Train Front/Nose Slope */}
          <path d="M72 38 L84 56 C85 58 84 66 81 66 H72" stroke={strokeColor} strokeWidth="3.5" strokeLinejoin="round" />
          
          {/* Windows */}
          <rect x="26" y="44" width="10" height="8" rx="1.5" stroke={strokeColor} strokeWidth="2" />
          <rect x="40" y="44" width="10" height="8" rx="1.5" stroke={strokeColor} strokeWidth="2" />
          <rect x="54" y="44" width="10" height="8" rx="1.5" stroke={strokeColor} strokeWidth="2" />
          <path d="M68 44 H74 L78 54 H68 Z" stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />

          {/* Under-wheels */}
          <circle cx="32" cy="70" r="4" stroke={strokeColor} strokeWidth="2.5" fill="white" />
          <circle cx="62" cy="70" r="4" stroke={strokeColor} strokeWidth="2.5" fill="white" />
          <line x1="45" y1="52" x2="50" y2="52" stroke={strokeColor} strokeWidth="1.5" />
        </svg>
      );

    case 'village':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${selectedSize} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Slope Line */}
          <path d="M10 80 L90 50" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          
          {/* Stacked Lego Houses / Gamcheon Alleys */}
          {/* House 1 (Left Lower) */}
          <rect x="18" y="55" width="20" height="18" stroke={strokeColor} strokeWidth="3" strokeLinejoin="round" fill="white" />
          <path d="M15 55 L28 44 L41 55 Z" stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="25" y="63" width="6" height="10" stroke={strokeColor} strokeWidth="1.5" />

          {/* House 2 (Center) */}
          <rect x="44" y="38" width="18" height="20" stroke={strokeColor} strokeWidth="3" strokeLinejoin="round" fill="white" />
          <path d="M41 38 L53 28 L65 38 Z" stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="49" y="44" width="8" height="6" stroke={strokeColor} strokeWidth="1.5" />

          {/* House 3 (Right Higher) */}
          <rect x="68" y="28" width="16" height="16" stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" fill="white" />
          <path d="M65 28 L76 18 L87 28 Z" stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />

          {/* Minimalist Clouds / Sparkles */}
          <path d="M12 25 C15 22 22 22 25 25" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          <path d="M78 12 C80 10 84 10 86 12" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case 'history':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${selectedSize} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Minimal Scroll / Document outline */}
          <path
            d="M30 20 H70 C75 20 78 25 78 30 V70 C78 75 75 80 70 80 H30 C25 80 22 75 22 70 V30 C22 25 25 20 30 20 Z"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Scroll scroll-ends decorative curves */}
          <path d="M22 26 C22 26 28 28 30 25 C32 22 30 18 24 18" stroke={strokeColor} strokeWidth="2" />
          <path d="M78 74 C78 74 72 72 70 75 C68 78 70 82 76 82" stroke={strokeColor} strokeWidth="2" />

          {/* Dynamic History Lines */}
          <line x1="34" y1="38" x2="66" y2="38" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          <line x1="34" y1="50" x2="66" y2="50" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          <line x1="34" y1="62" x2="54" y2="62" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />

          {/* Minimal Seal/Stamp in bottom right */}
          <rect x="58" y="58" width="10" height="10" rx="1" stroke={strokeColor} strokeWidth="2.5" />
          <circle cx="63" cy="63" r="1.5" fill={strokeColor} />
        </svg>
      );

    case 'culture':
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${selectedSize} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Minimal Modern Art Frame */}
          <rect x="15" y="15" width="70" height="70" rx="4" stroke={strokeColor} strokeWidth="3" />
          <rect x="22" y="22" width="56" height="56" rx="2" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

          {/* Stylized Modern Sculpture / Geometric Art Inside */}
          <circle cx="50" cy="45" r="12" stroke={strokeColor} strokeWidth="2.5" />
          <path d="M35 70 L50 45 L65 70 Z" stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />
          
          {/* Dynamic Light Sparkle */}
          <path d="M28 28 L32 32 M32 28 L28 32" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <svg
          viewBox="0 0 100 100"
          className={`${selectedSize} ${className}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Minimalist Compass/Radar Globe */}
          <circle cx="50" cy="50" r="35" stroke={strokeColor} strokeWidth="3" />
          <circle cx="50" cy="50" r="18" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
          
          {/* Compass Arrows */}
          <path d="M50 15 L54 38 H46 Z" stroke={strokeColor} strokeWidth="2" fill={strokeColor} />
          <path d="M50 85 L54 62 H46 Z" stroke={strokeColor} strokeWidth="1" opacity="0.5" />
          <path d="M85 50 L62 54 V46 Z" stroke={strokeColor} strokeWidth="1" opacity="0.5" />
          <path d="M15 50 L38 54 V46 Z" stroke={strokeColor} strokeWidth="1" opacity="0.5" />

          {/* Central Core Pin */}
          <circle cx="50" cy="50" r="3.5" fill={strokeColor} />
        </svg>
      );
  }
}
