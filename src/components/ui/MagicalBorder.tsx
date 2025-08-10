'use client' // SVGs are best as client components if they have any interactivity, good practice

const MagicalBorder = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="80"
    height="80"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M100 1.5 H 25 C 12.01 1.5 1.5 12.01 1.5 25 V 100" stroke="currentColor" strokeWidth="3" />
    <circle cx="25" cy="25" r="6" stroke="currentColor" strokeWidth="3" />
    <path d="M25 40 L25 80" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
    <path d="M40 25 L80 25" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
  </svg>
);

export default MagicalBorder;
