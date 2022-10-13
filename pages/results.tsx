import { NextPage } from "next";
import { useEffect, useState } from "react";

const Results: NextPage = () => {

    const [animals, setAnimals] = useState<any[]>([])

    useEffect(() => {
        fetch('/api/getAllAnimals').then(res => res.json()).then(data => {
            data.animal_data.sort((a:any, b:any) => {
                return (b.wins - b.loses) - (a.wins - a.loses)
            })
            setAnimals(data.animal_data)
        })
    }, [])

    return (
        <main className="flex flex-auto flex-col bg-black p-20">
            <h1 className="text-white text-center text-8xl font-mono">Results</h1>
            {
                animals.map((animal, index) => {
                    return (
                        <div key={index} className="flex flex-row justify-between">
                            <h1 className="text-white text-center text-4xl font-mono justify-self-start">{index + 1}. {animal.animal}</h1>
                            <h1 className="text-white text-center text-4xl font-mono">{animal.wins} wins, {animal.loses} loses</h1>
                        </div>
                    )
                })
            }
        </main>
    )
}

export default Results