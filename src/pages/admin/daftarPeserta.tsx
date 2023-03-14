// @ts-nocheck
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export type pesertaDataModel = {
  uuid: string;
  nim: number;
  nama: string;
};

export default function DaftarPeserta() {
  const { data, error, isLoading } = useSWR("/api/daftarpeserta", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <h1 className="text-xl">Daftar Peserta</h1>
      <table className="table-auto border-collapse border border-slate-500">
        <tbody>
          <tr>
            <th className="border border-slate-600">UUID</th>
            <th className="border border-slate-600">NIM</th>
            <th className="border border-slate-600">Nama</th>
          </tr>
          {data.map((peserta: pesertaDataModel) => (
            <tr key={peserta.uuid}>
              <td className="border border-slate-600">{peserta.uuid}</td>
              <td className="border border-slate-600">{peserta.nim}</td>
              <td className="border border-slate-600">{peserta.nama}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
