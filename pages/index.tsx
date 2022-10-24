/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Who Will Win?</title>
        <meta name="description" content="Find out who is the strongest animal?" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="h-screen w-screen flex flex-auto flex-col justify-around bg-black items-center">
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
    fetchAnimals()
  }, [])
  
  const fetchAnimals = async () => {
    setIsLoading(true)
    const res = await fetch('/api/getAnimals')
    const animals = await res.json()

    setAnimal1(animals.animal1)
    setAnimal2(animals.animal2)

    await axios.get(`/api/getAnimalPhoto?animal=${animals.animal1}`)
    .then((res) => {
      setAnimal1Image(res.data.photo)
    })

    await axios.get(`/api/getAnimalPhoto?animal=${animals.animal2}`)
    .then((res) => {
      setAnimal2Image(res.data.photo)
    })
    setTimeout(
      async () => {
        setIsLoading(false)
      }, 500)
  }

  const pickStrongerAnimal = (selection:number) => {
    if(selection === 0) {
      axios.post('/api/voteAnimal', {
        winner: animal1,
        loser: animal2
      })
    } 
    if(selection === 1) {
      axios.post('/api/voteAnimal', {
        winner: animal2,
        loser: animal1
      })
    }

    fetchAnimals()
  }

  if(isLoading) {
    return <div className="lds-hourglass text-center"></div>
  } else {
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
  
  
}

export default Home
