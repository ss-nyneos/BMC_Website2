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

/**
 * Full-bleed hero backdrop, the housing loan photograph. Served from `public/`
 * rather than Unsplash, resized from the 1536x1024 original, which is also the
 * widest file there is.
 */
export const heroPhoto = {
  src: "/hero/home-loan-1536.jpg",
  srcSet: "/hero/home-loan-800.webp 800w, /hero/home-loan-1200.webp 1200w, /hero/home-loan-1536.webp 1536w",
  alt: "A loan officer going through a home loan application with a couple at a desk, a model house on the table between them.",
  width: 1536,
  height: 1024,
};

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
  // The "Find your way in" trio: each chosen to show the card's own subject
  // rather than a generic portrait or landmark.
  pillarPersonal: {
    id: "photo-1657912230234-87f45165424d",
    alt: "A smiling man and woman outdoors under trees, with a baby in blue overalls between them.",
    width: 520,
    height: 520,
  },
  pillarBusiness: {
    id: "photo-1780504863007-44f229d4d33f",
    alt: "A tailor in his workshop, stitching pink fabric on an old black sewing machine.",
    width: 520,
    height: 520,
  },
  pillarOverseas: {
    id: "photo-1657358846130-3305fd8fcd30",
    alt: "A hand holding a passport and boarding pass in an airport terminal, a traveller wheeling a suitcase behind.",
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

  // Inner pages. Each photograph shows the page's own subject, an object or a
  // place, and never a person: a stranger's portrait above a rate table read
  // as a stock photo, and suggested a customer the bank does not have.
  rupeeCoins: {
    id: "photo-1565373679107-344d38dbf734",
    alt: "Indian rupee coins spread across a fan of folded banknotes.",
    width: 520,
    height: 520,
  },
  calculator: {
    id: "photo-1642043175009-5997b3a078d8",
    alt: "A desk calculator and a pencil lying on sheets of graph paper.",
    width: 520,
    height: 520,
  },
  modelHouse: {
    id: "photo-1709080381729-965c62ab0471",
    alt: "A small white model house standing beside two stacks of coins.",
    width: 520,
    height: 520,
  },
  goldBangles: {
    id: "photo-1758995116383-f51775896add",
    alt: "A stack of patterned gold bangles on a dark surface.",
    width: 520,
    height: 520,
  },
  carKey: {
    id: "photo-1710006548781-eff5670376fa",
    alt: "A car key and its remote fob on a plain white surface.",
    width: 520,
    height: 520,
  },
  bangleShop: {
    id: "photo-1760786933027-fe2ad82957f9",
    alt: "Shop shelves stacked floor to ceiling with red, green and gold bangles.",
    width: 520,
    height: 520,
  },
  rotaryPhone: {
    id: "photo-1525598912003-663126343e1f",
    alt: "A black rotary telephone with its handset lifted off the cradle.",
    width: 520,
    height: 520,
  },
  oldLedger: {
    id: "photo-1760307837453-ce60cb209e52",
    alt: "An old ledger lying open, its pages worn soft and filled with handwriting.",
    width: 520,
    height: 520,
  },
  rubberStamp: {
    id: "photo-1619418602850-35ad20aa1700",
    alt: "A wooden rubber stamp resting on a printed official document.",
    width: 520,
    height: 520,
  },
  questionMark: {
    id: "photo-1595452767427-0905ad9b036d",
    alt: "A large question mark painted in white on a weathered brick wall.",
    width: 520,
    height: 520,
  },
  meetingHall: {
    id: "photo-1643199021361-c2fd68cd5571",
    alt: "Rows of empty blue and grey chairs set out in a meeting hall.",
    width: 520,
    height: 520,
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
