import { useContext } from "react"
import { UserContext } from "../../context/user"

export function Nome() {
    const { aluno } = useContext(UserContext)

    return (
        <h3 className="font-5xl text-center">
            Nome do alino: {aluno}
        </h3>
    )
}