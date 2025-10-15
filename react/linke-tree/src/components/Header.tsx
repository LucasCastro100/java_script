import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { auth } from '../services/firebaseConection';
import { signOut } from "firebase/auth";

export function Header() {
    async function handleLogout() {
        await signOut(auth)
    }

    return (
        <header className="p-4">
            <nav className='bg-white text-black items-center justify-between rounded-md flex flex-row gap-4 py-2 px-4'>
                <div className='flex flex-row gap-4'>
                    <Link to="/" className="text-xl font-bold text-gray-800">
                        Home
                    </Link>

                    <Link to="/admin" className="text-xl font-bold text-gray-800">
                        Meus Links
                    </Link>

                    <Link to="/admin/social" className="text-xl font-bold text-gray-800">
                        Redes Sociais
                    </Link>
                </div>

                <button onClick={handleLogout}><BiLogOut className='cursor-pointer' size={28} color='rgba(255, 50, 50, 0.75)' /></button>
            </nav>
        </header>
    )
}