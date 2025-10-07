import { useEffect, useState, type FormEvent } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'

interface CoinProps {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  vwap24Hr: string;
  changePercent24Hr: string;
  rank: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  explore: string;
  formatedPrice?: string
  formatedMarket?: string
  formatedVolume?: string
}

interface DataProps {
  data: CoinProps[];
}

export function Home() {
  const [input, SetInput] = useState('')
  const [coins, setCoins] = useState<CoinProps[]>([])
  const navigate = useNavigate()

  async function loadCoins() {
    await fetch(`https://rest.coincap.io/v3/assets?limit=10&offset=0&apiKey=${import.meta.env.VITE_COIN_API_KEY}`)
      .then(response => response.json())
      .then((data: DataProps) => {
        const coinsData = data.data

        const price = Intl.NumberFormat('en-Us', {
          style: 'currency',
          currency: 'USD'
        })

        const priceCompact = Intl.NumberFormat('en-Us', {
          style: 'currency',
          currency: 'USD',
          notation: 'compact'
        })

        const formatedResult = coinsData.map((item) => {
          const formated = {
            ...item,
            formatedPrice: price.format(Number(item.priceUsd)),
            formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
            formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr)),
          }

          return formated
        })
        console.log(formatedResult)
        setCoins(formatedResult)
      })
      .catch((error) => {
        console.log(`Erro ao buscar os dados: ${error}`)
      })
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (input === '') return

    navigate(`/detail/${input}`)
  }

  async function handleGetMore() {
    alert('Carregou mais')
    // console.log(`https://rest.coincap.io/v3/assets?limit=10&offset=0&apiKey=${import.meta.env.VITE_COIN_API_KEY}`)
  }

  useEffect(() => {
    loadCoins()
  }, [])

  return (
    <div className="p-4">
      <form className="w-full flex flex-row gap-4" onSubmit={handleSubmit}>
        <input
          size={30}
          type="text"
          placeholder="Digite o nome de uma moeda digital EX: bitcoin"
          className="flex-1 bg-white text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => { SetInput(e.target.value) }}
        />

        <button type="submit" className='flex items-center justify-center border-blue-500 bg-white rounded-md p-2'>
          <BsSearch size={20} color='#000' />
        </button>
      </form>

      <div className="w-full overflow-x-auto mt-4">
        <table className="w-full min-w-max border-separate border-spacing-x-0 border-spacing-y-4 text-center">
          <thead className="text-white">
            <tr>
              <th scope='col' className="px-4 py-2 font-bold">MOEDA</th>
              <th scope='col' className="px-4 py-2 font-bold">VALOR MERCADO</th>
              <th scope='col' className="px-4 py-2 font-bold">PREÇO</th>
              <th scope='col' className="px-4 py-2 font-bold">VOLUME</th>
              <th scope='col' className="px-4 py-2 font-bold">MUDANÇA 24H</th>
            </tr>
          </thead>

          <tbody id='tbody' className='text-white'>
            {coins.length > 0 ? (
              <>
                {coins.map((coin) => {
                  return (
                    <tr key={coin.id} >
                      <td data-label="Moeda" className="px-4 py-2 font-bold rounded-l-md bg-gray-900">
                        <Link to={`/detail/${coin.id}`} className='flex flex-row gap-2 items-center'>
                          <img alt={`Logo Cripto ${coin.name}`} src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`} className=''/>

                          <div className="flex flex-col ">
                            <span>{coin.name}</span>
                            <span className='uppercase text-gray-500 text-start'>{coin.symbol}</span>
                          </div>
                        </Link>
                      </td>

                      <td data-label="Valor Mercado" className="px-4 py-2 font-bold bg-gray-900">
                        {coin.formatedMarket}
                      </td>

                      <td data-label="Preco" className="px-4 py-2 font-bold bg-gray-900">
                        {coin.formatedPrice}
                      </td>

                      <td data-label="Volume" className="px-4 py-2 font-bold bg-gray-900">
                        {coin.formatedVolume}
                      </td>

                      {/* aqui se for positivo fica verde se nao fica vermelho */}
                      <td data-label="Mudanca" className={`px-4 py-2 font-bold bg-gray-900 rounded-r-md ${Number(coin.changePercent24Hr) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {Number(coin.changePercent24Hr).toFixed(2)}%
                      </td>
                    </tr>
                  )
                })}
              </>
            ) : (
              <tr className="">
                <th colSpan={5} className='text-2xl'>OPS... Nenhuma moeda encontrada!</th>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-4">
          <button className='py-2 px-4 rounded-md text-white font-bold bg-blue-400 hover:bg-blue-800' onClick={handleGetMore}>Carregar Mais</button>
        </div>
      </div>
    </div>
  )
}