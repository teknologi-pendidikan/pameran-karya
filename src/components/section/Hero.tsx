import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCalendarAlt, faLocationArrow } from "@fortawesome/free-solid-svg-icons";

export default function Hero() {
  return (
    <>
      <section
        id="hero"
        className="flex w-full flex-col items-center justify-start space-y-8 px-24 transition-all  duration-500 ease-in-out"
      >
        <div
          id="hero-content-group"
          className="flex flex-col items-center justify-start space-y-8"
        >
          <div className="bg-text-container max-w-7xl">
            <div className="animate-text">
              <span>Pameran</span>
              <span>Karya</span>
            </div>
            <div className="animate-text left">
              <span>Mahasiswa</span>
              <span>TEP UM</span>
            </div>
          </div>

          <h1 className="text-start text-4xl font-bold tracking-tight text-black md:text-center md:text-6xl lg:text-center lg:text-7xl">
            Pameran Karya Mahasiswa Teknologi Pendidikan
          </h1>
          <p className="max-w-2xl text-start text-gray-700 md:text-center lg:text-center">
            Taruh apalah tema disini gtuuu kek Mengembangkan Teknologi Untuk
            Menciptakan Inovasi Berbasis Karakter Bangsa
          </p>
        </div>

        <div
          id="hero-cta-group"
          className="flex w-full max-w-md flex-col items-center justify-start md:flex-row lg:flex-row"
        ></div>

        <div className="flex w-full flex-col items-center justify-center space-y-3 text-xl sm:flex-row sm:space-y-0 sm:space-x-6">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <p>.... Mei 2023</p>
            <FontAwesomeIcon icon={faLocationArrow} />
            <a href="#">
              <p>Spatial.io Rooms</p>
            </a>
          </div>
          <div>
            <p>&</p>
          </div>
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <p>..... Mei 2023</p>
            <FontAwesomeIcon icon={faLocationArrow} />
            <a href="#">
              <p>Malang Creative Center, Jawa Timur</p>
            </a>
          </div>
        </div>
        <style jsx>{`
          #hero {
            transform: skewY(-5deg);
          }
          .bg-text-container {
            transform: translateX(-50%);
            left: 50%;
            position: absolute;
            z-index: -999;
          }
          span {
            font-size: 280px;
            color: transparent;
            -webkit-text-stroke: 2px #30442a;
            text-transform: uppercase;
            display: inline-block;
            line-height: 0.75;
            min-width: auto;
            font-weight: 200;
            opacity: 0.1;
          }
          @keyframes text-scrolling {
            0% {
              transform: translate3d(-100%, 0, 0);
            }
            100% {
              transform: translate3d(0%, 0, 0);
            }
          }
          .animate-text {
            animation: text-scrolling 20s linear infinite;
            will-change: transform;
            display: block;
            position: relative;
            white-space: nowrap;
          }
          .animate-text.left {
            animation-direction: reverse;
          }
        `}</style>
      </section>
    </>
  );
}
