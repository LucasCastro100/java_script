'use client'

import dynamic from 'next/dynamic'

const ServiceCalendar = dynamic(
    () => import('@/components/calendar/service-calendar').then(mod => mod.ServiceCalendar),
    {
        ssr: false,
        loading: () => <p>Carregando Calendário...</p>
    }
)

export default function ServicosPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Gestão de Serviços</h1>
            <div className="bg-white p-4 rounded-xl shadow">
                <ServiceCalendar />
            </div>
        </main>
    );
}