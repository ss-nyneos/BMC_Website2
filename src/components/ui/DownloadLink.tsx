import type { Notice } from "../../types";
import { DownloadIcon } from "../../assets/icons";

/**
 * A downloadable document. The file type and size are announced as part of the
 * link text rather than shown as a bare icon, so nobody clicks a 2 MB PDF on
 * mobile data without being told.
 */
export function DownloadLink({ notice }: { notice: Notice }) {
  return (
    <a
      href={notice.href}
      download
      className="fill-wipe group flex items-center justify-between gap-6 rounded-2xl border border-hairline bg-surface p-6 transition-[color,transform] duration-200 ease-out-quint hover:text-ink active:scale-[0.99] sm:p-7"
    >
      <span>
        <span className="block text-body-sm font-medium">{notice.title}</span>
        <span className="mt-2 block text-meta text-fg-muted transition-colors group-hover:text-ink/70">
          {[notice.date, notice.meta].filter(Boolean).join(" · ")}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-pill bg-lavender text-ink transition-transform duration-300 ease-out-quint group-hover:translate-y-1"
      >
        <DownloadIcon className="h-5 w-5" />
      </span>
    </a>
  );
}
