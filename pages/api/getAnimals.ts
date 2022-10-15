import type { NextApiRequest, NextApiResponse } from 'next'
import animals from './_animals'

function getRandomInt(min:number, max:number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

type Animals = {
  animal1: string
  animal2: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Animals>
) {
  let animal1 = animals[getRandomInt(0, animals.length)]
  let animal2 = animals[getRandomInt(0, animals.length)]

  res.status(200).json({
    animal1: animal1,
    animal2: animal2,
  })
}

