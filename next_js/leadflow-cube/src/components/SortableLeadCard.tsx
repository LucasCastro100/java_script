import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Lead } from '@/types/lead';
import { LeadCard } from './LeadCard';

interface SortableLeadCardProps {
  lead: Lead;
  onLeadClick: (lead: Lead) => void;
}

export const SortableLeadCard = ({ lead, onLeadClick }: SortableLeadCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <LeadCard lead={lead} isDragging={isDragging} onLeadClick={onLeadClick} />
    </div>
  );
};
