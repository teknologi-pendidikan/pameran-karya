/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
export default function LeftPanel() {
  return (
    <>
      <div className="wrapper">
        <div className="flex flex-col space-y-8 rotator">
          <img src="/A1.png" />
          <div className="flex flex-row space-x-6">
            <img src="/A2.png" />
            <div className="flex flex-col space-y-10">
              <img src="/A3.png" />
              <img src="/A4.png" />
            </div>
          </div>
          <img src="/A5.png" />
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
          * {
            outline: 8px solid white;
          }
        `}
      </style>
    </>
  );
}
