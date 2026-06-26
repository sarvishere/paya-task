import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "@/styles/global.css";
import "antd/dist/reset.css";
import Providers from "./providers";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "فروشگاه سرو",
  description: "بهترین محصولات با بهترین قیمت",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.variable}>
        <AntdRegistry>
          <Providers>
            <main className="container mx-auto md:px-4 md:py-8">
              {children}
            </main>
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
