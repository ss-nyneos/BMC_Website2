# Photography briefs

The site's photographs are listed in `src/data/photos.ts`. Two are the bank's
own: the home-loan and gold-loan scenes. Everything else is Unsplash stock,
because the live site publishes no usable photography of its own. Each brief
below replaces one stock slot. Shoot or generate the image, save it as
described, and the site picks it up.

## Rules for every image

- **No legible signage, posters or screen text.** The gold-loan original
  carried a "Trusted by Millions" poster. That is a customer-number claim the
  bank has not published, and it had to be cropped out. Generated images
  invent claims like this freely. Ask for blank or out-of-focus signage.
- **No other bank's or company's name or logo.** That includes card schemes and
  payment apps shown on a phone screen.
- **No real, identifiable staff** unless that person has approved the use.
  PRODUCT.md forbids attributing a photo to a named person without approval.
- **The head office and branches must be photographed, not generated.** A
  generated picture captioned as the bank's building would be a fabricated
  record of a real place.
- **Match the two loan photos:** warm natural light, an Indian setting, people
  mid-task rather than posing for the camera, and muted colour.
- **Deliver at least 1600px on the long edge,** as PNG or high-quality JPEG.

## The slots

| Slot (`photos.ts` key) | Where it appears | Shape | Brief |
|---|---|---|---|
| `heritage` | "A bank of firsts" (homepage), DEAF, Shareholder and Other Loans pages | Square, subject centred | **Photograph:** the head office, Zain G. Rangoonwala Building, 78 Mohamedali Road, from across the street in soft morning light, with the façade filling the frame. |
| `shopkeeper` | "Everything you need to bank" (homepage), Working Capital header | Portrait, subject centre-right | A trader in a Mumbai market shop (cloth, spices or hardware) at his counter. He is holding a printed UPI QR stand with the brand blurred out. Shelves of stock behind him are out of focus. |
| `neighbourhood` | "Personal banking" card, Deposit Rates header | Portrait | A family on the balcony of an older Mumbai apartment block in the evening, seen from the street. Faces are small in the frame. |
| `business` | "Business banking" card, GST and Other Loans headers | Square | Inside a busy wholesale shop in an Indian market: sacks, ledgers, a weighing scale, an owner and an assistant at work. *The current stock photo shows a Western clothing shop with a "U.S. Navy" bag, so it is the weakest slot.* |
| `overseas` | "NRI and foreign exchange" card, Contact and Deposit Rates pages | Square | A remittance counter: an officer hands a receipt to a customer, with a world-time clock on the wall behind. Alternatively, a parent in Mumbai on a video call with a child abroad. |
| `mobile` | "Digital banking" panel, FAQ header | Portrait, text sits on the lower third | A customer's hands holding a phone at a branch counter. The screen is dark or blurred, never showing an app, and the counter is softly out of focus. Keep the bottom third calm, because the heading sits there in white. |
| `devices` | "Bank from your phone" band | Portrait 4:5 | An older customer at home reading their phone through reading glasses. The screen is not visible. |
| `vehicle` | Vehicle loan rate card | Landscape, top quarter dark | A family collecting a new hatchback outside a Mumbai showroom, number plate blurred. Keep the top quarter dark or plain, because the icon sits there in white. |

## Adding one to the site

1. Put the original in `public/` (e.g. `public/heritage.png`).
2. Make the web copies the same way as the loan photos. From the project root:

   ```sh
   cd public
   for w in 640 1200; do
     magick heritage.png -resize ${w}x -strip -quality 80 photos/heritage-$w.jpg
     magick heritage.png -resize ${w}x -strip -quality 76 photos/heritage-$w.webp
   done
   ```

   If the frame has anything that breaks the rules above, crop it first with
   `-crop WxH+X+Y +repage`, as the gold-loan crop does.
3. In `src/data/photos.ts`, add the slot to the `own` map with the existing
   `local()` helper. That replaces the stock photo everywhere the slot is used:

   ```ts
   const own: Partial<Record<PhotoKey, Photo>> = {
     heritage: local(
       "heritage",
       "The bank's head office on Mohamedali Road in morning light.",
       1200, 1200, 640, 1200,
     ),
   };
   ```

   The numbers are the width, height, small file and large file. Write alt
   text that describes what is in the frame and claims nothing about who the
   people are.
4. Move the original out of `public/` afterwards. Everything in `public/` is
   copied into the deploy.
