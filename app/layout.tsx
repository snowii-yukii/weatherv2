import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Particles from "@/components/Particles"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather Pulse",
  description: "Weather Pulse App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-white text-black relative">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Particles
            particleColors={["#52525b"]}
            particleCount={300}
            particleSpread={20}
            speed={1}
            particleBaseSize={100}
            moveParticlesOnHover
            alphaParticles
            disableRotation
            pixelRatio={1}
          />
        </div>
        <main className="relative z-10 flex-1 p-3 sm:p-10 lg:p-20">
          {children}
        </main>
      </body>
    </html>
  );
}
