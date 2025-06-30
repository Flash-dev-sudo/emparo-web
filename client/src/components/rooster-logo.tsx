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
      {/* Simplified rooster silhouette inspired by Emparo logo */}
      <path
        d="M25 80C20 75 18 65 22 58C26 50 35 45 42 40C48 35 52 25 58 20C62 16 68 15 72 18C75 22 78 28 80 35C82 42 80 48 76 52C72 56 66 58 60 60C58 62 56 65 52 68C48 72 45 77 42 82C40 86 37 88 33 87C30 86 28 83 26 80ZM60 25C65 20 70 22 72 28C74 34 72 40 68 44C64 48 58 50 52 48C48 46 46 42 48 38C50 34 55 30 60 25Z"
        fill="currentColor"
      />
      
      {/* Flame-like tail feathers */}
      <path
        d="M75 35C78 30 82 28 86 32C88 36 87 42 84 46C81 50 76 52 72 50C70 48 70 44 72 40C74 36 75 35 75 35Z"
        fill="currentColor"
        opacity="0.8"
      />
      
      {/* Body detail */}
      <path
        d="M35 60C40 55 46 52 52 55C56 58 58 63 55 68C52 72 46 74 40 72C36 70 34 65 35 60Z"
        fill="currentColor"
        opacity="0.7"
      />
      
      {/* Eye */}
      <circle cx="62" cy="35" r="2" fill="white" />
      <circle cx="62" cy="35" r="1" fill="currentColor" />
      
      {/* Beak */}
      <path
        d="M70 36L75 34L73 39L70 40Z"
        fill="#F59E0B"
      />
    </svg>
  );
}