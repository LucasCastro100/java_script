import { useState } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";

export function Admin() {
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkBgColor, setLinkBgColor] = useState("#ffffff");
  const [linkColor, setLinkColor] = useState("#000000");

  function handleForm(e: React.FormEvent) {
    e.preventDefault();

    if (!linkName || !linkUrl) {
      alert("Preencha todos os campos!");
      return;
    }

    console.log({
      linkName,
      linkUrl,
      linkBgColor,
      linkColor
    })
  }

  return (
    <>
      <Header />

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
          <div className="flex .flex-row items-center justify-between px-4 py-2 rounded-md bg-zinc-900">
            <Link to={""} target="_blank" className="font-medium">
              <p> teste</p>
            </Link>

            <button>
              <FiTrash size={20} color="#fff" />
            </button>
          </div>
        </article>
      </div>
    </>
  )
}