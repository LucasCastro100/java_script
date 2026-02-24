import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebaseConection";
import { Link } from "react-router-dom";

export function Home() {
  const [links, setLinks] = useState([]);

  async function loadLinks() {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const querySnapshot = onSnapshot(queryRef, (snapshot) => {
      let myLinks: any = [];

      snapshot.forEach((doc) => {
        myLinks.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        })
      })

      setLinks(myLinks)
    });

    return () => querySnapshot();
  }

  useEffect(() => {
    loadLinks()
  }, [])

  return (
    <>
      <Header />

      <div className="flex flex-col gap-4 items-center justify-center p-4">
        <h1 className="text-3xl">Home</h1>
        <span className="text-1xl">Veja meus links</span>

        <div className="flex flex-col gap-4 items-center justify-center w-full md:max-w-4xl mt-8">
          <article className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {
              links.length === 0 ? (
                <p className="text-center">Nenhum link cadastrado...</p>
              ) : (
                links.map((item: any) => (
                  <Link key={item.id} to={item.url} target="_blank" className="px-4 py-2 rounded-md font-medium" style={{ color: item.color, backgroundColor: item.bg }}>
                    {item.name}
                  </Link>
                ))
              )
            }
          </article>
        </div>
      </div>
    </>
  )
}