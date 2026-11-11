import { ImageResponse } from "next/og";
import { company } from "@/lib/company";

// Картинката, която се показва при споделяне на връзка към сайта.
// Текстът е на латиница, защото вграденият шрифт на генератора няма кирилица;
// когато логото и шрифтът на марката са готови, тук се зарежда собствен шрифт.
export const alt = "Web Devs Bulgaria — software development company";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #ffffff 0%, #e1f4ea 55%, #cdeef2 100%)",
          color: "#0c1512",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 16,
              background: "linear-gradient(135deg, #067a4e, #0a7f8f)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            WD
          </div>
          <div style={{ fontSize: 36, fontWeight: 600 }}>{company.brandName}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
            Software, web and mobile application development
          </div>
          <div style={{ fontSize: 32, color: "#067a4e" }}>webdevs.bg</div>
        </div>
      </div>
    ),
    size,
  );
}
