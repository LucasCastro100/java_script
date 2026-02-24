import { deleteDoc, doc } from "firebase/firestore";
import { FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import { db } from "../services/firebaseConection";
import { toast } from "react-toastify";

interface MyLinkProps {
    id: string;
    url: string;
    link: string;
    bgColor: string;
    color: string;
}

export function MyLink({ id, url, link, bgColor, color }: MyLinkProps) {
    const notifySuccess = () => toast.success("Link removido com sucesso!", {
        theme: "colored",
      });
    
      const notifyError = () => toast.error("Erro ao remover o link!", {
        theme: "colored",
      });

    async function handleDeleteLink(idLink: string) {
        const docRef = doc(db, "links", idLink);        

        await deleteDoc(docRef)
        .then(() => {
            notifySuccess()
        })
        .catch((error) => {
            notifyError()
            console.error("Erro ao deletar o link: ", error);
        });
    }

    return (
        <div className="flex flex-row items-center justify-between px-4 py-2 rounded-md" style={{ backgroundColor: bgColor }}>
            <Link key={id} to={url} target="_blank" className="font-medium">
                <p style={{ color: color }}>{link}</p>
            </Link>

            <button className="border border-white border-dashed p-1 cursor-pointer" onClick={() => handleDeleteLink(id)}>
                <FiTrash size={20} color="#fff" />
            </button>
        </div>
    );
}

// https://www.instagram.com/lucashcoliveira100/?igsh=MTU3YnUxcnp3MG5wZg%3D%3D#
// Instagram

// https://www.linkedin.com/in/lucas-oliveira-38993a202/
// Linkedin

// https://ideias.dev.br/
// Site Pessoal