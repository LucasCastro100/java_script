import { Lead, statusConfig } from '@/types/lead';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ListViewProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

export const ListView = ({ leads, onLeadClick }: ListViewProps) => {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold whitespace-nowrap">Nome</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">Produto</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden md:table-cell">WhatsApp Lead</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden lg:table-cell">WhatsApp Atendente</TableHead>
              <TableHead className="font-semibold whitespace-nowrap hidden sm:table-cell">Localidade</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">Status</TableHead>
            </TableRow>
          </TableHeader>
        <TableBody>
          {leads.map((lead) => {
            const statusInfo = statusConfig[lead.status];
            return (
              <TableRow
                key={lead.id}
                className="hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onLeadClick(lead)}
              >
                <TableCell className="font-medium whitespace-nowrap">{lead.nome}</TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate max-w-[150px]">{lead.produto}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm">{lead.whatsappLead}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm">{lead.whatsappAtendente}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate max-w-[120px]">{lead.localidade}</span>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge className={cn(statusInfo.color, "text-white")}>
                    {statusInfo.label}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        </Table>
      </div>
    </div>
  );
};
