// import { Header } from '@/components/layout/Header/Header';
// import { Footer } from '@/components/layout/Footer/Footer';
// import { Container } from '@/components/ui/Container/Container';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Header /> */}
      <main className="flex-grow">
        {children}
      </main>
      {/* <Footer /> */}
    </>
  );
}