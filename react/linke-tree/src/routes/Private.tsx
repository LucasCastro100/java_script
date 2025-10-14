// Aqui vamos proteger e veriricar se o usuario esta logado apra acessar as rotas privadas

import { useState, useEffect, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../services/firebaseConection';
import { onAuthStateChanged } from 'firebase/auth';

interface PrivateProps {
    children: ReactNode;
}

export function Private({ children }: PrivateProps): any {
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false); // aqui vamos verificar se o usuario esta logado

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Usuario logado
                const userData = {
                    uid: user.uid,
                    email: user.email,
                };
                
                localStorage.setItem('@reactLinks', JSON.stringify(userData));
                setLoading(false);
                setSigned(true);

            } else {
                // Usuario deslogado
                setLoading(false);
                setSigned(false);                
            }
        });

        return () => unsub();
    }, []);

    if (loading) {
        return <div></div>;
    }

    if (!signed) {
        return <Navigate to='/' />;
    }
   

    return children;
}