import { useState } from 'react'
import { db } from '../../firebaseConection'
import { doc, setDoc, collection, addDoc, getDoc, getDocs } from 'firebase/firestore'

function Home() {
    const [posts, setPosts] = useState([])
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

    async function loadPosts() {
        const postsRef = collection(db, "posts")

        await getDocs(postsRef)
            .then((snapshot) => {
                let list = []
                snapshot.forEach((doc) => {
                    list.push({
                        id: doc.id,
                        title: doc.data().title,
                        autor: doc.data().autor
                    })
                })
                setPosts(list)
            })
            .catch((error) => { console.log('Erro ao buscar os posts' + error) })
    }

    return (
        <div className='container'>
            <h1 className='font-bold'>React Js + Firebase</h1>
            <h2>Meus Posts</h2>

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
                    <button onClick={loadPosts}>Listar Posts</button>
                </div>
            )}

            {posts.map((post) => {
                return (
                    <div key={post.id} className='post'>
                        <h3>{post.title}</h3>
                        <p>{post.autor}</p>
                        <span>ID: {post.id}</span>
                    </div>
                )
            })}

        </div>
    )
}

export default Home