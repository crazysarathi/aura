import type { ContentBlock } from "@/types/content";
import { splitBold } from "@/lib/utils";

function Inline({ text }: { text: string }) {
  return (
    <>
      {splitBold(text).map((seg, i) => (seg.bold ? <strong key={i}>{seg.text}</strong> : <span key={i}>{seg.text}</span>))}
    </>
  );
}

/** Renders migrated article blocks as semantic HTML. */
export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return <h2 key={i}><Inline text={b.text} /></h2>;
          case "h3":
            return <h3 key={i}><Inline text={b.text} /></h3>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}><Inline text={it} /></li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {b.items.map((it, j) => (
                  <li key={j}><Inline text={it} /></li>
                ))}
              </ol>
            );
          default:
            return <p key={i}><Inline text={b.text} /></p>;
        }
      })}
    </>
  );
}
