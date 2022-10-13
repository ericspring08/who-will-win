import { NextApiRequest, NextApiResponse } from "next"

const { Pool } = require('pg')

export default function handler(
    req: any,
    res: any
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
            res.json({
                animal_data: response.rows
            })
        }
    })
}