import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gouri Fashions | Men's Wear & Fashion Store",
  description: "Gouri Fashions — men's fashion, ethnic wear, formal wear, coat pants, kurta pajama and more.",
  openGraph: { title: "Gouri Fashions", description: "Style Fits You", images: ["/assets/store-banner.png"] }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
