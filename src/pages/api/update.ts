// @ts-nocheck
import { NextApiRequest, NextApiResponse } from 'next'
const fetch = require('cross-fetch')

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get data submitted in request's body.
  const body = req.body

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log('body: ', body)

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.reason || !body.key) {
    // Sends a HTTP bad request error code
    return res.status(400).json({
      error: 'Missing reason or key'
    })
  }

  const WEBHOOK_URL = `https://api.netlify.com/build_hooks/640edb1876710f35d5103388?trigger_title=${body.key}::${body.reason}`

  fetch(WEBHOOK_URL, {
    method: 'POST'
  })

  // Sends a HTTP success code
  return res.status(200).json({
    success: true,
    reason: body.reason,
    key: body.key

  })
}

export const config = {
  api: {
    externalResolver: true,
  },
}