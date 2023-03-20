import Link from "next/link";

import LogoPameran from "@/components/atoms/logo-pameran";
import LogoTEPUM from "@/components/atoms/logo-tepum";
import LogoDPTSI from "@components/atoms/logo-dptsi";
import LogoEdtech from "@components/atoms/logo-edtech";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="flex flex-col items-center justify-center w-full h-min bg-black pt-4 pb-10 space-y-2"
    >
      <LogoPameran />
      <div className="my-4 space-x-5 text-gray-300 text-sm">
        <Link href="/about" className="hover:underline underline-offset-4">
          Tentang
        </Link>
        <Link href="/partisipan" className="hover:underline underline-offset-4">
          Partisipan
        </Link>
        <Link href="/schedule" className="hover:underline underline-offset-4">
          Tim Belakang Layar
        </Link>
        <Link href="/sponsors" className="hover:underline underline-offset-4">
          Butuh bantuan?
        </Link>
      </div>
      <div className="flex flex-row items-center justify-center space-x-6">
        <Link href="http://tep.fip.um.ac.id">
          <LogoTEPUM height={80} width={110} fill="#fff" className="hover:scale-125"/>
        </Link>
        <Link href="https://dptsi.edtech.or.id">
          <LogoDPTSI height={80} width={130} fill="#fff" className="hover:scale-125"/>
        </Link>
        <Link href="https://teknologipendidikan.or.id">
          <LogoEdtech height={80} width={190} fill="#fff" className="hover:scale-125"/>
        </Link>
      </div>
      <div className="text-gray-300 text-sm">
        Copyright © Tim Pameran Karya Teknologi Pendidikan 2023. All Rights
        Reserved.
      </div>
    </footer>
  );
}
