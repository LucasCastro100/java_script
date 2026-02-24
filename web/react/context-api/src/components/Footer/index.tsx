import { useContext } from "react";
import { UserContext } from "../../context/user"; 

export function Footer() {
    const { qtdAlunos, countAunos } = useContext(UserContext);

    return (
        <footer className="font-5xl text-center flex flex-col items-center justify-center gap-4">            
            <p>Aluinos online: {qtdAlunos}</p>
            <button className="flex flex-co gap-8 border border-sm border-black p-y2 px-4" onClick={() => countAunos(qtdAlunos)}>Adicionar aluno</button>

        </footer>
    );
}