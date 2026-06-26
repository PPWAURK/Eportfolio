import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Noto_Sans_SC,
  Space_Grotesk,
  Space_Mono,
} from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import WipeTransition from "@/components/WipeTransition";
import "@/styles/globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "王世洪 | 全栈开发者·风光摄影 | Eric Wang",
  description:
    "Full-stack developer in Paris, pursuing a Master's in Network Engineering at Université Paris Cité. Landscape photographer. 全栈开发者，巴黎西岱大学网络工程硕士在读，风光摄影爱好者。",
  openGraph: {
    title: "王世洪 | 全栈开发者·风光摄影 | Eric Wang",
    description:
      "Full-stack developer & landscape photographer based in Paris. 全栈开发者·风光摄影·巴黎",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "王世洪 | Eric Wang",
    description: "Full-stack developer & landscape photographer based in Paris.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${bricolage.variable} ${notoSansSC.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body>
        <Nav />
        <WipeTransition />
        <main style={{ paddingTop: 64 }}>{children}</main>
        <Footer />
        <Preloader />
      </body>
    </html>
  );
}
