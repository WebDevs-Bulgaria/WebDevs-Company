// Вгражда структурирани данни (JSON-LD) в страницата.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Знакът "<" се екранира, за да не може съдържанието да затвори тага script.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u003c"),
      }}
    />
  );
}
