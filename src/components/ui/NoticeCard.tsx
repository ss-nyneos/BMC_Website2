import type { Notice } from "../../types";
import { CircleArrow } from "./CircleArrow";

/** A dated notice row. The date is a real <time> so it is machine readable. */
export function NoticeCard({ notice }: { notice: Notice }) {
  return (
    <a
      href={notice.href}
      className="group flex items-center justify-between gap-6 rounded-2xl bg-surface p-6 shadow-card transition-[transform,box-shadow,background-color,color] duration-500 ease-out-expo hover:-translate-y-1 hover:bg-lavender-soft hover:text-ink hover:shadow-card-hover sm:p-7"
    >
      <span>
        <span className="block text-body-sm font-medium">{notice.title}</span>
        {notice.date ? (
          <span className="mt-2 block text-meta text-fg-muted transition-colors group-hover:text-ink/70">
            {notice.date}
          </span>
        ) : null}
      </span>
      <CircleArrow tone="lavender" />
    </a>
  );
}
