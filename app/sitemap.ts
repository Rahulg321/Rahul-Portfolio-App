import { createClient } from "@/prismicio";
import { MetadataRoute } from "next";

export default async function sitemap() {
  const client = createClient();
  const baseUrl = "https://rahulguptadev.in";

  const blogs = await client.getAllByType("blog_post");
  const projects = await client.getAllByType("project");

  const blogsURLS =
    blogs.map((member) => ({
      url: `${baseUrl}/team/${member.data.title}`,
      lastModified: new Date(),
    })) ?? [];

  const projectsURLS =
    projects.map((member) => ({
      url: `${baseUrl}/operatingteam/${member.data.title}`,
      lastModified: new Date(),
    })) ?? [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://rahulguptadev.in/blogs",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://rahulguptadev.in/projects",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://rahulguptadev.in/about",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://rahulguptadev.in/contact",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },

    ...blogsURLS,
    ...projectsURLS,
  ];
}
