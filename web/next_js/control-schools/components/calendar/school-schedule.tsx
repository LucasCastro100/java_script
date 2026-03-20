'use client'
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'
import { schoolClasses } from '@/app/data/mock-events'

export function SchoolSchedule() {
    return (
        <div className="calendar-container bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <FullCalendar
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                locale={ptBrLocale}

                // --- CONFIGURAÇÃO DA GRADE DE 50 MINUTOS ---
                slotDuration="00:50:00"      // Cada linha terá 50 minutos
                snapDuration="00:10:00"      // Precisão para arrastar (opcional)
                slotMinTime="08:00:00"       // Começa as 08:00
                slotMaxTime="18:00:00"       // Termina as 18:00
                allDaySlot={false}           // Remove a linha "o dia todo"

                // --- REMOVENDO AS DATAS (DEIXANDO SÓ SEGUNDA, TERÇA...) ---
                dayHeaderFormat={{ weekday: 'long' }} // Exibe apenas "Segunda-feira"
                headerToolbar={false}                 // Esconde botões de Próximo/Anterior e Data

                // --- MAPEANDO OS EVENTOS PARA O FORMATO RECORRENTE ---
                events={schoolClasses.map(aula => ({
                    title: aula.title,
                    daysOfWeek: aula.daysOfWeek, // [1, 3...]
                    startTime: aula.start,       // '08:00'
                    endTime: aula.end,           // '08:50'
                }))}

                // --- FORMATAÇÃO DA HORA NA LATERAL ---
                slotLabelFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: false
                }}

                height="auto"
                handleWindowResize={true}
            />

            <style jsx global>{`
                /* Estilização para parecer uma grade escolar limpa */
                .fc-v-event { 
                    background-color: #3b82f6 !important; 
                    border: none !important;
                    border-left: 4px solid #1d4ed8 !important; /* Barra lateral no evento */
                }
                .fc-timegrid-slot {
                    height: 4rem !important; /* Aumenta a altura da linha para caber o texto */
                }
                .fc .fc-col-header-cell-cushion {
                    text-transform: capitalize;
                    padding: 10px 0;
                    color: #475569;
                }
            `}</style>
        </div>
    )
}