/**
 * Contact details as published on the live contact page.
 *
 * The IVR number is carried on the site's header block but is missing from the
 * contact page itself, where the service list appears with no number beside it.
 * It is included here because it is the bank's own published number and the
 * omission reads as an oversight; worth confirming before launch.
 */
export const registeredOffice = {
  legalName: "Bombay Mercantile Co-operative Bank Ltd.",
  label: "Registered office",
  building: "Zain G. Rangoonwala Building",
  street: "78, Mohamedali Road",
  city: "Mumbai 400 003",
  phones: ["(022) 23425961 (4 lines)", "(022) 23114800 (4 lines)"],
};

export const selfService = [
  {
    label: "Balance enquiry",
    detail: "Give a missed call to 09512 004406 from your registered mobile number.",
    href: "tel:09512004406",
    action: "09512 004406",
  },
  {
    label: "IVR services",
    detail:
      "Block a debit card, stop payment of a cheque, request a cheque book, update Aadhaar, or take a mini statement.",
    href: "tel:09512004407",
    action: "09512 004407",
  },
  {
    label: "Customer care",
    detail: "Toll free, for anything the self-service numbers above do not cover.",
    href: "tel:1800220854",
    action: "1800 220 854",
  },
];

/** The grievance-redressal contact the bank names on its contact page. */
export const nodalOfficer = {
  role: "Nodal Officer",
  name: "Mr Amiruddin Mohiuddin Panhalkar",
  phones: ["022-23114800", "022-23425961", "022-23432498", "022-23445628"],
  email: "jgm@bmcbank.co.in",
  address: [
    "Bombay Mercantile Co-operative Bank Ltd.",
    "5th Floor, Head Office",
    "78 Mohamed Ali Road",
    "Mumbai 400 003",
  ],
};
