'use client'

import { FaSearch } from "react-icons/fa";
import { useState } from "react"
import { useRouter } from "next/navigation";

export function Input() {
    const [input, setIput] = useState('')
    const router = useRouter();

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if(input === "") return;

        console.log("Searching for:", input)
        router.push(``)
    }

    return (
        <form onSubmit={handleSearch} className="bg-gray-100 rounded-md w-full p-2 flex items-center justify-between">
            <input type="text" placeholder="Procurando algum jogo?..." className="h-full w-full outline-none" value={input} onChange={(e) => setIput(e.target.value)}
            />

            <button>
                <FaSearch color="#ea580c" size={20} />
            </button>
        </form>
    )
}