import Navbar from "src/components/Navbar";
import { Provider } from "src/providers";
import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { type Metadata } from "next";
import { Raleway } from "next/font/google";
import { Toaster } from "sonner";

const raleway = Raleway({
  subsets: ['latin'],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "StubbleMart",
  description: "StubbleMart is a marketplace for stubbles",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${raleway.variable} font-raleway  `}>
      <body>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
