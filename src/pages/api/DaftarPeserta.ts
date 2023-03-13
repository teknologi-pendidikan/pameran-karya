// @ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
require("dotenv").config();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fetch = require("cross-fetch");

  const SHEETS_ENDPOINT = `https://sheets.googleapis.com/v4/spreadsheets/1BDDtfwkzrbBoSAsm3EY1R8njzVTW-M-gi2zqL0m92mI/values/peserta?key=${process.env.GAPI_SPREADSHEETS}&majorDimension=COLUMNS`;

  fetch(SHEETS_ENDPOINT)
    .then((response) => response.json())
    .then((json) => {
      const output = [];
      const data = json.values;
      const uuid = data[0];
      const nim = data[1];
      const nama = data[2];

      for (let i = 1; i < data[0].length; i += 1) {
        const item = {
          uuid: uuid[i],
          nim: nim[i],
          nama: nama[i],
        };
        output.push(item);
      }
      res.json(output);
      return res.status(200).end();
    });
}


export const config = {
  api: {
    externalResolver: true,
  },
};