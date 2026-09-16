import { Container } from "../layout/Container";
import { Section } from "../layout/Section";
import { DownloadLink } from "../ui/DownloadLink";
import { LinkArrow } from "../ui/LinkArrow";
import { NoticeCard } from "../ui/NoticeCard";
import { Tabs } from "../ui/Tabs";
import { forms, newsletters, notices } from "../../data/notices";

/**
 * The newsletter archive, statutory notices and downloadable forms, which the
 * current site scatters across a dropdown and three separate pages.
 *
 * Tabs rather than three stacked lists: a visitor here wants exactly one of the
 * three, and stacking them would push the footer another screen away.
 */
export function NewsNotices() {
  const items = [
    {
      label: "Newsletters",
      panel: (
        <div>
          <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
            {newsletters.map((item) => (
              <DownloadLink key={item.href} notice={item} />
            ))}
          </div>
          <LinkArrow href="/resources/newsletters" className="mt-8">
            View the full newsletter archive
          </LinkArrow>
        </div>
      ),
    },
    {
      label: "Notices",
      panel: (
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
          {notices.map((item) => (
            <NoticeCard key={item.href} notice={item} />
          ))}
        </div>
      ),
    },
    {
      label: "Forms and downloads",
      panel: (
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
          {forms.map((item) => (
            <DownloadLink key={item.href} notice={item} />
          ))}
        </div>
      ),
    },
  ];

  return (
    <Section bg="page" padY="lg" aria-labelledby="news-heading">
      <Container>
        <h2 id="news-heading" className="reveal max-w-[20ch] text-h2">
          Notices and downloads
        </h2>
        <Tabs items={items} className="reveal mt-10" />
      </Container>
    </Section>
  );
}
