interface RoosterLogoProps {
  className?: string;
  size?: number;
}

export default function RoosterLogo({ className = "", size = 24 }: RoosterLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rooster Head */}
      <path
        d="M35 25C35 20 40 15 50 15C60 15 65 20 65 25C65 30 60 35 50 35C40 35 35 30 35 25Z"
        fill="currentColor"
      />
      
      {/* Comb */}
      <path
        d="M45 10C45 8 47 6 50 6C53 6 55 8 55 10L52 15L50 12L48 15L45 10Z"
        fill="#DC2626"
      />
      
      {/* Beak */}
      <path
        d="M65 25L75 22L72 28L65 30Z"
        fill="#F59E0B"
      />
      
      {/* Wattle */}
      <path
        d="M50 35C48 35 46 37 46 39C46 41 48 43 50 43C52 43 54 41 54 39C54 37 52 35 50 35Z"
        fill="#DC2626"
      />
      
      {/* Body */}
      <ellipse
        cx="50"
        cy="55"
        rx="20"
        ry="25"
        fill="currentColor"
      />
      
      {/* Wing */}
      <path
        d="M30 45C25 45 20 50 20 55C20 65 25 70 35 70C40 70 45 65 45 60C45 50 40 45 30 45Z"
        fill="currentColor"
        opacity="0.8"
      />
      
      {/* Tail Feathers */}
      <path
        d="M70 40C75 35 85 35 90 40C95 45 95 55 90 60C85 65 75 65 70 60C65 55 65 45 70 40Z"
        fill="currentColor"
        opacity="0.9"
      />
      
      {/* Legs */}
      <rect x="42" y="75" width="3" height="15" fill="#F59E0B" />
      <rect x="55" y="75" width="3" height="15" fill="#F59E0B" />
      
      {/* Feet */}
      <path
        d="M40 90L47 90L45 95L42 95Z"
        fill="#F59E0B"
      />
      <path
        d="M53 90L60 90L58 95L55 95Z"
        fill="#F59E0B"
      />
      
      {/* Eye */}
      <circle cx="55" cy="25" r="2" fill="white" />
      <circle cx="56" cy="25" r="1" fill="black" />
    </svg>
  );
}