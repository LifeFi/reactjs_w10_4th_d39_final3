import Navigation from "@/components/navigation";
import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./global.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--noto-serif-text",
});

const chomsky = localFont({
  src: "../assets/Chomsky.woff",
  // style: "italic",
  variable: "--chomsky-text",
});

export const metadata: Metadata = {
  title: {
    template: "%s | NYT Best Seller Explorer",
    default: "NYT Best Seller Explorer",
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${chomsky.variable} ${notoSerif.variable}`}>
        <Navigation />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
