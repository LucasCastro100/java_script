import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Lead, LeadStatus } from '@/types/lead';
import { KanbanColumn } from './KanbanColumn';
import { LeadCard } from './LeadCard';

interface KanbanViewProps {
  leads: Lead[];
  onLeadUpdate: (leadId: string, newStatus: LeadStatus) => void;
  onLeadClick: (lead: Lead) => void;
}

const COLUMNS: LeadStatus[] = ['novo', 'contato', 'proposta', 'negociacao', 'ganho', 'perdido'];

export const KanbanView = ({ leads, onLeadUpdate, onLeadClick }: KanbanViewProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const leadId = active.id as string;
      const newStatus = over.id as LeadStatus;
      
      // Verificar se over.id é uma coluna válida
      if (COLUMNS.includes(newStatus)) {
        onLeadUpdate(leadId, newStatus);
      }
    }

    setActiveId(null);
  };

  const activeLead = activeId ? leads.find(l => l.id === activeId) : null;

  const getLeadsByStatus = (status: LeadStatus) => {
    return leads.filter(lead => lead.status === status);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-4 px-2">
        {COLUMNS.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            leads={getLeadsByStatus(status)}
            onLeadClick={onLeadClick}
          />
        ))}
      </div>

      <DragOverlay>
        {activeLead ? <LeadCard lead={activeLead} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
};
