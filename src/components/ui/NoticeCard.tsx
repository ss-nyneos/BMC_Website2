import type { Notice } from "../../types";
import { CircleArrow } from "./CircleArrow";

/** A dated notice row. The date is a real <time> so it is machine readable. */
export function NoticeCard({ notice }: { notice: Notice }) {
  return (
    <a
      href={notice.href}
      className="fill-wipe group flex items-center justify-between gap-6 rounded-2xl border border-hairline bg-surface p-6 transition-[color,transform] duration-200 ease-out-quint hover:text-ink active:scale-[0.99] sm:p-7"
    >
      <span>
        <span className="block text-body-sm font-medium">{notice.title}</span>
        {notice.date ? (
          <span className="mt-2 block text-meta text-fg-muted transition-colors group-hover:text-ink/70">
            {notice.date}
          </span>
        ) : null}
      </span>
      <CircleArrow tone="lavender" className="group-hover:translate-x-0.5" />
    </a>
  );
}
