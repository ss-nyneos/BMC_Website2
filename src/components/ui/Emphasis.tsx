import type { ReactNode } from "react";

/**
 * Bolds one phrase inside a sentence without putting markup in the data files.
 * Falls back to the plain sentence when the phrase is not found, so a copy edit
 * can never produce a half-rendered string.
 */
export function emphasise(text: string, phrase?: string): ReactNode {
  if (!phrase) return text;
  const at = text.indexOf(phrase);
  if (at === -1) return text;

  return (
    <>
      {text.slice(0, at)}
      <strong className="font-bold">{phrase}</strong>
      {text.slice(at + phrase.length)}
    </>
  );
}
