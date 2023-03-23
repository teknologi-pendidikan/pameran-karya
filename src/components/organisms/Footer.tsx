import Link from "next/link";

import LogoPameran from "@/components/atoms/logo-pameran";
import LogoTEPUM from "@/components/atoms/logo-tepum";
import LogoDPTSI from "@components/atoms/logo-dptsi";
import LogoEdtech from "@components/atoms/logo-edtech";
import FooterPrevent from "../molecules/footer-prevent";
import FooterMainevent from "../molecules/footer-mainevent";
import FooterSponsor from "../molecules/footer-sponsor";

export default function Footer() {
  return (
    // <footer
    //   id="footer"
    //   className="flex flex-col items-center justify-center w-full h-min bg-black pt-4 pb-10 space-y-2"
    // >
    //   <div id="logo-pameran-wrapper" className="scale-75 xl:scale-100">
    //     <LogoPameran />
    //   </div>
    //   <div className="container px-4 lg:max-w-screen-3xl text-center space-x-6 text-white">
    //     <Link href="/about" className="hover:underline underline-offset-4 my-2">
    //       Tentang
    //     </Link>
    //     <Link href="/partisipan" className="hover:underline underline-offset-4 my-2">
    //       Partisipan
    //     </Link>
    //     <Link href="/schedule" className="hover:underline underline-offset-4 my-2">
    //       Tim Belakang Layar
    //     </Link>
    //     <Link href="/sponsors" className="hover:underline underline-offset-4 my-2">
    //       Butuh bantuan?
    //     </Link>
    //   </div>
    //   <div className="flex px-4 scale-50 xl:scale-100 items-center justify-center space-x-6">
    //     <Link href="http://tep.fip.um.ac.id">
    //       <LogoTEPUM
    //         height={80}
    //         width={110}
    //         fill="#fff"
    //         className="hover:scale-125"
    //       />
    //     </Link>
    //     <Link href="https://dptsi.edtech.or.id">
    //       <LogoDPTSI
    //         height={80}
    //         width={130}
    //         fill="#fff"
    //         className="hover:scale-125"
    //       />
    //     </Link>
    //     <Link href="https://teknologipendidikan.or.id">
    //       <LogoEdtech
    //         height={80}
    //         width={190}
    //         fill="#fff"
    //         className="hover:scale-125"
    //       />
    //     </Link>
    //   </div>
    //   <div className="text-gray-300 text-sm text-center">
    //     Copyright © Tim Pameran Karya Teknologi Pendidikan 2023. All Rights
    //     Reserved.
    //   </div>
    // </footer>
    <footer className="relative w-full bg-black h-screen">
      <div className="mx-auto w-10/12">
        <div className="flex-row">
          <div className="flex flex-col justify-between md:flex-row md:items-center pt-10 md:pt-16">
            <div className="flex flex-col justify-center">
              <LogoPameran />
              <p className="text-white text-[20px] md:text-[24px] md:flex md:flex-wrap">
                Inovasi. Teknologi. Pendidikan.
              </p>
            </div>
            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-0 md:space-x-6 lg:space-x-[60px] items-start justify-center mx-auto md:mx-0 mt-10 md:mt-0">
              <FooterPrevent />
              <FooterMainevent />
            </div>
          </div>
          <FooterSponsor />
        </div>
        <hr className="h-[1px] bg-white md:bg-discolored-800 mt-10 md:mt-[67px]" />
        <p className="text-white font-semibold text-[14px] md:text-[16px] mt-3 pb-3 md:mt-5 md:pb-10">
          © 2023 Pameran Karya Digital TEP UM. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
