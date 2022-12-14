import type { NextApiRequest, NextApiResponse } from 'next'

const { Pool } = require('pg')

export default function handler(req:NextApiRequest, res:NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    const results = req.body

    let winner = results.winner
    let loser = results.loser

    const pool = new Pool({
        connectionString: process.env.POSTGRESQL_KEY,
        ssl: {
            rejectUnauthorized: false
        }
    })

    pool.query('UPDATE animals SET wins = wins + 1 WHERE animal = $1', [winner], (err:any, res:any) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res.rows[0])
        }
    })

    pool.query('UPDATE animals SET loses = loses + 1 WHERE animal = $1', [loser], (err:any, res:any) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res.rows[0])
        }
    })

    res.status(200).json({ message: 'Success' })
}