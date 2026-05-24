import type { Metadata } from "next";
import { Cormorant_Garamond, Raleway } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { LocaleProvider } from "@/context/LocaleProvider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Angie Makeup | Maquilladora Profesional de Lujo",
  description:
    "Maquillaje premium para novias, glam, editorial y eventos. Reserva con Angie — Makeup Artist Pro.",
  openGraph: {
    title: "Angie Makeup | Makeup Artist Pro",
    description: "Belleza de lujo para tus momentos más inolvidables.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${raleway.variable} h-full`}>
      <body className="min-h-full overflow-x-hidden bg-[#080608] antialiased">
        <LocaleProvider>
          <MotionProvider>
            <div className="noise-overlay fixed inset-0 z-[1] opacity-60" aria-hidden />
            {children}
          </MotionProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
