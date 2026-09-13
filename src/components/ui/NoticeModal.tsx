import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { PillButton } from "./PillButton";

const STORAGE_KEY = "bmc-notice-dismissed";

type NoticeModalProps = {
  title: string;
  body: string;
  cta: { label: string; href: string };
};

/**
 * The announcement the current site opens with, kept but made dismissible.
 *
 * Dismissal is remembered for the session only, so a returning visitor still
 * sees a genuinely new notice tomorrow. It appears after a short delay so it
 * does not fight the hero for attention on first paint.
 */
export function NoticeModal({ title, body, cta }: NoticeModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      dismissed = false;
    }
    if (dismissed) return;

    const timer = window.setTimeout(() => setOpen(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* storage unavailable: the notice simply returns on the next visit */
    }
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title={title}
      labelledById="notice-title"
      footer={
        <>
          <PillButton href={cta.href} variant="purple">
            {cta.label}
          </PillButton>
          <PillButton variant="outline" showArrow={false} onClick={close}>
            Dismiss
          </PillButton>
        </>
      }
    >
      {body}
    </Modal>
  );
}
