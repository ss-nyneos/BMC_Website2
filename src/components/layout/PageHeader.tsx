import type { ReactNode } from "react";
import { Container } from "./Container";
import { CirclePhoto } from "../ui/CirclePhoto";
import type { Photo, PhotoField } from "../../types";

type PageHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  /** Small print under the standfirst: an effective date, a source, an as-at. */
  meta?: ReactNode;
  id?: string;
  /**
   * An optional circular photograph beside the title. The header itself stays
   * on the page background — the gold is still spent on the homepage hero and
   * the app band, not repeated as a full panel above every rate table. The
   * colour here is just the photo's ring, and the picture gives the page a face
   * without competing with the heading.
   */
  photo?: Photo;
  /** Unsplash id for the photo's 2x source set. */
  photoId?: string;
  /** Colour of the ring behind the photo. */
  photoField?: PhotoField;
};

export function PageHeader({
  title,
  description,
  meta,
  id = "page-heading",
  photo,
  photoId,
  photoField = "lavender",
}: PageHeaderProps) {
  return (
    <header className="border-b border-line bg-page pb-10 pt-10 md:pb-12 md:pt-14">
      <Container>
        <div
          className={
            photo ? "grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-14" : ""
          }
        >
          <div>
            <h1 id={id} className="max-w-[22ch] text-display">
              {title}
            </h1>

            {description ? (
              <p className="mt-6 max-w-prose text-body text-fg-muted">{description}</p>
            ) : null}

            {meta ? <p className="mt-6 text-meta text-fg-muted">{meta}</p> : null}
          </div>

          {photo ? (
            <div className="w-full max-w-[160px] sm:max-w-[180px] md:max-w-[210px] md:justify-self-end">
              <CirclePhoto photo={photo} id={photoId} field={photoField} priority />
            </div>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
