import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export function Home() {
  const [cripto, setCripto] = useState('')
  async function handleForm(e: any) {
    e.preventDefault()

    alert(cripto)
    setCripto('')
  }

  return (
    <div className="p-4 mt-4">
      <form className="w-full flex flex-row gap-4">
        <input
          size={30}
          type="text"
          placeholder="Digite a Cripto Moeda"
          className="flex-1 bg-white text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={cripto}
          onChange={(e) => { setCripto(e.target.value) }}
        />

        <button type="submit" className='flex items-center justify-center border-blue-500 bg-white rounded-md p-2' onClick={handleForm}>
          <BsSearch size={20} color='#000' />
        </button>
      </form>

      <table className='mt-4 w-full text-white'>
        <thead>
          <tr>
            <th scope='col'>MOEDA</th>
            <th scope='col'>VALOR MERCADO</th>
            <th scope='col'>PREÇO</th>
            <th scope='col'>VOLUME</th>
            <th scope='col'>MUDANÇA 24H</th>
          </tr>
        </thead>

        <tbody id='tbody'>
          <tr>
            <td data-label="Moeda">
              <Link to="/detail/bitcoin" className='flex flex-row items-center gap-2'>
                <span>Bitcoin</span>
                <span className='uppercase text-gray-500'>BTC</span>
              </Link>
            </td>

            <td data-label="Valor Mercado">
              1T
            </td>

            <td data-label="Preco">
              8.000
            </td>

            <td data-label="Volume">
              500B
            </td>

            <td data-label="Mudanca">
              1.20
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}