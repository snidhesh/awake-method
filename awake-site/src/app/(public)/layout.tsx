import Header from "@/components/public/header";
import Footer from "@/components/public/footer";
import MobileNav from "@/components/public/mobile-nav";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <MobileNav />
    </>
  );
}
