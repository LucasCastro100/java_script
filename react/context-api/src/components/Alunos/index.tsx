import { Nome } from "../Nome";
import React, { useContext } from "react"
import { UserContext } from "../../context/user"

export function Alunos(){
    const { qtdAlunos, mudarNome } = useContext(UserContext)

    return(
        <h3 className="font-5xl text-center flex flex-col items-center justify-center gap-4">
            Quantidade de alunos: {qtdAlunos}

            <button className="flex flex-co gap-8 border border-sm border-black p-y2 px-4" onClick={() => mudarNome("Sara | Laura")}>Altera nome para Sara | Laura</button>
            <Nome/>
        </h3>
    )
}