import React, { useId } from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  subtitle?: string;
  className?: string;
  badgeOnly?: boolean;
}

const sizeConfig = {
  sm: {
    icon: "h-8 w-8",
    text: "text-base",
    sub: "text-[10px]",
    radius: "rounded-xl",
    innerRadius: "rounded-[10px]",
    padding: "p-1",
  },
  md: {
    icon: "h-10 w-10 sm:h-11 sm:w-11",
    text: "text-lg sm:text-xl",
    sub: "text-xs",
    radius: "rounded-2xl",
    innerRadius: "rounded-[14px]",
    padding: "p-1.5",
  },
  lg: {
    icon: "h-12 w-12 sm:h-13 sm:w-13",
    text: "text-xl sm:text-2xl",
    sub: "text-xs sm:text-sm",
    radius: "rounded-2xl",
    innerRadius: "rounded-[14px]",
    padding: "p-1.5",
  },
  xl: {
    icon: "h-14 w-14 sm:h-16 sm:w-16",
    text: "text-2xl sm:text-3xl",
    sub: "text-sm",
    radius: "rounded-2xl",
    innerRadius: "rounded-[14px]",
    padding: "p-2",
  },
};

export function Logo({
  size = "md",
  showText = false,
  subtitle,
  className = "",
  badgeOnly = false,
}: LogoProps) {
  const cfg = sizeConfig[size] || sizeConfig.md;
  const rawId = useId();
  // Sanitasi ID agar valid untuk selector SVG url(#...)
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, "");
  const mainGradId = `dl-grad-main-${safeId}`;
  const accentGradId = `dl-grad-accent-${safeId}`;

  const renderSvg = () => (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full block overflow-visible"
    >
      <defs>
        <linearGradient
          id={mainGradId}
          x1="6"
          y1="6"
          x2="42"
          y2="42"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="45%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient
          id={accentGradId}
          x1="12"
          y1="36"
          x2="36"
          y2="12"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>

      {/* D Backbone (Supply chain spine) */}
      <path
        d="M 14 11 L 14 37"
        stroke={`url(#${mainGradId})`}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* D Outer Arch Loop (Distribution Link Curve) */}
      <path
        d="M 14 11 C 27 11, 37 16, 37 24 C 37 32, 27 37, 14 37"
        stroke={`url(#${mainGradId})`}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Top Node Hub */}
      <circle
        cx="14"
        cy="11"
        r="4.5"
        fill="#0c121e"
        stroke="#38bdf8"
        strokeWidth="2.5"
      />
      <circle cx="14" cy="11" r="2" fill="#38bdf8" />

      {/* Bottom Node Hub */}
      <circle
        cx="14"
        cy="37"
        r="4.5"
        fill="#0c121e"
        stroke="#38bdf8"
        strokeWidth="2.5"
      />
      <circle cx="14" cy="37" r="2" fill="#38bdf8" />

      {/* Dynamic Ascending Arrow (Growth & Target Achievement) */}
      <path
        d="M 21 27 L 31 17 M 31 17 H 24 M 31 17 V 24"
        stroke="#ffffff"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Distribution Node on Curve */}
      <circle
        cx="36.5"
        cy="24"
        r="3"
        fill="#38bdf8"
      />
    </svg>
  );

  // Jika hanya menampilkan badge/ikon
  if (badgeOnly || !showText) {
    return (
      <div
        className={`relative flex items-center justify-center shrink-0 ${cfg.radius} bg-linear-to-br from-blue-600 via-indigo-600 to-sky-500 p-0.5 shadow-md shadow-blue-500/25 ${cfg.icon} ${className}`}
      >
        <div
          className={`flex h-full w-full items-center justify-center ${cfg.innerRadius} bg-[#0c121e] ${cfg.padding} backdrop-blur-xs transition-colors`}
        >
          {renderSvg()}
        </div>
      </div>
    );
  }

  // Jika menampilkan logo lengkap (Ikon + Teks sejajar sempurna)
  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      {/* Icon Badge - isolated from external margin-bottom */}
      <div
        className={`relative flex items-center justify-center shrink-0 ${cfg.radius} bg-linear-to-br from-blue-600 via-indigo-600 to-sky-500 p-0.5 shadow-md shadow-blue-500/25 ${cfg.icon}`}
      >
        <div
          className={`flex h-full w-full items-center justify-center ${cfg.innerRadius} bg-[#0c121e] ${cfg.padding} backdrop-blur-xs transition-colors`}
        >
          {renderSvg()}
        </div>
      </div>

      {/* Typography Lockup perfectly centered vertically */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-extrabold tracking-tight text-slate-900 dark:text-white ${cfg.text}`}
          >
            Distrilink
          </span>
          <span
            className={`font-black tracking-wider text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-cyan-300 ${cfg.text}`}
          >
            SAP
          </span>
        </div>
        {subtitle && (
          <span
            className={`font-medium text-slate-500 dark:text-slate-400 mt-1.5 leading-none ${cfg.sub}`}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
