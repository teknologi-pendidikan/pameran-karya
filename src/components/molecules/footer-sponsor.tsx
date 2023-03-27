import Link from "next/link";
import LogoTEPUM from "@components/atoms/logo-tepum";
import LogoDPTSI from "../atoms/logo-dptsi";
import LogoEdtech from "../atoms/logo-edtech";

export default function FooterSponsor() {
  return (
    <div className="flex flex-col md:flex-row items-center md:justify-end">
      <div className="flex flex-col mt-10 h-full">
        <span className="text-white text-xl font-semibold text-center md:text-right">
          Didukung oleh:
        </span>
        <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-end md:space-x-6">
          <Link href="http://tep.fip.um.ac.id">
            <LogoTEPUM
              height={80}
              width={110}
              fill="#fff"
              className="hover:scale-125 transition ease-in-out duration-500"
            />
            <p className="sr-only">
              Teknologi Pendidikan Universitas Negeri Malang
            </p>
          </Link>
          <Link href="https://dptsi.edtech.or.id">
            <LogoDPTSI
              height={80}
              width={130}
              fill="#fff"
              className="hover:scale-125 transition ease-in-out duration-500"
            />

            <p className="sr-only">
              Direktorat Pengembangan Teknologi dan Sistem Informasi EDTECH-ID
            </p>
          </Link>
          <Link href="https://teknologipendidikan.or.id" tabIndex={-1}>
            <LogoEdtech
              height={80}
              width={190}
              fill="#fff"
              className="hover:scale-125 transition ease-in-out duration-500"
            />

            <p className="sr-only">Tim Teknologi Pendidikan ID (EDTECH-ID)</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
