import Link from "next/link";
import LogoPameran from "@components/atoms/logo-pameran";
import LogoTEPUM from "@components/atoms/logo-tepum";
import LogoDPTSI from "../atoms/logo-dptsi";
import LogoEdtech from "../atoms/logo-edtech";

export default function FooterSponsor() {
  return (
    <div className="flex flex-row justify-end">
      <div className="flex flex-col mt-10 h-full">
        <p className="text-white text-xl font-semibold text-right">
          Didukung oleh:
        </p>
        <div className="flex flex-row justify-end space-x-6">
          <Link href="http://tep.fip.um.ac.id">
            <LogoTEPUM
              height={80}
              width={110}
              fill="#fff"
              className="hover:scale-125 transition ease-in-out duration-500"
            />
          </Link>
          <Link href="https://dptsi.edtech.or.id">
            <LogoDPTSI
              height={80}
              width={130}
              fill="#fff"
              className="hover:scale-125 transition ease-in-out duration-500"
            />
          </Link>
          <Link href="https://teknologipendidikan.or.id">
            <LogoEdtech
              height={80}
              width={190}
              fill="#fff"
              className="hover:scale-125 transition ease-in-out duration-500"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
