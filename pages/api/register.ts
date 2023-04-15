// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../helper/supabaseClient'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const {email , password} =  req.body
    let data = await supabase.auth.signUp(
        {email, password}
    )

    console.log(data)

  res.status(200).json({ name: 'John Doe' })
}
