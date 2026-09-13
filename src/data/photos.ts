import type { Photo } from "../types";

/**
 * Photography.
 *
 * Every id below was resolved against images.unsplash.com before being written
 * in, so none of these ship as a broken placeholder. Circle photos are cropped
 * square at the source; panel photos are cropped 4:5 or 3:2 to suit their slot.
 *
 * Alt text describes what is actually in the frame. None of it claims the
 * person pictured is a BMC customer, because that would not be true.
 */
const HOST = "https://images.unsplash.com";

export function unsplash(id: string, width: number, height: number, quality = 78) {
  return `${HOST}/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=${quality}`;
}

/** 1x / 2x pair for a fixed-size slot. */
export function srcSet(id: string, width: number, height: number) {
  return `${unsplash(id, width, height)} 1x, ${unsplash(id, width * 2, height * 2, 70)} 2x`;
}

type PhotoSpec = { id: string; alt: string; width: number; height: number };

const spec = {
  heroWoman: {
    id: "photo-1604514628550-37477afdf4e3",
    alt: "A woman with long dark hair looking directly at the camera in soft daylight.",
    width: 560,
    height: 560,
  },
  heroManGlasses: {
    id: "photo-1615109398623-88346a601842",
    alt: "A man in glasses and a dark hooded top smiling outdoors.",
    width: 480,
    height: 480,
  },
  heroPortrait: {
    id: "photo-1602233158242-3ba0ac4d2167",
    alt: "A person in glasses and an olive jacket standing with their arms folded.",
    width: 420,
    height: 420,
  },
  heroSmiling: {
    id: "photo-1580489944761-15a19d654956",
    alt: "A woman laughing against a plain pale background.",
    width: 360,
    height: 360,
  },
  heritage: {
    id: "photo-1566552881560-0be862a7c445",
    alt: "Victorian Gothic civic architecture in south Mumbai photographed after rain.",
    width: 720,
    height: 720,
  },
  counter: {
    id: "photo-1573497491208-6b1acb260507",
    alt: "Two people talking across a table beside a window, papers between them.",
    width: 720,
    height: 720,
  },
  personal: {
    id: "photo-1607746882042-944635dfe10e",
    alt: "A woman in a checked shirt smiling in a bright room.",
    width: 520,
    height: 520,
  },
  business: {
    id: "photo-1441986300917-64674bd600d8",
    alt: "The inside of a small independent shop, goods arranged on open shelving.",
    width: 520,
    height: 520,
  },
  overseas: {
    id: "photo-1595658658481-d53d3f999875",
    alt: "The Gateway of India seen across the harbour on a clear day.",
    width: 520,
    height: 520,
  },
  mobile: {
    id: "photo-1601972599720-36938d4ecd31",
    alt: "A hand holding a phone with a banking app open on the screen.",
    width: 720,
    height: 720,
  },
  devices: {
    id: "photo-1563986768494-4dee2763ff3f",
    alt: "A phone resting on a desk beside an open laptop.",
    width: 640,
    height: 800,
  },
  leader: {
    id: "photo-1560250097-0b93528c311a",
    alt: "A man in a dark suit and glasses photographed against a plain wall.",
    width: 160,
    height: 160,
  },
} satisfies Record<string, PhotoSpec>;

export type PhotoKey = keyof typeof spec;

function build(entry: PhotoSpec): Photo {
  return {
    src: unsplash(entry.id, entry.width, entry.height),
    alt: entry.alt,
    width: entry.width,
    height: entry.height,
  };
}

export const photoId: Record<PhotoKey, string> = Object.fromEntries(
  Object.entries(spec).map(([key, value]) => [key, value.id]),
) as Record<PhotoKey, string>;

export const photos = Object.fromEntries(
  Object.entries(spec).map(([key, value]) => [key, build(value)]),
) as Record<PhotoKey, Photo>;
