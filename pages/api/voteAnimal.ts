import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req:any, res:any) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    const results = JSON.parse(req.body)

    let winner = results.winner
    let loser = results.loser

    

    res.status(200).json({ message: 'Success' })
}