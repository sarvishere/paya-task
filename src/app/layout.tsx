import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import '@/styles/global.css';
import 'antd/dist/reset.css';

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-vazirmatn',
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" className={vazirmatn.variable}>
      <body>
        {/* <ThemeProvider> */}
            {children}
            {/* <Toaster />
        </ThemeProvider> */}
      </body>
    </html>
  );
}