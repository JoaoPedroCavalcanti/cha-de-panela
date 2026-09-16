import { ImageResponse } from "next/og"

import { event } from "@/content/event"

export const alt = `${event.coupleNames} — ${event.eventTitle}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #f7f4ee 0%, #e8efe6 55%, #d9cfc3 100%)",
          color: "#2c261e",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, textTransform: "uppercase" }}>
          {event.eventTitle}
        </div>
        <div style={{ marginTop: 24, fontSize: 84, lineHeight: 1.05 }}>{event.coupleNames}</div>
        <div style={{ marginTop: 28, fontSize: 28, letterSpacing: 2 }}>{event.dateLabel}</div>
      </div>
    ),
    { ...size }
  )
}
