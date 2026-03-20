'use client'

import React, { useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'
import {
    DateSelectArg,
    DatesSetArg
} from '@fullcalendar/core'

export function ServiceCalendar() {
    const calendarRef = useRef<FullCalendar>(null);
    const [tituloExibicao, setTituloExibicao] = useState('');

    const aoMudarDatas = (info: DatesSetArg) => {
        const mesNome = info.view.title;

        if (mesNome) {
            const tituloFormatado = mesNome.charAt(0).toUpperCase() + mesNome.slice(1);
            setTituloExibicao(tituloFormatado);
        }
    };

    const mudarDataManual = (mes: string, ano: string) => {
        const api = calendarRef.current?.getApi();
        if (api) {
            api.gotoDate(`${ano}-${mes}-01`);
        }
    };

    const aoSelecionarData = (selecao: DateSelectArg) => {
        const nomeServico = prompt("Título do Serviço:")
        if (nomeServico) {
            selecao.view.calendar.addEvent({
                id: String(Date.now()),
                title: nomeServico,
                start: selecao.startStr,
                allDay: true
            });
        }
    };

    const anos = Array.from({ length: 11 }, (_, i) => 2021 + i);
    const meses = [
        { v: '01', l: 'Janeiro' }, { v: '02', l: 'Fevereiro' }, { v: '03', l: 'Março' },
        { v: '04', l: 'Abril' }, { v: '05', l: 'Maio' }, { v: '06', l: 'Junho' },
        { v: '07', l: 'Julho' }, { v: '08', l: 'Agosto' }, { v: '09', l: 'Setembro' },
        { v: '10', l: 'Outubro' }, { v: '11', l: 'Novembro' }, { v: '12', l: 'Dezembro' }
    ];

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 text-left px-2">
                {tituloExibicao}
            </h2>

            <div className="flex flex-wrap items-end gap-4 p-4 bg-gray-50 rounded-t-xl border border-gray-200">
                <div className="flex flex-col text-left">
                    <label className="text-xs font-bold text-gray-500 mb-1 uppercase text-left">Mês</label>
                    <select
                        id="select-mes"
                        className="p-2 border rounded-md bg-white text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => mudarDataManual(e.target.value, (document.getElementById('select-ano') as HTMLSelectElement).value)}
                        defaultValue={String(new Date().getMonth() + 1).padStart(2, '0')}
                    >
                        {meses.map(m => <option key={m.v} value={m.v}>{m.l}</option>)}
                    </select>
                </div>

                <div className="flex flex-col text-left">
                    <label className="text-xs font-bold text-gray-500 mb-1 uppercase">Ano</label>
                    <select
                        id="select-ano"
                        className="p-2 border rounded-md bg-white text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => mudarDataManual((document.getElementById('select-mes') as HTMLSelectElement).value, e.target.value)}
                        defaultValue={new Date().getFullYear()}
                    >
                        {anos.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                </div>

                <button
                    onClick={() => calendarRef.current?.getApi().today()}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium transition-colors"
                >
                    Ir para Hoje
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-b-xl overflow-hidden shadow-sm text-left">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale={ptBrLocale}
                    selectable={true}
                    headerToolbar={false}
                    select={aoSelecionarData}

                    datesSet={aoMudarDatas}

                    height="600px"
                    fixedWeekCount={false}
                    eventContent={(info) => (
                        <div className="bg-indigo-600 text-white p-1 rounded text-xs truncate shadow-sm">
                            {info.event.title}
                        </div>
                    )}
                />
            </div>
        </div>
    );
}