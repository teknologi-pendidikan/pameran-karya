import LogoPameran from "@/components/atoms/logo-pameran";
import FooterPrevent from "../molecules/footer-prevent";
import FooterMainevent from "../molecules/footer-mainevent";
import FooterSponsor from "../molecules/footer-sponsor";

export default function Footer() {
  return (
    <footer className="relative w-full bg-black min-h-min pb-10" aria-label="">
      <div className="mx-auto container px-4">
        <div className="flex-row">
          <div className="flex flex-col justify-between md:flex-row md:items-center pt-10 md:pt-16">
            <div className="flex flex-col justify-center scale-75 md:scale-100">
              <LogoPameran />
              <span className="text-white text-[20px] md:text-[24px] md:flex md:flex-wrap">
                Inovasi. Teknologi. Pendidikan.
              </span>
            </div>
            <div className="hidden md:flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-0 md:space-x-6 lg:space-x-[60px] items-start justify-center mx-auto md:mx-0 mt-10 md:mt-0">
              <FooterPrevent />
              <FooterMainevent />
            </div>
          </div>
          <FooterSponsor />
        </div>
        <hr className="h-[1px] bg-white md:bg-discolored-800 mt-10 md:mt-[67px]" />
        <p className="text-white font-semibold text-[14px] md:text-[16px] mt-3 pb-3 md:mt-5 md:pb-10 text-center md:text-right">
          © 2023 Pameran Karya Digital TEP UM. <br /> All rights reserved.
        </p>
      </div>
    </footer>
  );
}
