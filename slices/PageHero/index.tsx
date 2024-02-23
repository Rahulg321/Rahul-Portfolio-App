import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `PageHero`.
 */
export type PageHeroProps = SliceComponentProps<Content.PageHeroSlice>;

/**
 * Component for "PageHero" Slices.
 */
const PageHero = ({ slice }: PageHeroProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading as="h1" size="xl">
        {slice.primary.page_heading}
      </Heading>
      <Heading size="xs" as="h6" className="mt-2">
        {slice.primary.page_tagline}
      </Heading>
    </Bounded>
  );
};

export default PageHero;
