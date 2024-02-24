import type { Metadata } from "next";
import "./globals.css";
import { Urbanist } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import clsx from "clsx";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

const urbanist = Urbanist({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.meta_title,
    description: settings.data.meta_description,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-gray-900 text-slate-100">
      <meta
        name="google-site-verification"
        content="8pP_lJBKWWCw5FpUWOGsVYea4jHoZ4bVNitNrYCI_EU"
      />
      <body className={clsx(urbanist.className, "relative min-h-screen")}>
        <Header />
        {children}
        <Analytics />
        <div className="background-gradient absolute inset-0 -z-50 max-h-screen" />
        <div className="pointer-events-none absolute inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div>
        <Footer />
        <Toaster position="bottom-center" />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
