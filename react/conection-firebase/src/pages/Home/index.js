import { useEffect, useState } from 'react'
import { db } from '../../firebaseConection'
import { doc, setDoc, collection, addDoc } from 'firebase/firestore'

function Home() {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState(collection(db, 'posts'))
    const [title, setTitle] = useState('')
    const [autor, setAutor] = useState('')
    const [openModal, setOpenModal] = useState(false)

    async function handleAdd() {
        // addDoc é usado para adicionar um novo documento com ID automático
        await addDoc(collection(db, 'posts'), {
            title: title,
            autor: autor
        }).then(() => {
            console.log("Sucesso ao cadastrar post!")
            setTitle('')
            setAutor('')
        }
        ).catch((error) => {
            console.log("Erro ao cadastrar" + error)
        })
    }
    

    useEffect(() => {
        setLoading(false)
        console.log(posts)
    }, [posts])

    return (
        <div className='container'>
            <h1 className='font-bold'>React Js + Firebase</h1>
            <h2>Meus Posts</h2>

            {loading && <p>Carregando...</p>}

            <button onClick={() => setOpenModal(true)}>Cadastrar Post</button>

            {openModal && (
                <div className='areaAdd'>
                    <div className=''>
                        <label>Titulo</label>
                        <textarea value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className=''>
                        <label>Autor</label>
                        <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} />
                    </div>

                    <button onClick={() => setOpenModal(false)}>Fechar</button>
                    <button onClick={handleAdd}>Salvar</button>
                </div>
            )}

        </div>
    )
}

export default Home