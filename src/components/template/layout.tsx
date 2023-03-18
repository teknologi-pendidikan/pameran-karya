import Footer from "@components/organisms/Footer";
import Header from "@components/organisms/Header";
import { useRouter } from "next/router";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children: children }: LayoutProps) {
  const router = useRouter();
  return (
    <>
      <Header
        posRootHeader={router.asPath === "/" ? "absolute" : "fixed"}
        extendRootHeader={router.asPath !== "/" ? "border-b-4" : ""}
      />
      {children}
      <Footer />
    </>
  );
}
