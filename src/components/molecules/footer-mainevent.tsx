import Link from "next/link";

export default function FooterMainevent() {
  return (
    <div className="flex flex-col justify-center items-center">
      <button className="mx-auto flex items-center md:mx-0 text-white font-bold text-[16px] md:text-[18px] lg:text-[20px] cursor-pointer gap-5 md:cursor-default">
        Main Event
      </button>
      <div className="hidden opacity-0 md:block md:opacity-100 w-full flex-col transition-all duration-1000 md:w-fit mt-5 space-y-5 ">
        <div>
          <Link
            className="button inline-flex items-center justify-center focus:outline-none focus-visible:ring transition duration-150 decoration-current hover:decoration-white/0 active:decoration-current disabled:hover:decoration-current md:text-lg text-white hover:text-white active:text-white focus-visible:ring-discolored-400 font-medium text-sm lg:text-base"
            href="/coming-soon"
          >
            Pameran Digital{" "}
          </Link>
        </div>
        <div>
          <Link
            className="button inline-flex items-center justify-center focus:outline-none focus-visible:ring transition duration-150 decoration-current hover:decoration-white/0 active:decoration-current disabled:hover:decoration-current md:text-lg text-white hover:text-white active:text-white focus-visible:ring-discolored-400 font-medium text-sm lg:text-base"
            href="/coming-soon"
          >
            Pameran Fisik{" "}
          </Link>
        </div>
        <div>
          <Link
            className="button inline-flex items-center justify-center focus:outline-none focus-visible:ring transition duration-150 decoration-current hover:decoration-white/0 active:decoration-current disabled:hover:decoration-current md:text-lg text-white hover:text-white active:text-white focus-visible:ring-discolored-400 font-medium text-sm lg:text-base"
            href="/coming-soon"
          >
            Grand Launching{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}