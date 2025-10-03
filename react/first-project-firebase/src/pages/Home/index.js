import { useEffect, useState } from 'react'
import { auth, db } from '../../firebaseConection'
import { collection, onSnapshot, addDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { Link } from 'react-router-dom'

function Home() {
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [autor, setAutor] = useState('')
  const [openModal, setOpenModal] = useState(false)

  const [emailAuth, setEmailAuth] = useState('')
  const [passAuth, setPassAuth] = useState('')

  const [user, setUser] = useState(false)
  const [userDetail, setUserDetail] = useState({})

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

useEffect(() => {
  async function checkLogin() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // USUARIO PERMACE LOGADO
        
        setUserDetail({
        uid: user.uid,
        email: user.email
        }
      )
        console.log(user)
      } else {
        //USUARIO NAO ESTA LOGADO
        setUser(false)
        setUserDetail({})
      }
    })
  }

  checkLogin()
}, [])

  async function newUser() {
    await createUserWithEmailAndPassword(auth, emailAuth, passAuth)
      .then(() => {
        console.log('Usuário cadastrado com sucesso!')
        setEmailAuth('')
        setPassAuth('')
      })
      .catch((error) => {
        // TIPOS DE ERRO USANDO FIREBASE
        if (error.code === 'auth/weak-password') {
          alert('Senha muito fraca.')
        } else if (error.code === 'auth/email-already-in-use') {
          alert('Email já cadastrado.')
        } else if (error.code === 'auth/invalid-email') {
          alert('Email inválido.')
        }
      })
  }

  async function login(){
    await signInWithEmailAndPassword(auth, emailAuth, passAuth)
    .then((value) => {
      alert('Usuário logado com sucesso!')

      setUserDetail({
        uid: value.user.uid,
        email: value.user.email
      })

      setUser(true)

      setEmailAuth('')
      setPassAuth('')
    })
    .catch(() => {
      alert('E-mail ou senha inválidos')
    })
  }

  async function logout() {
    await signOut(auth)
    setUser(false)
    setUserDetail({})
  }

  return (
    <div className='container'>
      <div className='home p-1'>
        <h1 className='text-center text-size-5'>React Js + Firebase</h1>     

        <div className='auth'>
          <h2 className='text-center text-size-4'>Usuários</h2>
          <div>
            <label>Email:</label>
            <input type="text" value={emailAuth} onChange={(e) => setEmailAuth(e.target.value)} />
          </div>

          <div>
            <label>Senha:</label>
            <input type="password" value={passAuth} onChange={(e) => setPassAuth(e.target.value)} />
          </div>

          <div className=''>
            <button onClick={newUser} className='text-size-2'>Cadastrar</button>
            <button onClick={login} className='text-size-2'>Acessar</button>
          </div>

          {
          user && (
            <>
            <div>Seja bem vindo(a), vc ja esta logado!</div>
            <div>UID: {userDetail.uid}</div>  
            <div>E-mail: {userDetail.email}</div>  
            <button onClick={logout}>Sair</button>
            </>            
          )
        }   
        </div>

        <hr />
        <h2 className='text-center text-size-4'>Posts</h2>
        <div className='info-menu'>
          <p className='m-0 font-bold text-size-2'>Total de posts: {posts.length}</p>
          <button onClick={() => setOpenModal(true)} className='text-size-2'>Cadastrar Post</button>
        </div>

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

        <ul className='list-posts m-0 p-0 list-style-none'>
          {posts.map((post) => (
            <li key={post.id} className='post'>
              <h3 className='m-0'>Titulo: {post.title}</h3>
              <p className='m-0'>Autor: {post.autor}</p>
              <Link to={`/post/${post.id}`}>Acessar</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home
