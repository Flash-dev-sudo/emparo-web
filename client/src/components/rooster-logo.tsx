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
      {/* Flame-like rooster silhouette inspired by Emparo's logo */}
      <path
        d="M50 10C55 8 60 12 62 18C64 15 68 16 70 20C72 18 76 20 78 25C80 22 84 25 85 30C82 35 85 40 82 45C78 50 80 55 75 60C70 65 72 70 65 75C60 80 55 75 50 80C45 75 40 80 35 75C28 70 30 65 25 60C20 55 22 50 18 45C15 40 18 35 15 30C16 25 20 22 22 25C24 20 28 18 30 20C32 16 36 15 38 18C40 12 45 8 50 10Z"
        fill="currentColor"
        opacity="0.9"
      />
      
      {/* Inner flame details */}
      <path
        d="M50 20C52 18 55 22 57 25C59 22 62 24 64 28C66 25 69 28 70 32C67 36 69 40 66 44C62 48 64 52 59 56C54 60 56 64 50 68C44 64 46 60 41 56C36 52 38 48 34 44C31 40 33 36 30 32C31 28 34 25 36 28C38 24 41 22 43 25C45 22 48 18 50 20Z"
        fill="currentColor"
        opacity="0.7"
      />
      
      {/* Center flame */}
      <path
        d="M50 30C51 28 53 30 54 32C55 30 57 31 58 34C59 32 61 34 62 36C60 38 61 40 59 42C57 44 58 46 55 48C52 50 53 52 50 54C47 52 48 50 45 48C42 46 43 44 41 42C39 40 40 38 38 36C39 34 41 32 42 34C43 31 45 30 46 32C47 30 49 28 50 30Z"
        fill="currentColor"
        opacity="0.5"
      />
      
      {/* Rooster eye */}
      <circle cx="58" cy="35" r="2" fill="white" opacity="0.8" />
      <circle cx="58" cy="35" r="1" fill="currentColor" />
      
      {/* Subtle beak indication */}
      <path
        d="M65 38L68 36L67 40Z"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}