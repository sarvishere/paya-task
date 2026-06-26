import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header style={{ padding: 16 }}>
        <Link href="/">صفحه اصلی</Link>
      </header>

      <main>{children}</main>
    </>
  );
}