// @ts-nocheck
import { NextApiRequest, NextApiResponse } from 'next'
const fetch = require('cross-fetch')

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body

  if (!body.reason || !body.key) {
    return res.status(400).json({
      error: 'Missing reason or key'
    })
  }

  if (body.key !== process.env.REVALIDATE_SECRET) {

    const WEBHOOK_URL = `https://api.netlify.com/build_hooks/640edb1876710f35d5103388?trigger_title=${body.key}::${body.reason}`

    fetch(WEBHOOK_URL, {
      method: 'POST'
    })

    // Sends a HTTP success code
    return res.status(200).json({
      mode: 'build',
      reason: body.reason,
      key: body.key,
      success: true

    })
  } else {
    // Sends a HTTP success code
    fetch(`${process.env.URL}/api/revalidate?key=${process.env.REVALIDATE_SECRET}`, {
      method: 'GET',
    }).then((response) => response.json())
      .then((json) => {
        return res.status(200).json({
          mode: 'revalidate',
          reason: body.reason,
          key: body.key,
          success: json.revalidated
        })
      })
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
}