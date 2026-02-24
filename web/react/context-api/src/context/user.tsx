import { createContext, useState, type ReactNode } from 'react'

interface UserProviderProps {
    children: ReactNode
}

type UserContextData = {
    aluno: string
    qtdAlunos: number
    mudarNome: (novoNome: string) => void
    countAunos: (addAluno: number) => void
}

export const UserContext = createContext({} as UserContextData)

export function UserProvider({children}: UserProviderProps) {
    const [aluno, setAluno] = useState('Lucas | Kathelin');
    const [qtdAlunos, setQtdAlunos] = useState(35);    

    function mudarNome(novoNome: string) {
        setAluno(novoNome)
    }

    function countAunos() {
        setQtdAlunos(alunos => alunos + 1)
    }

    return (
        <UserContext.Provider value={{ aluno, qtdAlunos, mudarNome, countAunos }}>
            {children}
        </UserContext.Provider>
    )
}