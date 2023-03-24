import Footer from "@components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import { useRouter } from "next/router";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children: children }: LayoutProps) {
  const router = useRouter();
  return (
    <>
      <Navbar
        extendRootNavbar={
          router.asPath == "/"
            ? "fixed top-0 left-0 bg-violet-900"
            : "border-b-4"
        }
      />
      {children}
      <Footer />
    </>
  );
}
