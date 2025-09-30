import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConection";

function Post() {
    const [post, setPost] = useState([]);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [titleUpdate, setTitleUpdate] = useState('');
    const [autorUpdate, setAutorUpdate] = useState('');
    const { id } = useParams();

    async function loadPost() {
        const postRef = doc(db, "posts", id)

        await getDoc(postRef)
            .then((snapshot) => {
                setPost({
                    id: snapshot.id,
                    title: snapshot.data().title,
                    autor: snapshot.data().autor
                })

                setTitleUpdate(snapshot.data().title);
                setAutorUpdate(snapshot.data().autor);
            })
            .catch((error) => { console.log('Erro ao buscar o post' + error) })
    }

    useEffect(() => {
        loadPost()
    }, [])

    async function handleDelete() {
        const deleteRef = doc(db, "posts", id)
        await deleteDoc(deleteRef).then(() => { window.location.href = "/" }).catch((error) => { console.log('Erro ao deletar o post' + error) })
    }

    async function handleUpdate() {
        alert("Atualizar o post")
        const updateRef = doc(db, "posts", id)
        await updateDoc(updateRef, {
            title: titleUpdate,
            autor: autorUpdate
        }).then(() => {loadPost()}).catch((error) => { console.log('Erro ao atualizar o post' + error) })
    }

    return (
        <div className='container'>
            <div className="">
                <h3>Titulo: {post.title}</h3>
                <p>Autor: {post.autor}</p>
                <span>ID: {post.id}</span>
                <button onClick={handleDelete}>Excluir</button>
                <button onClick={() => setOpenUpdate(true)}>Atualizar</button>
            </div>

            {openUpdate && (

                <div className='areaAdd'>
                    <div className=''>
                        <label>Titulo</label>
                        <textarea value={titleUpdate} onChange={(e) => setTitleUpdate(e.target.value)} />
                    </div>

                    <div className=''>
                        <label>Autor</label>
                        <input type="text" value={autorUpdate} onChange={(e) => setAutorUpdate(e.target.value)} />
                    </div>

                    <button onClick={() => setOpenUpdate(false)}>Fechar</button>
                    <button onClick={handleUpdate}>Salvar</button>
                </div>
            )}
        </div>
    )
}

export default Post