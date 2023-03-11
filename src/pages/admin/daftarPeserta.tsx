/* eslint-disable react/jsx-key */
// @ts-nocheck

export default function DaftarPeserta({ daftarpeserta }) {  
  return (
    <>
      <h1 className="text-xl">Daftar Peserta</h1>
      <table className="table-auto border-collapse border border-slate-500">
        <tr>
          <th className="border border-slate-600" >UUID</th>
          <th className="border border-slate-600">NIM</th>
          <th className="border border-slate-600">Nama</th>
        </tr>
        {daftarpeserta.map((peserta) => (
          <tr>
            <td className="border border-slate-600">{peserta.uuid}</td>
            <td className="border border-slate-600">{peserta.nim}</td>
            <td className="border border-slate-600">{peserta.nama}</td>
          </tr>
        ))}
      </table>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/daftarpeserta");
  const daftarpeserta = await res.json();

  return {
    props: {
      daftarpeserta,
    },
  };
}
