import { createContext, useCallback, useContext, useId, useMemo, useState, type ReactNode } from "react";
import { MenuOverlay } from "./MenuOverlay";

/**
 * The site's whole navigation: one full-screen menu, and the trigger that
 * opens it.
 *
 * There is no header bar, no rail and no sticky button. Each page's top row
 * carries a trigger beside its "Contact us" pill (`MenuTrigger`), and it
 * scrolls away with the page, at the client's request. The open state lives
 * here rather than in the trigger, because the trigger sits inside the page
 * (the hero, or the inner pages' logo row) while the sheet is rendered once at
 * the shell.
 */
type MenuContextValue = {
  open: boolean;
  panelId: string;
  openMenu: () => void;
};

const MenuContext = createContext<MenuContextValue | null>(null);

function useMenu() {
  const value = useContext(MenuContext);
  if (!value) throw new Error("MenuTrigger must be rendered inside MenuProvider");
  return value;
}

/**
 * The ring and its three bars, drawn off-centre as in the reference: the bars
 * sit up and to the left, overhanging the ring's edge, and settle into its
 * centre under the pointer.
 *
 * Without a ring the offset has nothing to overhang, so the bars sit centred.
 */
function MenuGlyph({ ring, bars }: { ring?: string; bars: string }) {
  return (
    <>
      {ring ? (
        <span
          aria-hidden="true"
          className={`absolute rounded-pill border-[1.5px] transition-transform duration-500 ease-out-expo group-hover:scale-110 ${ring}`}
        />
      ) : null}
      <span
        aria-hidden="true"
        className={`relative flex w-7 flex-col gap-[5px] transition-transform duration-500 ease-out-expo ${
          ring ? "-translate-x-[9px] -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" : ""
        }`}
      >
        <span className={`h-0.5 rounded-pill ${bars}`} />
        <span className={`h-0.5 rounded-pill ${bars}`} />
        <span className={`h-0.5 rounded-pill ${bars}`} />
      </span>
    </>
  );
}

/**
 * The trigger in a page's top row. `onPhoto` is for the homepage hero: white
 * bars with no ring, which only muddied the photograph, and a faint white
 * wash under the pointer in its place. Elsewhere the ring is sky blue and the
 * bars follow the theme.
 */
export function MenuTrigger({ onPhoto = false }: { onPhoto?: boolean }) {
  const { open, panelId, openMenu } = useMenu();

  return (
    <button
      type="button"
      onClick={openMenu}
      aria-label="Open menu"
      aria-expanded={open}
      aria-controls={panelId}
      className={`group relative grid h-12 w-12 shrink-0 place-items-center rounded-pill transition-[background-color,transform] duration-300 ease-out-expo active:scale-95 ${
        onPhoto ? "hover:bg-white/15" : ""
      }`}
    >
      <MenuGlyph ring={onPhoto ? undefined : "inset-0.5 border-purple"} bars={onPhoto ? "bg-white" : "bg-fg"} />
    </button>
  );
}

export function MenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const openMenu = useCallback(() => setOpen(true), []);
  // Stable identity matters here. `useFocusTrap` lists its escape handler as a
  // dependency and restores focus to the trigger when it tears down, so an
  // inline arrow would re-run the trap on every render and bounce focus back
  // out of the menu the moment it was moved in.
  const close = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ open, panelId, openMenu }), [open, panelId, openMenu]);

  return (
    <MenuContext.Provider value={value}>
      {children}
      <MenuOverlay id={panelId} open={open} onClose={close} />
    </MenuContext.Provider>
  );
}
