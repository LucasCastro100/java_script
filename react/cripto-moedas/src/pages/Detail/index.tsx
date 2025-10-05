import { useParams } from "react-router-dom"

export function Detail(){
    const {cripto} = useParams()

    return (
        <div className="p-4">
          <h1 className="text-white">Sobre - Cripto Moedas {cripto}</h1>
        </div>
      )
}