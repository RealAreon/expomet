import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ShapePreviewProps = {
  shapeKey: string;
  className?: string;
};

function SvgFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 140"
      className={cn("w-full max-w-[220px] text-copper", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function ShapePreview({ shapeKey, className }: ShapePreviewProps) {
  if (shapeKey === "list") {
    return (
      <svg viewBox="0 0 180 120" className={cn("w-full max-w-[220px] text-copper", className)} aria-hidden>
        <rect x="30" y="28" width="120" height="64" rx="2" fill="#1a1510" stroke="currentColor" />
        <path d="M30 28 L150 28 L138 18 L18 18 Z" fill="#c77a45" opacity="0.85" />
        <text x="90" y="108" textAnchor="middle" fill="#8f99a3" fontSize="11">
          t · a · b
        </text>
      </svg>
    );
  }

  return (
    <SvgFrame className={className}>
      {shapeKey === "square" && (
        <>
          <rect x="55" y="25" width="90" height="90" rx="2" />
          <text x="100" y="74" textAnchor="middle" fill="currentColor" stroke="none" fontSize="14">
            a
          </text>
        </>
      )}
      {shapeKey === "circle" && (
        <>
          <circle cx="100" cy="70" r="46" />
          <line x1="100" y1="70" x2="146" y2="70" />
          <text x="128" y="64" fill="currentColor" stroke="none" fontSize="12">
            D
          </text>
        </>
      )}
      {shapeKey === "ribbon" && (
        <>
          <rect x="40" y="35" width="120" height="70" rx="2" />
          <text x="100" y="64" textAnchor="middle" fill="currentColor" stroke="none" fontSize="12">
            a
          </text>
          <text x="168" y="74" fill="currentColor" stroke="none" fontSize="12">
            t
          </text>
        </>
      )}
      {shapeKey === "pipeCircle" && (
        <>
          <circle cx="100" cy="70" r="48" />
          <circle cx="100" cy="70" r="28" />
          <line x1="100" y1="70" x2="148" y2="70" />
          <text x="130" y="64" fill="currentColor" stroke="none" fontSize="12">
            D
          </text>
          <text x="108" y="92" fill="currentColor" stroke="none" fontSize="12">
            t
          </text>
        </>
      )}
      {shapeKey === "pipeProf" && (
        <>
          <rect x="50" y="30" width="100" height="80" rx="4" />
          <rect x="66" y="46" width="68" height="48" rx="2" />
          <text x="100" y="24" textAnchor="middle" fill="currentColor" stroke="none" fontSize="12">
            a
          </text>
          <text x="160" y="74" fill="currentColor" stroke="none" fontSize="12">
            b
          </text>
        </>
      )}
      {shapeKey === "corner" && (
        <>
          <path d="M50 30h28v56h56v28H50V30z" />
          <text x="58" y="24" fill="currentColor" stroke="none" fontSize="12">
            a
          </text>
          <text x="142" y="124" fill="currentColor" stroke="none" fontSize="12">
            b
          </text>
        </>
      )}
      {shapeKey === "hexahedron" && (
        <polygon points="100,22 148,48 148,92 100,118 52,92 52,48" />
      )}
      {shapeKey === "channel" && <path d="M48 28h104v22H76v40h76v22H48V28z" />}
      {shapeKey === "balk" && <path d="M40 28h120v18H118v48h42v18H40v-18h42V46H40V28z" />}
      {shapeKey === "armature" && (
        <>
          <circle cx="100" cy="70" r="40" />
          <path d="M70 70h60M100 40v60" />
        </>
      )}
      {shapeKey === "flange" && (
        <>
          <circle cx="100" cy="70" r="50" />
          <circle cx="100" cy="70" r="18" />
          <circle cx="100" cy="28" r="6" />
          <circle cx="100" cy="112" r="6" />
          <circle cx="58" cy="70" r="6" />
          <circle cx="142" cy="70" r="6" />
        </>
      )}
      {shapeKey === "branch" && <path d="M40 90c0-40 24-62 60-62 36 0 60 22 60 62" />}
    </SvgFrame>
  );
}
