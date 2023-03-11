/* eslint-disable react/jsx-key */
// @ts-nocheck

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"


export default function DaftarPeserta({ daftarpeserta }) {
  const { data: session } = useSession()
  const [content, setContent] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/system/protected")
      const json = await res.json()
      if (json.content) {
        setContent(json.content)
      }
    }
    fetchData()
  }, [session])

  if (!session) {
    return (
      <div>
        <p>403: Not Authorized</p>
      </div>
    )
  }
  
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
