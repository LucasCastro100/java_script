import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Lead, LeadStatus, statusConfig } from '@/types/lead';
import { SortableLeadCard } from './SortableLeadCard';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  status: LeadStatus;
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

export const KanbanColumn = ({ status, leads, onLeadClick }: KanbanColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const statusInfo = statusConfig[status];

  return (
    <div className="flex flex-col min-w-[280px] sm:min-w-[320px] max-w-[280px] sm:max-w-[320px]">
      <div className="mb-3 sm:mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className={cn("w-3 h-3 rounded-full shrink-0", statusInfo.color)} />
          <h3 className="font-semibold text-foreground text-sm sm:text-base">{statusInfo.label}</h3>
          <span className="text-xs sm:text-sm text-muted-foreground">({leads.length})</span>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 rounded-lg p-2 sm:p-3 space-y-2 sm:space-y-3 min-h-[400px] sm:min-h-[500px] transition-colors",
          "bg-muted/30 border-2 border-dashed border-border/50",
          isOver && "bg-primary/5 border-primary/50"
        )}
      >
        <SortableContext items={leads.map(l => l.id)} strategy={verticalListSortingStrategy}>
          {leads.map((lead) => (
            <SortableLeadCard key={lead.id} lead={lead} onLeadClick={onLeadClick} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};
