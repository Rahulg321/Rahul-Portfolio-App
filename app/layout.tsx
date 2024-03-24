import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import clsx from "clsx";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

const urbanist = Montserrat({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    metadataBase: new URL("https://rahulguptadev.in"),
    title: {
      default: "Rahul Gupta Portfolio App",
      template: `%s | Rahul Gupta Portfolio App`,
    },
    description:
      "Rahul Gupta - Developer, Blogger, Gamer, Fitness Enthusiast. I build web projects, write about tech, and love freelancing. Explore my portfolio, blog posts, and get a glimpse into my passions for gaming and fitness!",
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-gray-900 text-slate-100">
      <body className={clsx(urbanist.className, "relative min-h-screen")}>
        <Header />
        {children}
        <div className="background-gradient absolute inset-0 -z-50 max-h-screen" />
        <div className="pointer-events-none absolute inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div>
        <Footer />
        <Toaster position="bottom-center" />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
      <GoogleAnalytics gaId="G-K15N8WF6F3" />
    </html>
  );
}
