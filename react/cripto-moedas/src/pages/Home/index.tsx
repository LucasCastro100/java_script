import { useState, type FormEvent } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'

export function Home() {
  const [input, SetInput] = useState('')
  const navigate = useNavigate()
  const value: number = -1.20

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (input === '') return

    navigate(`/detail/${input}`)    
  }

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
        <table className="w-full min-w-max border-collapse border border-gray-300 text-center">
          <thead className="bg-gray-100">
            <tr className='rounded-md'>
              <th scope='col' className="px-4 py-2 font-bold">MOEDA</th>
              <th scope='col' className="px-4 py-2 font-bold">VALOR MERCADO</th>
              <th scope='col' className="px-4 py-2 font-bold">PREÇO</th>
              <th scope='col' className="px-4 py-2 font-bold">VOLUME</th>
              <th scope='col' className="px-4 py-2 font-bold">MUDANÇA 24H</th>
            </tr>
          </thead>

          <tbody id='tbody' className='bg-gray-100'>
            <tr>
              <td data-label="Moeda" className="px-4 py-2 font-bold">
                <Link to="/detail/bitcoin" className='flex flex-row items-center gap-2 justify-center'>
                  <span>Bitcoin</span>
                  <span className='uppercase text-gray-500'>BTC</span>
                </Link>
              </td>

              <td data-label="Valor Mercado" className="px-4 py-2 font-bold">
                1T
              </td>

              <td data-label="Preco" className="px-4 py-2 font-bold">
                8.000
              </td>

              <td data-label="Volume" className="px-4 py-2 font-bold">
                500B
              </td>

              {/* aqui se for positivo fica verde se nao fica vermelho */}
              <td data-label="Mudanca"  className={`px-4 py-2 font-bold ${value > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {value}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}