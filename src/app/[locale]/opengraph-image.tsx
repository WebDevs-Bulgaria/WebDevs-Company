import { ImageResponse } from "next/og";

// Картинката, която се показва при споделяне на връзка към сайта: знакът и името на марката
// в нейните цветове. Текстът е на латиница, защото вграденият шрифт на генератора няма
// кирилица; за надпис на български тук трябва да се зареди собствен шрифт.
const mark =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><radialGradient id="g" cx="0.5" cy="0.6" r="0.6"><stop offset="0" stop-color="#ffd23a"/><stop offset="0.45" stop-color="#ff7a1a"/><stop offset="1" stop-color="#c2255c"/></radialGradient></defs><circle cx="32" cy="32" r="27" fill="url(#g)"/><ellipse cx="24" cy="19" rx="12" ry="6.5" fill="#fff" opacity="0.5" transform="rotate(-24 24 19)"/><circle cx="33" cy="35" r="6" fill="#fff" opacity="0.92"/></svg>',
  );
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
          background: "linear-gradient(135deg, #ffffff 0%, #fff1e4 55%, #ffd9c2 100%)",
          color: "#17120e",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- генераторът на картинката иска обикновен img */}
          <img src={mark} width={96} height={96} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 52, fontWeight: 700, letterSpacing: -1.5 }}>
              <span>Web</span>
              <span style={{ color: "#d9480f" }}>Devs</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 9, color: "#5c534a" }}>BULGARIA</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
            AI solutions, websites and applications for business
          </div>
          <div style={{ fontSize: 32, color: "#c2410c" }}>webdevs.bg</div>
        </div>
      </div>
    ),
    size,
  );
}
