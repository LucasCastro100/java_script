import { Lead, statusConfig } from '@/types/lead';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Package, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeadCardProps {
  lead: Lead;
  isDragging?: boolean;
  onLeadClick?: (lead: Lead) => void;
}

export const LeadCard = ({ lead, isDragging, onLeadClick }: LeadCardProps) => {
  const statusInfo = statusConfig[lead.status];

  return (
    <Card
      className={cn(
        "p-4 hover:shadow-lg transition-all duration-200 bg-gradient-to-b from-card to-card/95 border-border/50",
        isDragging && "opacity-50 rotate-2 scale-105",
        onLeadClick && "cursor-pointer"
      )}
      onClick={() => onLeadClick?.(lead)}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground text-lg">{lead.nome}</h3>
          <Badge className={cn(statusInfo.color, "text-white shrink-0")}>
            {statusInfo.label}
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Package className="h-4 w-4 shrink-0" />
            <span className="truncate">{lead.produto}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">{lead.localidade}</span>
          </div>

          {lead.sellerNome && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4 shrink-0" />
              <span className="truncate font-medium">{lead.sellerNome}</span>
            </div>
          )}

          <div className="space-y-1 pt-2 border-t border-border/50">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4 shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs">Lead: {lead.whatsappLead}</span>
                <span className="text-xs">Atendente: {lead.whatsappAtendente}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
