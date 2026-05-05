import { ImageResponse } from "next/og";

export const alt = "The AWAKE Method — Cecilia Reinaldo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0a0a0a 0%, #1a1814 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Pink accent line */}
        <div
          style={{
            width: 60,
            height: 3,
            background: "#e8185c",
            marginBottom: 28,
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          The AWAKE Method
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 26,
            color: "#e8185c",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            marginBottom: 32,
          }}
        >
          Cecilia Reinaldo
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.5)",
            textAlign: "center",
            maxWidth: 600,
            lineHeight: 1.5,
          }}
        >
          Customer Experience is the Strategy. Presence Is the Product.
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            fontSize: 15,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
          }}
        >
          awake-method.com
        </div>
      </div>
    ),
    { ...size }
  );
}
