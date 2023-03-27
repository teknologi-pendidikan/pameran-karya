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
            ? "lg:fixed top-0 left-0 text-white bg-theme-blue-accent"
            : "border-b-4 text-black"
        }
        colorLogo={router.asPath == "/" ? "#fff" : "#000"}
      />
      {children}
      <Footer />
    </>
  );
}
