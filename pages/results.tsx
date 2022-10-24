import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

const Results: NextPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [animals, setAnimals] = useState<any[]>([])

    useEffect(() => {
        setIsLoading(true)
        axios.post('/api/getAllAnimals').then(res => {
            res.data.sort((a:any, b:any) => {
                return (parseInt(b.wins) / (parseInt(b.wins) + parseInt(b.loses))) - (parseInt(a.wins) / (parseInt(a.wins) + parseInt(a.loses)))
            })
            setAnimals(res.data)
        })
        setTimeout(
            async () => {
                setIsLoading(false) 
        }, 500)
    }, [])

    return (
        <div className="bg-black h-screen">
            <Head>
                <title>Who Will Win? - Results</title>
                <meta name="description" content="Find out who is the strongest animal?" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex flex-auto flex-col bg-black p-20">
                <h1 className="text-white text-center text-8xl font-mono">Results</h1>
                <AnimalList animals={animals} isLoading={isLoading}></AnimalList>
            </main>
        </div>
    )
}

type Animal = {
    animal: string,
    wins: string,
    loses: string
}

interface AnimalListProps {
    animals: any[],
    isLoading: boolean
}

const AnimalList: NextPage<AnimalListProps> = (props:AnimalListProps) => {
    if(props.isLoading) {
        return (
            <div className="lds-hourglass self-center"></div>
        )
    }
    return (
        <div className="divide-y">
            {
                props.animals.map((animal:Animal, index:number) => {
                    return (
                        <div key={index} className="flex flex-row justify-start p-2">
                            <h1 className="text-white text-4xl font-mono flex-1 text-start">{index + 1}. {animal.animal}</h1>
                            <div className="h-6 w-1/3 bg-gray-200 rounded-full self-center justify-self-end mr-2 dark:bg-gray-700 justify-items-center">
                                <div className="h-6 bg-blue-600 text-xl font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: `${(parseInt(animal.wins) / (parseInt(animal.wins) + parseInt(animal.loses)) * 100)}%`}}>{Math.round(parseInt(animal.wins) / (parseInt(animal.wins) + parseInt(animal.loses)) * 100)}%</div>
                            </div>
                            <h1 className="text-white text-center text-4xl font-mono justify-self-end">{animal.wins} wins, {animal.loses} loses</h1>
                        </div>
                    )
                })
            }
        </div>
   )
}

export default Results
