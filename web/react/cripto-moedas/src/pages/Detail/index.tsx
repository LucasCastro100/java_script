import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { CoinProps } from '../Home'

interface ResponseData {
  data: CoinProps
}

interface ErrorData {
  error: string
}

type DataProps = ResponseData | ErrorData

export function Detail() {
  const { cripto } = useParams()
  const navigate = useNavigate()
  const [coin, setCoin] = useState<CoinProps>()
  const [loading, setLoading] = useState(true)

  async function getCoin() {
    try {
      await fetch(`https://rest.coincap.io/v3/assets/${cripto}?apiKey=${import.meta.env.VITE_COIN_API_KEY}`)
        .then((response) => response.json())
        .then((data: DataProps) => {
          if ("error" in data) {
            navigate('/')
            return
          }

          const price = Intl.NumberFormat('en-Us', {
            style: 'currency',
            currency: 'USD'
          })

          const priceCompact = Intl.NumberFormat('en-Us', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact'
          })

          const resultData = {
            ...data.data,
            formatedPrice: price.format(Number(data.data.priceUsd)),
            formatedMarket: priceCompact.format(Number(data.data.marketCapUsd)),
            formatedVolume: priceCompact.format(Number(data.data.volumeUsd24Hr)),
          }

          setCoin(resultData)
          setLoading(false)
        })
    } catch (error) {
      console.log(error)
      navigate('/')
    }
  }

  useEffect(() => {
    getCoin()
  }, [cripto])

  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-white">CARREGANDO...</h1>
      </div>
    )
  }

  return (
    <div className="p-4 bg-gray-800 rounded-md md:w-[400px] m-auto">
      <h1 className="text-white text-center text-3xl">{coin?.name}</h1>
      <h1 className="text-white text-center">{coin?.symbol}</h1>

      <div className="w-full flex flex-col gap-0.5 items-center justify-center mt-4">
        <img alt={`Logo Cripto ${coin?.name}`} src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`} className='' />

        <div className="text-white text-center">Preco: {coin?.formatedPrice}</div>
        <div className="text-white text-center">Volume: {coin?.formatedVolume}</div>
        <div className="text-white text-center">Mercado: {coin?.formatedMarket}</div>

        <div className="text-white text-center flex gap-2">Mudança 24H: <p className={`${Number(coin?.changePercent24Hr) > 0 ? 'text-green-600' : 'text-red-600'}`}>{Number(coin?.changePercent24Hr).toFixed(2)}%</p></div>
      </div>
    </div>
  )
}