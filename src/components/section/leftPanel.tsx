/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";

export default function LeftPanel() {
  return (
    <>
      <div className="wrapper">
        <div className="flex flex-col rotator space-y-2">
          <Link href="/about" className="border hover:border-red-500 hover:scale-110 grow-animation focus:scale-105 opacity-75 hover:opacity-100">
            <Image src="/A1.png" width={574} height={167} alt="about" />
          </Link>
          <div className="flex flex-row justify-between">
            <Link href="/about" className="border hover:border-red-500 hover:scale-110 grow-animation focus:scale-105 opacity-75 hover:opacity-100">
              <Image src="/A2.png" width={344} height={189} alt="about" />
            </Link>
            <div className="flex flex-col justify-evenly">
              <Link href="/about" className="border hover:border-red-500 hover:scale-110 grow-animation focus:scale-105 opacity-75 hover:opacity-100">
                <Image src="/A3.png" width={201} height={86} alt="about" />
              </Link>
              <Link href="/about" className="border hover:border-red-500 hover:scale-110 grow-animation focus:scale-105 opacity-75 hover:opacity-100">
                <Image src="/A3.png" width={201} height={86} alt="about" />
              </Link>
            </div>
          </div>
          <Link href="/about" className="border hover:border-red-500 hover:scale-110 grow-animation focus:scale-105 opacity-75 hover:opacity-100">
            <Image src="/A1.png" width={574} height={167} alt="about" />
          </Link>
        </div>
      </div>
      <style jsx>
        {`
          .wrapper {
            perspective: 1000px;
          }

          .rotator {
            transform: rotatey(20deg);
          }
        `}
      </style>
    </>
  );
}
