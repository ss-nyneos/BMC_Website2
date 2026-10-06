import type { Photo } from "../types";

/**
 * Photography.
 *
 * The bank publishes no photography of its own beyond banners and staff
 * portraits (checked against bmc.bank.in in October 2026), so the site uses the
 * two loan photographs in `public/photos` plus Unsplash stock chosen to read as
 * Mumbai and as banking, not as strangers' faces. Every id below was resolved
 * against images.unsplash.com and looked at before being written in.
 *
 * Three kinds of photo are deliberately avoided: the Brihanmumbai Municipal
 * Corporation headquarters (its initials are also "BMC", and a visitor could
 * take it for the bank's own building); buildings carrying another financial
 * firm's name; and screens showing some other app or a real person's profile.
 * The phone photos show no app at all, so they cannot misrepresent the bank's.
 *
 * Alt text describes what is actually in the frame. None of it claims the
 * person pictured is a BMC customer, because that would not be true.
 */
const HOST = "https://images.unsplash.com";

type Crop = "center" | "faces";

export function unsplash(id: string, width: number, height: number, quality = 78, crop: Crop = "center") {
  const focus = crop === "faces" ? "&crop=faces" : "";
  return `${HOST}/${id}?auto=format&fit=crop${focus}&w=${width}&h=${height}&q=${quality}`;
}

/** 1x / 2x pair for a fixed-size slot. */
export function srcSet(id: string, width: number, height: number) {
  return `${unsplash(id, width, height)} 1x, ${unsplash(id, width * 2, height * 2, 70)} 2x`;
}

/** Width-described set, so a full-bleed panel loads a phone-sized file on a phone. */
function responsive(id: string, width: number, height: number, crop: Crop) {
  return [480, 900, 1400]
    .map((w) => `${unsplash(id, w, Math.round((w * height) / width), w > 900 ? 70 : 78, crop)} ${w}w`)
    .join(", ");
}

type PhotoSpec = { id: string; alt: string; width: number; height: number; crop?: Crop };

const spec = {
  heritage: {
    id: "photo-1748267887709-25aaa0c30115",
    alt: "The Asiatic Society library and Town Hall in Fort, Mumbai: white Doric columns above a wide flight of stone steps where people sit and walk.",
    width: 900,
    height: 900,
  },
  neighbourhood: {
    id: "photo-1726412181586-fa2859d3e166",
    alt: "A Mumbai street of apartment blocks and palm trees, a black-and-yellow taxi on the road below a high-rise.",
    width: 720,
    height: 900,
  },
  shopkeeper: {
    id: "photo-1759334928681-dc7ad674138e",
    alt: "A shopkeeper in a pink shirt and blue cap standing in his shop, shelves of textiles and goods behind him.",
    width: 900,
    height: 900,
    crop: "faces",
  },
  business: {
    id: "photo-1441986300917-64674bd600d8",
    alt: "The inside of a small independent shop, goods arranged on open shelving.",
    width: 900,
    height: 900,
  },
  overseas: {
    id: "photo-1595658658481-d53d3f999875",
    alt: "The Gateway of India seen across the harbour on a clear day.",
    width: 900,
    height: 900,
  },
  mobile: {
    id: "photo-1624625021869-c08eef7f1ccf",
    alt: "A hand holding a smartphone inside a car, the screen catching the light from the window.",
    width: 900,
    height: 900,
  },
  devices: {
    id: "photo-1650327381414-d081456da47f",
    alt: "An older person's hands holding a phone in a pale leather case.",
    width: 640,
    height: 800,
  },
  vehicle: {
    id: "photo-1449965408869-eaa3f722e40d",
    alt: "A driver's hand on the steering wheel at dusk, city lights blurred through the windscreen.",
    width: 640,
    height: 520,
  },
} satisfies Record<string, PhotoSpec>;

export type PhotoKey = keyof typeof spec;

function build(entry: PhotoSpec): Photo {
  const crop = entry.crop ?? "center";
  return {
    src: unsplash(entry.id, entry.width, entry.height, 78, crop),
    srcSet: responsive(entry.id, entry.width, entry.height, crop),
    alt: entry.alt,
    width: entry.width,
    height: entry.height,
  };
}

export const photoId: Record<PhotoKey, string> = Object.fromEntries(
  Object.entries(spec).map(([key, value]) => [key, value.id]),
) as Record<PhotoKey, string>;


/**
 * The bank's own loan photographs, self-hosted from `public/photos`.
 *
 * The originals (`public/gold_loan.png`, `public/home_loan.png`) are 1536x1024
 * PNGs of about 2MB each. Each slot gets its own crop, exported as WebP with a
 * JPEG fallback in two widths, which brings each one under 90KB.
 *
 * The crops are deliberate. The gold-loan original has a poster on the left
 * reading "Trusted by Millions", which is a customer-number claim the bank has
 * not published, so every crop starts to the right of it. Re-crop from the
 * originals with the same offsets if these files are ever regenerated:
 *   circle  1024x1024 at x=384 (gold), x=440 (home)
 *   card     836x640 at 384,200 (gold); 1000x766 at 440,40 (home)
 */
function local(name: string, alt: string, width: number, height: number, small: number, large: number): Photo {
  return {
    src: `/photos/${name}-${small}.jpg`,
    srcSet: `/photos/${name}-${small}.webp ${small}w, /photos/${name}-${large}.webp ${large}w`,
    alt,
    width,
    height,
  };
}

const GOLD_ALT =
  "A bank officer examining a gold necklace at the counter, a customer across from him and a weighing scale beside them.";
const HOME_ALT =
  "A couple listening to a loan officer at a desk, with a home loan checklist and a model house in front of them.";

export const loanPhotos = {
  goldCircle: local("gold-loan-circle", GOLD_ALT, 800, 800, 480, 800),
  homeCircle: local("home-loan-circle", HOME_ALT, 800, 800, 480, 800),
  goldCard: local("gold-loan-card", GOLD_ALT, 1000, 766, 640, 1000),
  homeCard: local("home-loan-card", HOME_ALT, 1000, 766, 640, 1000),
};

/**
 * The bank's own photographs, by slot. An entry here replaces that slot's
 * stock photo everywhere it appears. `docs/image-briefs.md` describes what
 * each slot needs and how to prepare the files.
 */
const own: Partial<Record<PhotoKey, Photo>> = {};

export const photos = {
  ...(Object.fromEntries(Object.entries(spec).map(([key, value]) => [key, build(value)])) as Record<
    PhotoKey,
    Photo
  >),
  ...own,
};
