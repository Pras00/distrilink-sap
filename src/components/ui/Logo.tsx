import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  subtitle?: string;
  className?: string;
  badgeOnly?: boolean;
}

const sizeConfig = {
  sm: { icon: "h-8 w-8", text: "text-base", sub: "text-[10px]" },
  md: { icon: "h-10 w-10 sm:h-11 sm:w-11", text: "text-lg sm:text-xl", sub: "text-xs" },
  lg: { icon: "h-12 w-12", text: "text-xl", sub: "text-xs" },
  xl: { icon: "h-16 w-16", text: "text-2xl", sub: "text-sm" },
};

export function Logo({
  size = "md",
  showText = false,
  subtitle,
  className = "",
  badgeOnly = false,
}: LogoProps) {
  const cfg = sizeConfig[size] || sizeConfig.md;

  const IconElement = (
    <div
      className={`relative flex items-center justify-center shrink-0 rounded-2xl bg-linear-to-br from-blue-600 via-indigo-600 to-sky-500 p-0.5 shadow-md shadow-blue-500/20 ${cfg.icon} ${className}`}
    >
      {/* Inner dark container for high-contrast crisp rendering */}
      <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#0c121e] p-1.5 backdrop-blur-xs transition-colors">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="dl-gradient-main" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="dl-gradient-accent" x1="12" y1="36" x2="36" y2="12" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
            <filter id="dl-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#38bdf8" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* D Backbone (Supply chain spine) */}
          <path
            d="M 14 10 L 14 38"
            stroke="url(#dl-gradient-main)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* D Outer Arch Loop (Distribution Link Curve) */}
          <path
            d="M 14 10 C 26 10, 36 15, 36 24 C 36 33, 26 38, 14 38"
            stroke="url(#dl-gradient-main)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Top Node Hub */}
          <circle
            cx="14"
            cy="11"
            r="4"
            fill="#0c121e"
            stroke="url(#dl-gradient-accent)"
            strokeWidth="2.5"
            filter="url(#dl-glow)"
          />
          <circle cx="14" cy="11" r="1.6" fill="#38bdf8" />

          {/* Bottom Node Hub */}
          <circle
            cx="14"
            cy="37"
            r="4"
            fill="#0c121e"
            stroke="url(#dl-gradient-accent)"
            strokeWidth="2.5"
            filter="url(#dl-glow)"
          />
          <circle cx="14" cy="37" r="1.6" fill="#38bdf8" />

          {/* Dynamic Ascending Arrow (Growth & Target Achievement) */}
          <path
            d="M 21 27 L 31 17 M 31 17 H 24 M 31 17 V 24"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#dl-glow)"
          />

          {/* Distribution Node on Curve */}
          <circle
            cx="35.5"
            cy="23"
            r="3"
            fill="#38bdf8"
            filter="url(#dl-glow)"
          />
        </svg>
      </div>
    </div>
  );

  if (badgeOnly || !showText) {
    return IconElement;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {IconElement}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-tight">
          <span className={`font-extrabold tracking-tight text-slate-900 dark:text-white ${cfg.text}`}>
            Distrilink
          </span>
          <span className={`font-black tracking-wider text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-cyan-300 ${cfg.text}`}>
            SAP
          </span>
        </div>
        {subtitle && (
          <span className={`font-medium text-slate-500 dark:text-slate-400 -mt-0.5 ${cfg.sub}`}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
