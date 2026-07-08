import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";

export const metadata: Metadata = {
  title: "Stephanie Kuo",
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MotionConfig reducedMotion="user">
          <CustomCursor />
          <SmoothScroll />
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}