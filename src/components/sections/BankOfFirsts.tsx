import { Container } from "../layout/Container";
import { SplitPanel } from "../layout/SplitPanel";
import { BulletList } from "../ui/BulletList";
import { CirclePhoto } from "../ui/CirclePhoto";
import { PillButton } from "../ui/PillButton";
import { emphasise } from "../ui/Emphasis";
import { firsts } from "../../data/firsts";
import { photoId, photos } from "../../data/photos";

/**
 * Reference image 3: a saturated panel carrying a circular photograph beside a
 * plain panel carrying the list.
 *
 * The five claims are the bank's own, from the live site. They are the strongest
 * thing it has to say, so they get the page's only bulleted list of substance.
 */
export function BankOfFirsts() {
  return (
    <section aria-labelledby="firsts-heading" className="bg-page py-4 lg:py-6">
      <Container>
        <SplitPanel
          reverse
          className="reveal"
          media={
            <div className="flex w-full items-center justify-center rounded-2xl bg-purple p-8 sm:p-12 lg:p-16">
              <CirclePhoto
                photo={photos.heritage}
                id={photoId.heritage}
                className="w-full max-w-[420px]"
              />
            </div>
          }
          body={
            <div className="flex w-full flex-col justify-center rounded-2xl border border-line bg-surface p-8 sm:p-12 lg:p-14">
              <h2 id="firsts-heading" className="text-h2">
                A bank of firsts
              </h2>

              <BulletList
                variant="blue"
                className="mt-9"
                items={firsts.map((item) => emphasise(item.text, item.emphasis))}
              />

              <PillButton href="/profile/history" variant="purple" className="mt-10 self-start">
                Read our history
              </PillButton>
            </div>
          }
        />
      </Container>
    </section>
  );
}
