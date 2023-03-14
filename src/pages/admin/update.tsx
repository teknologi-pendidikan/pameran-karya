// @ts-nocheck
/* eslint-disable @next/next/no-img-element */

let data = {
  uuid: "00",
  mode: "00000",
  key: "00000000-0000-0000-0000-000000000000",
  reason: "000000",
  status: "0000000",
};

const CallUpdateContentAPI = async (event) => {
  event.preventDefault();
  const reason = event.target.reason.value;
  const key = event.target.key.value;
  const res = await fetch("/api/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reason: reason,
      key: key,
    }),
  });

  const result = await res.json();
  alert(`CONTENT UPDATE TRIGGERED:: REASON: ${result.reason}, KEY: ${result.key}, MODE: ${result.mode}, STATUS: ${result.success}, Created At: ${result.created_at}`);
};

export default function UpdateContent() {
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-8">
          <h1 className="text-3xl font-bold text-center text-gray-900">
            Web Content Updater (on-demand build system)
          </h1>
          {/* <table className="table-auto border-collapse border border-slate-500">
            <tbody>
              <tr>
                <th className="border border-slate-600">mode</th>
                <th className="border border-slate-600">key</th>
                <th className="border border-slate-600">reason</th>
                <th className="border border-slate-600">status</th>
              </tr>
              <tr>
                <td className="border border-slate-600">{data.mode}</td>
                <td className="border border-slate-600">{data.key}</td>
                <td className="border border-slate-600">{data.reason}</td>
                <td className="border border-slate-600">{data.status}</td>
              </tr>
            </tbody>
          </table> */}
          <img
            src="https://api.netlify.com/api/v1/badges/36d476bb-2534-404b-8af7-e93112e165eb/deploy-status"
            alt="Build Status"
          />
          <form
            className="mt-8 space-y-6"
            onSubmit={CallUpdateContentAPI}
            method="POST"
          >
            <div className="-space-y-px">
              <div className="py-4">
                <label htmlFor="reason" className="sr-only">
                  Update Reason (required)
                </label>
                <input
                  id="reason"
                  name="reason"
                  type="text"
                  required
                  className="relative block w-full border-0 py-1.5 ring-1 ring-inset ring-gray-300"
                  placeholder="Update Reason (required)"
                />
              </div>
              <div>
                <label htmlFor="key" className="sr-only">
                  Update Key
                </label>
                <input
                  id="key"
                  name="key"
                  type="text"
                  pattern="^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$"
                  required
                  className="relative block w-full border-0 py-1.5 ring-1 ring-inset ring-gray-300"
                  placeholder="Update Key (required)"
                  title="Mohon masukkan update key yang valid! Setiap build akan memiliki update key yang berbeda."
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative block w-full border-0 py-1.5 ring-1 ring-inset ring-gray-300 bg-blue-600 text-white"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
