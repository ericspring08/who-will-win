import type { NextApiRequest, NextApiResponse } from 'next'
import animals from './_animals'

function getRandomInt(min:number, max:number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

type Animals = {
  animal1: string
  animal2: string,
  animal1_photo: string,
  animal2_photo: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Animals>
) {
  let animal1 = animals[getRandomInt(0, animals.length)]
  let animal2 = animals[getRandomInt(0, animals.length)]

  let animal1_photo = ''
  let animal2_photo = ''

  const animal1_photo_res = fetch(`https://pixabay.com/api/?key=30553791-b79af191b7024567b4cd8a0f9&q=${animal1} animal&category=animals&image_type=photo&page=1&per_page=3`)
  animal1_photo_res.then(res => res.json()).then(data => {
    animal1_photo = data.hits[0].largeImageURL
  })

  const animal2_photo_res = fetch(`https://pixabay.com/api/?key=30553791-b79af191b7024567b4cd8a0f9&q=${animal2} animal&category=animals&image_type=photo&page=1&per_page=3`)
  animal2_photo_res.then(res => res.json()).then(data => {
    animal2_photo = data.hits[0].largeImageURL
  })

  res.status(200).json({
    animal1: animal1,
    animal2: animal2,
    animal1_photo: animal1_photo,
    animal2_photo: animal2_photo
  })
}

