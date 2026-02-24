import { useEffect, useState, type FormEvent } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'

export interface CoinProps {
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
  const [input, setInput] = useState('')
  const [coins, setCoins] = useState<CoinProps[]>([])
  const [totalPage, setTotalPages] = useState(0)
  const [selectedLimit, setSelectedLimit] = useState("10")
  const [offset, setOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate()

  async function totalPages() {
    await fetch(`https://rest.coincap.io/v3/assets?apiKey=${import.meta.env.VITE_COIN_API_KEY}`)
      .then(response => response.json())
      .then((data) => {
        pagination(data.data.length)
      })
  }

  function pagination(total_pages: number) {
    console.log(`total pagina: ${total_pages}\nLimite por pagina: ${selectedLimit}\nPaginas: ${total_pages / Number(selectedLimit)}`)

    setTotalPages(total_pages / Number(selectedLimit))
  }

  async function loadCoins(qtd_coins: string, qtd_offset: number) {
    const qtd = Number(qtd_coins)

    await fetch(`https://rest.coincap.io/v3/assets?limit=${qtd}&offset=${qtd_offset}&apiKey=${import.meta.env.VITE_COIN_API_KEY}`)
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
        // console.log(formatedResult)
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

  //Quando totalPage mudar, reseta tudo e recarrega a primeira página
  useEffect(() => {
    totalPages()
    setCurrentPage(0);
    setOffset(0);
    if (totalPage > 0) {
      loadCoins(selectedLimit, 0);
    }
  }, [totalPage, selectedLimit]);

  return (
    <div className="p-4">
      <form className="w-full flex flex-row gap-4" onSubmit={handleSubmit}>
        <input
          size={30}
          type="text"
          placeholder="Digite o nome de uma moeda digital EX: bitcoin"
          className="flex-1 bg-white text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
          }}
        />

        <button type="submit" className='flex items-center justify-center border-blue-500 bg-white rounded-md p-2'>
          <BsSearch size={20} color='#000' />
        </button>
      </form>

      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="" className='text-white'>Quantidade </label>
          <select
            value={selectedLimit}
            onChange={(e) => {
              setSelectedLimit(e.target.value)
              loadCoins(selectedLimit, offset)
            }}
            className="border bg-white p-2 rounded"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>

        <div className="flex-1 flex items-center justify-center">
          {totalPage > 0 ? (
            <div className='flex flex-col gap-2 items-center justify-center'>
              <div className="w-full text-center text-white">Paginação</div>
              <div className="flex flex-row gap-2 items-center justify-center">
                {Array.from({ length: totalPage }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const newOffset = i * Number(selectedLimit);
                      setCurrentPage(i);
                      setOffset(newOffset);
                      loadCoins(selectedLimit, newOffset); // 👈 usa o valor direto
                    }}
                    className={`px-3 py-1 rounded transition-all duration-150 ${currentPage === i
                      ? "bg-blue-800 text-white scale-105"
                      : "bg-blue-400 text-white hover:bg-blue-800"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="">
              <p className="text-red-600 font-bold text-center w-full">SEM PAGINAÇÃO</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full overflow-x-auto mt-4">
        <table className="w-full min-w-max  border-separate border-spacing-x-0 border-spacing-y-4 text-center">
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
                      <td className="px-4 py-2 font-bold rounded-l-md bg-gray-900">
                        <Link to={`/detail/${coin.id}`} className='flex flex-row gap-2 items-center'>
                          <img alt={`Logo Cripto ${coin.name}`} src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`} className='' />

                          <div className="flex flex-col ">
                            <span>{coin.name}</span>
                            <span className='uppercase text-gray-500 text-start'>{coin.symbol}</span>
                          </div>
                        </Link>
                      </td>

                      <td className="px-4 py-2 font-bold bg-gray-900">
                        {coin.formatedMarket}
                      </td>

                      <td className="px-4 py-2 font-bold bg-gray-900">
                        {coin.formatedPrice}
                      </td>

                      <td className="px-4 py-2 font-bold bg-gray-900">
                        {coin.formatedVolume}
                      </td>

                      <td className={`px-4 py-2 font-bold bg-gray-900 rounded-r-md ${Number(coin.changePercent24Hr) > 0 ? 'text-green-600' : 'text-red-600'}`}>
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
      </div>
    </div>
  )
}