import { useEffect, useState } from 'react'
import { db } from '../../firebaseConection'
import { doc, setDoc, collection, addDoc, getDoc, getDocs, onSnapshot } from 'firebase/firestore'
import { Link } from 'react-router-dom'

function Home() {
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [autor, setAutor] = useState('')
  const [openModal, setOpenModal] = useState(false)

  async function handleAdd() {
    try {
      await addDoc(collection(db, 'posts'), {
        title: title,
        autor: autor
      })
      console.log("Sucesso ao cadastrar post!")
      setTitle('')
      setAutor('')
    } catch (error) {
      console.log("Erro ao cadastrar: " + error)
    }
  }

  useEffect(() => {
    // escuta em tempo real os posts
    const unsub = onSnapshot(collection(db, 'posts'), (snapshot) => {
      let listPosts = []
      snapshot.forEach((doc) => {
        listPosts.push({
          id: doc.id,
          title: doc.data().title,
          autor: doc.data().autor
        })
      })
      setPosts(listPosts)
    })

    // cleanup para não acumular listeners
    return () => unsub()
  }, [])

  return (
    <div className='container'>
      <h1>React Js + Firebase</h1>
      <h2>Meus Posts</h2>

      <button onClick={() => setOpenModal(true)}>Cadastrar Post</button>

      {openModal && (
        <div className='areaAdd'>
          <div>
            <label>Titulo</label>
            <textarea value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <label>Autor</label>
            <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} />
          </div>

          <button onClick={() => setOpenModal(false)}>Fechar</button>
          <button onClick={handleAdd}>Salvar</button>
        </div>
      )}

      {posts.map((post) => (
        <div key={post.id} className='post'>
          <h3>Titulo: {post.title}</h3>
          <p>Autor: {post.autor}</p>
          <span>ID: {post.id}</span>
          <Link to={`/post/${post.id}`}>Acessar</Link>
        </div>
      ))}
    </div>
  )
}

export default Home
