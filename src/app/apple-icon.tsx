import { ImageResponse } from "next/og";

// Иконката, която телефонът показва, когато някой добави сайта на началния си екран:
// монограмът „WD“ в бяло върху цвета на марката (проба от 13.11.2026). Квадратът е без
// заоблени ъгли — операционната система ги заобля сама.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const monogram =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M11 21l7 22 7-17 7 17 7-22" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M45 21h3.5a11 11 0 0 1 0 22H45z" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round"/></svg>',
  );

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ff5a14 0%, #c2255c 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- генераторът на картинката иска обикновен img */}
        <img src={monogram} width={150} height={150} alt="" />
      </div>
    ),
    size,
  );
}
