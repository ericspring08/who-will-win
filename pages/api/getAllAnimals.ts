import { NextApiRequest, NextApiResponse } from "next"

const { Pool } = require('pg')

type AnimalLeaderboard = {
    animal: string,
    wins: number,
    loses: number
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<AnimalLeaderboard>
  ) {
    const pool = new Pool({
        connectionString: 'postgresql://ericspring08:v2_3um6G_tLnx5FWVHu5cHMqBPZejvPe@db.bit.io/ericspring08/whowillwin',
        ssl: {
            rejectUnauthorized: false
        }
    })

    pool.query('SELECT * FROM animals ORDER BY wins DESC', (err:any, response:any) => {
        if (err) {
            console.log("error")
        } else {
            res.json(response.rows)
        }
    })
}