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
        extendRootHeader={
          router.asPath == "/"
            ? "xl:bg-transparent bg-black hidden"
            : "border-b-4"
        }
      />
      {children}
      <Footer />
    </>
  );
}
