// app/layout.tsx
import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import '@/styles/global.css';
// import { ThemeProvider } from '@/components/providers/ThemeProvider';
// import { AuthProvider } from '@/features/auth/components/AuthProvider';
// import { Toaster } from '@/components/ui/toaster';
// import { seoConfig } from '@/config/seo.config';


const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-vazirmatn',
});


// export const metadata: Metadata = {
//   title: {
//     default: seoConfig.defaultTitle,
//     template: `%s | ${seoConfig.defaultTitle}`,
//   },
//   description: seoConfig.defaultDescription,
//   metadataBase: new URL(seoConfig.siteUrl),
//   openGraph: {
//     type: 'website',
//     locale: 'fa_IR',
//     siteName: seoConfig.siteName,
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" className={vazirmatn.variable}>
      <body>
        {/* <ThemeProvider>
          <AuthProvider> */}
            {children}
            {/* <Toaster />
          </AuthProvider>
        </ThemeProvider> */}
      </body>
    </html>
  );
}