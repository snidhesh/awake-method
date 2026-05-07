"use client";

export default function BrandedBackground() {
  return (
    <div
      className="fixed inset-0 z-[45] pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 10% 15%, rgba(232, 24, 92, 0.035) 0%, transparent 50%),
          radial-gradient(ellipse at 90% 55%, rgba(232, 24, 92, 0.025) 0%, transparent 50%),
          radial-gradient(ellipse at 45% 92%, rgba(232, 24, 92, 0.02) 0%, transparent 50%),
          radial-gradient(circle, rgba(232, 24, 92, 0.018) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 100% 100%, 24px 24px",
      }}
    />
  );
}
