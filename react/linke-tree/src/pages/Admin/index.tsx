import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebaseConection";
import { ToastContainer, toast } from "react-toastify";
import { MyLink } from "../../components/MyLink";

export function Admin() {
  const [links, setLinks] = useState([]);
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkBgColor, setLinkBgColor] = useState("#ffffff");
  const [linkColor, setLinkColor] = useState("#000000");

  const notifySuccess = () => toast.success("Link adicionado com sucesso!", {
    theme: "colored",
  });

  const notifyError = () => toast.error("Esse link já esta em sua lsita de favoritos!", {
    theme: "colored",
  });

  function clearForm() {
    setLinkName("");
    setLinkUrl("");
    setLinkBgColor("#ffffff");
    setLinkColor("#000000");
  }

  async function handleForm(e: React.FormEvent) {
    e.preventDefault();


    if (!linkName || !linkUrl) {
      alert("Preencha todos os campos!");
      return;
    }

    await addDoc(collection(db, "links"), {
      name: linkName,
      url: linkUrl,
      bg: linkBgColor,
      color: linkColor,
      created: new Date()
    })
      .then(() => {
        notifySuccess()
        clearForm();
      })
      .catch((error) => {
        notifyError()
        console.error("Erro ao salvar o link: ", error);
      });
  }

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
      <ToastContainer />

      <div className="p-4">
        <form onSubmit={handleForm} className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col">
            <label htmlFor="" className="font-medium">Nome do Link</label>
            <Input onChange={(e) => setLinkName(e.target.value)} value={linkName} type="text" placeholder="Digite o nome do link..." />
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="font-medium">Url do Link</label>
            <Input onChange={(e) => setLinkUrl(e.target.value)} value={linkUrl} type="url" placeholder="Digite a url do link..." />
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-row gap-4 items-center">
              <label htmlFor="" className="font-medium">Fundo do Link</label>
              <Input onChange={(e) => setLinkBgColor(e.target.value)} value={linkBgColor} type="color" className="p-0" />
            </div>

            <div className="flex flex-row gap-4 items-center">
              <label htmlFor="" className="font-medium">Cor do Link</label>
              <Input onChange={(e) => setLinkColor(e.target.value)} value={linkColor} type="color" className="p-0" />
            </div>
          </div>

          {linkName !== '' && (
            <div className="mt-8 flex items-center justify-start flex-col mb-8 p-2 border-gray-100/25 border rounded-md">
              <label htmlFor="" className="text-white tonf-medium my-2">Veja como está ficando</label>
              <article className="w-11/12 max-w-lg flex flex-col items-center justify-center rounded-sm px-1 py-2 my-2 bg-zinc-900" style={{ backgroundColor: linkBgColor, color: linkColor }}>
                <p className="font-medium">{linkName}</p>
              </article>
            </div>
          )}

          <div className="flex items-center justify-center">
            <button type="submit" className="font-bold w-full md:w-1/2 py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-800">Cadastrar</button>
          </div>
        </form>

        <h2 className="font-bold text-3xl text-center mb-4">
          Meus Links
        </h2>

        <article className="flex flex-col gap-4">
          {
            links.length === 0 ? (
              <p className="text-center">Nenhum link cadastrado...</p>
            ) : (
              links.map((item: any) => (
                <MyLink
                  key={item.id}
                  id={item.id}
                  url={item.url}
                  link={item.name}
                  bgColor={item.bg}
                  color={item.color}
                />
              ))
            )
          }
        </article>
      </div>
    </>
  )
}