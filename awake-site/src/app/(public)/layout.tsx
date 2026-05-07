import Header from "@/components/public/header";
import Footer from "@/components/public/footer";
import MobileNav from "@/components/public/mobile-nav";
import CustomCursor from "@/components/public/custom-cursor";
import ScrollProgress from "@/components/public/scroll-progress";
import BrandedBackground from "@/components/public/branded-background";
import LoadingScreen from "@/components/public/loading-screen";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoadingScreen />
      <BrandedBackground />
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <main>{children}</main>
      <Footer />
      <MobileNav />
    </>
  );
}
