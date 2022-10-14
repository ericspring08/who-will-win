import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

const Results: NextPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [animals, setAnimals] = useState<any[]>([])

    useEffect(() => {
        setIsLoading(true)
        fetch('/api/getAllAnimals').then(res => res.json()).then(data => {
            data.animal_data.sort((a:any, b:any) => {
                return (parseInt(b.wins) / (parseInt(b.wins) + parseInt(b.loses))) - (parseInt(a.wins) / (parseInt(a.wins) + parseInt(a.loses)))
            })
            setAnimals(data.animal_data)
        })
        setIsLoading(false)
    }, [])

    return (
        <div className="bg-black">
            <Head>
                <title>Results</title>
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

const AnimalList: NextPage = (props:any) => {
    if(props.isLoading) {
        return (
            <div className="text-white text-center text-4xl font-mono">Loading...</div>
        )
    }
    return (
        <div className="divide-y">
            {
                props.animals.map((animal:any, index:any) => {
                    return (
                        <div key={index} className="flex flex-row justify-between p-2">
                            <h1 className="text-white text-center text-4xl font-mono justify-self-start">{index + 1}. {animal.animal}</h1>
                            <h1 className="text-white text-center text-4xl font-mono justify-self-end">{parseInt(animal.wins) / (parseInt(animal.wins) + parseInt(animal.loses)) * 100}%</h1>
                            <h1 className="text-white text-center text-4xl font-mono">{animal.wins} wins, {animal.loses} loses</h1>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Results