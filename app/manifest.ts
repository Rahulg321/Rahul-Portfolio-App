import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rahul Gupta Portfolio App",
    short_name: "Rahul Gupta Web App",
    description:
      "Welcome to Rahul's Portfolio App. I am a developer working remotely from India. I love to code, read books and play badminton. In this web app you can find all about me, my work, my articles, my hobbies and the projects that I have worked on!",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
