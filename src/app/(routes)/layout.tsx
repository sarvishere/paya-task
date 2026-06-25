import Header from "@/features/header/components/HeaderSearch";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main >
        {children}
      </main>
    </>
  );
}