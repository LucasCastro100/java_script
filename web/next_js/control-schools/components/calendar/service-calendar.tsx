'use client'

import React, { useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'
import { DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core'
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

// Shadcn e Componentes de UI que você já possui
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Clock } from 'lucide-react'
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError
} from "@/components/ui/field"

// Import do Schema centralizado
import {
    calendarServiceFormSchema,
    type calendarServiceFormSchemaValues
} from '@/app/schemas/calendar-service-schema'

export function ServiceCalendar() {
    const calendarRef = useRef<FullCalendar>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modo, setModo] = useState<'criar' | 'editar'>('criar');

    const [selecaoAtual, setSelecaoAtual] = useState<DateSelectArg | null>(null);
    const [eventoAtual, setEventoAtual] = useState<EventApi | null>(null);

    // Configuração do formulário com o tipo importado
    const form = useForm<calendarServiceFormSchemaValues>({
        resolver: zodResolver(calendarServiceFormSchema),
        defaultValues: {
            titulo: "",
            descricao: "",
            horario: "12:00"
        },
    })

    const aoSelecionarData = (selecao: DateSelectArg) => {
        setModo('criar');
        setSelecaoAtual(selecao);
        form.reset({ titulo: "", descricao: "", horario: "12:00" });
        setIsModalOpen(true);
    };

    const aoClicarNoEvento = (info: EventClickArg) => {
        setModo('editar');
        setEventoAtual(info.event);
        form.reset({
            titulo: info.event.title,
            descricao: info.event.extendedProps.descricao || "",
            horario: info.event.extendedProps.horario || "12:00",
        });
        setIsModalOpen(true);
    };

    function onSubmit(values: calendarServiceFormSchemaValues) {
        if (modo === 'criar' && selecaoAtual) {
            selecaoAtual.view.calendar.addEvent({
                id: crypto.randomUUID(),
                title: values.titulo,
                start: `${selecaoAtual.startStr}T${values.horario}:00`,
                allDay: false,
                extendedProps: {
                    descricao: values.descricao,
                    horario: values.horario
                },
            });
        } else if (modo === 'editar' && eventoAtual) {
            eventoAtual.setProp('title', values.titulo);
            eventoAtual.setExtendedProp('descricao', values.descricao);
            eventoAtual.setExtendedProp('horario', values.horario);

            const dataBase = eventoAtual.startStr.split('T')[0];
            eventoAtual.setStart(`${dataBase}T${values.horario}:00`);
        }
        setIsModalOpen(false);
    }

    const excluirEvento = () => {
        if (eventoAtual) {
            eventoAtual.remove();
            setIsModalOpen(false);
        }
    };

    return (
        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="calendar-container 
                [&_.fc-toolbar-title]:text-xl [&_.fc-toolbar-title]:font-bold [&_.fc-toolbar-title]:capitalize [&_.fc-toolbar-title]:text-gray-800 
                [&_.fc-button]:bg-white [&_.fc-button]:text-gray-600 [&_.fc-button]:border-gray-200 [&_.fc-button]:hover:bg-gray-50 [&_.fc-button]:shadow-sm
                [&_.fc-button-primary:not(:disabled).fc-button-active]:bg-gray-100 [&_.fc-button-primary:not(:disabled).fc-button-active]:text-blue-600 
                [&_.fc-scrollgrid]:border-none [&_.fc-theme-standard_td]:border-gray-100 [&_.fc-theme-standard_th]:border-transparent 
                [&_.fc-col-header-cell]:py-3 [&_.fc-col-header-cell]:bg-gray-50/50 [&_.fc-col-header-cell]:text-gray-500 [&_.fc-col-header-cell]:text-xs [&_.fc-col-header-cell]:uppercase
                [&_.fc-day-today]:bg-blue-50/60 [&_.fc-day-today_.fc-daygrid-day-number]:text-blue-600 [&_.fc-day-today_.fc-daygrid-day-number]:font-bold 
                [&_.fc-daygrid-day-number]:text-sm [&_.fc-daygrid-day-number]:p-2 [&_.fc-daygrid-day-number]:text-gray-600 
                [&_.fc-event]:cursor-pointer [&_.fc-event]:transition-transform [&_.fc-event:hover]:scale-[1.02]
            ">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale={ptBrLocale}
                    selectable={true}
                    select={aoSelecionarData}
                    eventClick={aoClicarNoEvento}
                    headerToolbar={{ left: 'prev,next today', center: 'title', right: '' }}
                    height="auto"
                    fixedWeekCount={false}
                    eventContent={(info) => (
                        <div className="bg-indigo-600 text-white px-2 py-1 rounded-md text-[10px] sm:text-xs shadow-sm mx-1">
                            <div className="flex items-center gap-1 opacity-80">
                                <Clock size={10} /> {info.event.extendedProps.horario}
                            </div>
                            <div className="font-bold truncate">{info.event.title}</div>
                        </div>
                    )}
                />
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{modo === 'criar' ? 'Agendar Serviço' : 'Editar Serviço'}</DialogTitle>
                    </DialogHeader>

                    <form id="form-servico" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FieldGroup>
                            <Controller
                                name="titulo"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Título</FieldLabel>
                                        <Input {...field} placeholder="Ex: Produção Vocal" aria-invalid={fieldState.invalid} />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="horario"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Horário</FieldLabel>
                                            <Input {...field} type="time" aria-invalid={fieldState.invalid} />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            </div>

                            <Controller
                                name="descricao"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Descrição</FieldLabel>
                                        <Input {...field} placeholder="Detalhes opcionais..." aria-invalid={fieldState.invalid} />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>

                    <DialogFooter className="flex justify-between items-center pt-4">
                        {modo === 'editar' && (
                            <Button type="button" variant="destructive" size="icon" onClick={excluirEvento}>
                                <Trash2 size={18} />
                            </Button>
                        )}
                        <div className="flex gap-2 ml-auto">
                            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                            <Button type="submit" form="form-servico" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                Salvar
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}