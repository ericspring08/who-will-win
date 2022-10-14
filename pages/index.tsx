/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Who Will Win?</title>
        <meta name="description" content="Find out who is the strongest animal?" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="h-screen w-screen flex flex-auto flex-col justify-around bg-black">
          <h1 className="text-white text-center text-8xl font-mono">Who Will Win?</h1>
          <PickAnimal></PickAnimal>
          <div className='flex flex-row justify-center'>
                <Link href='/results'><div className= 'text-2x text-white p-4'>Results</div></Link>
          </div>
        </div>
      </main>
    </div>
  )
}

const PickAnimal: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [animal1, setAnimal1] = useState('')
  const [animal2, setAnimal2] = useState('')

  const [animal1Image, setAnimal1Image] = useState('')
  const [animal2Image, setAnimal2Image] = useState('')

  useEffect(() => {
    setIsLoading(true)
    fetchAnimals()
    setIsLoading(false)
  }, [])
  
  const fetchAnimals = async () => {
    const res = await fetch('/api/getAnimals')
    const animals = await res.json()

    setAnimal1(animals.animal1)
    setAnimal2(animals.animal2)

    const animal1_photo_res = fetch(`https://pixabay.com/api/?key=30553791-b79af191b7024567b4cd8a0f9&q=${animals.animal1} animal&category=animals&image_type=photo&page=1&per_page=3`)
    animal1_photo_res.then(res => res.json()).then(data => {
      setAnimal1Image(data.hits[0].largeImageURL)
    })

    const animal2_photo_res = fetch(`https://pixabay.com/api/?key=30553791-b79af191b7024567b4cd8a0f9&q=${animals.animal2} animal&category=animals&image_type=photo&page=1&per_page=3`)
    animal2_photo_res.then(res => res.json()).then(data => {
      setAnimal2Image(data.hits[0].largeImageURL)
    })
  }

  const pickStrongerAnimal = (selection:number) => {
    if(selection === 0) {
      fetch('/api/voteAnimal', {
        method: 'POST',
        body: JSON.stringify({
          winner: animal1,
          loser: animal2
        })
      })
    } 
    if(selection === 1) {
      fetch('/api/voteAnimal', {
        method: 'POST',
        body: JSON.stringify({
          winner: animal2,
          loser: animal1
        })
      })
    }

    fetchAnimals()
  }

  if(isLoading) {
    return <div className='text-white text-center text-2xl'>Loading...</div>
  }
  
  return (
    <div>
      <div className="flex flex-wrap flex-row justify-around items-center">
        <div className='flex flex-col justify-between items-center'>
          <img alt='first animal' src={animal1Image} className='rounded p-12 max-h-96' onClick={() => {
            pickStrongerAnimal(0)
          }} onLoad={() => {
            setIsLoading(false)
          }}/>
          <div className='text-white p-4 text-3xl'>{animal1}</div>
        </div>
        <div className="text-white text-xl">VS.</div>
        <div className='flex flex-col justify-between items-center'>
          <img alt='second animal' src={animal2Image} className='rounded p-12 max-h-96' onClick={() => {
            pickStrongerAnimal(1)
          }} onLoad={() => {
            setIsLoading(false)
          }}/>
          <div className='text-white p-4 text-3xl'>{animal2}</div>
        </div>
      </div>
    </div>
  )
}

export default Home
