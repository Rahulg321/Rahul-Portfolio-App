import Bounded from "@/components/Bounded";
import ContentList from "@/components/ContentList";
import Heading from "@/components/Heading";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

const ContentIndex = async ({
  slice,
}: ContentIndexProps): Promise<JSX.Element> => {
  const client = createClient();
  const blogPosts = await client.getAllByType("blog_post");
  const projects = await client.getAllByType("project");

  const items = slice.primary.content_type === "Blog" ? blogPosts : projects;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading size="xl" className="mb-8">
        {slice.primary.heading}
      </Heading>
      {/* description is optional so if it is filled */}
      {isFilled.richText(slice.primary.description) && (
        <div className="prose prose-xl prose-slate prose-invert">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}

      <ContentList
        items={items}
        viewMoreText={slice.primary.view_more_text}
        contentType={slice.primary.content_type}
      />
    </Bounded>
  );
};

export default ContentIndex;
