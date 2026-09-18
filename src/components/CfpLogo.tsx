import React from 'react';

interface CfpLogoProps {
  className?: string;
  size?: number;
}

export const CfpLogo: React.FC<CfpLogoProps> = ({ className = '', size = 44 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="Logo CFP 651 Puerto Madryn"
    >
      {/* Outer dark ring */}
      <circle cx="100" cy="100" r="95" stroke="#1E293B" strokeWidth="9" fill="#FFFFFF" />
      
      {/* Middle white spacer gap is natural */}
      {/* Inner red ring */}
      <circle cx="100" cy="100" r="82" stroke="#B71322" strokeWidth="9" fill="none" />
      
      {/* Inner white background */}
      <circle cx="100" cy="100" r="74" fill="#FFFFFF" />
      
      {/* Text "CFP" */}
      <text
        x="100"
        y="93"
        textAnchor="middle"
        fill="#111827"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 900,
          fontSize: '48px',
          letterSpacing: '-0.04em',
        }}
      >
        CFP
      </text>
      
      {/* Text "651" */}
      <text
        x="100"
        y="142"
        textAnchor="middle"
        fill="#111827"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 900,
          fontSize: '48px',
          letterSpacing: '-0.03em',
        }}
      >
        651
      </text>
    </svg>
  );
};
