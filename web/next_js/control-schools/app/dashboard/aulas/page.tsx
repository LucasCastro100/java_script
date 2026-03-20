'use client'

import dynamic from 'next/dynamic'

const SchoolSchedule = dynamic(
    () => import('@/components/calendar/school-schedule').then(mod => mod.SchoolSchedule),
    { ssr: false }
)

export default function AulasPage() {
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Horários das Escolas</h1>
            <div className="bg-white p-4 rounded-xl shadow">
                <SchoolSchedule />
            </div>
        </main>
    )
}