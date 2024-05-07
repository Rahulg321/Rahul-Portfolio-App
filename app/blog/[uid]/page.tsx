import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import ContentBody from "@/components/ContentBody";
import * as prismic from "@prismicio/client";
import Head from "next/head";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.data.title as string,
    author: {
      "@type": "Person",
      name: page.data.author,
      // The full URL must be provided, including the website's domain.
      url: new URL("https://rahulguptadev.in/about"),
    },
    image: prismic.asImageSrc(page.data.featured_image),
    datePublished: page.data.publication_date,
    dateModified: page.last_publication_date,
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <ContentBody page={page} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  if (!page)
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    alternates: {
      canonical: `/blog/${page.uid}`,
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog_post");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
