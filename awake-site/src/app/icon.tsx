import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: "#1a1814",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "serif",
            fontWeight: 900,
            fontStyle: "italic",
            fontSize: 22,
            color: "#e8185c",
            lineHeight: 1,
            marginTop: -1,
          }}
        >
          A
        </span>
      </div>
    ),
    { ...size }
  );
}
