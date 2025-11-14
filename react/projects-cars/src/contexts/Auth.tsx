import { ReactNode, createContext, useState, useEffect } from "react";
import { User } from "../types/User";
import { auth } from "../services/firebaseConection";
import { onAuthStateChanged } from "firebase/auth";

interface AuthProviderProps {
    children: ReactNode   
}

type AuthContextData = {
    signed: boolean
    loadingAuth: boolean
    user: User | null
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [loadingAuth, setLoadingAuth] = useState(true)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    name: user?.displayName,
                    email: user?.email
                })

                setLoadingAuth(false)
            } else {
                setUser(null)
                setLoadingAuth(false)
            }
        })

        return () => { unsub() }
    }, [])

    return (
        <AuthContext.Provider value={{ signed: !!user, loadingAuth, user }} >
            {children}
        </AuthContext.Provider>
    )
}


