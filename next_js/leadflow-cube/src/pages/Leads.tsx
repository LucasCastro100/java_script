import { useState } from 'react';
import { Lead, LeadStatus } from '@/types/lead';
import { KanbanView } from '@/components/KanbanView';
import { ListView } from '@/components/ListView';
import { LeadEditDialog } from '@/components/LeadEditDialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LeadForm } from '@/components/LeadForm';
import { LayoutGrid, List, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLeads } from '@/hooks/useLeads';

type ViewMode = 'kanban' | 'list';

const Leads = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { leads, isLoading, updateLeadStatus, updateLead, deleteLead } = useLeads();

  const handleLeadUpdate = (leadId: string, newStatus: LeadStatus) => {
    updateLeadStatus({ id: leadId, status: newStatus });
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsEditDialogOpen(true);
  };

  const handleSaveLead = (updatedLead: Partial<Lead>) => {
    if (selectedLead) {
      updateLead({ id: selectedLead.id, ...updatedLead });
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteLead = () => {
    if (selectedLead) {
      deleteLead(selectedLead.id);
      setIsEditDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Leads</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Gerencie todos os seus leads
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Novo Lead</span>
                <span className="sm:hidden">Novo</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Novo Lead</DialogTitle>
              </DialogHeader>
              <LeadForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>

          <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1">
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className={cn(
                "gap-1 sm:gap-2 transition-all text-xs sm:text-sm px-2 sm:px-3",
                viewMode === 'kanban' && "shadow-md"
              )}
            >
              <LayoutGrid className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Kanban</span>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={cn(
                "gap-1 sm:gap-2 transition-all text-xs sm:text-sm px-2 sm:px-3",
                viewMode === 'list' && "shadow-md"
              )}
            >
              <List className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Lista</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="animate-fade-in">
        {viewMode === 'kanban' ? (
          <KanbanView leads={leads} onLeadUpdate={handleLeadUpdate} onLeadClick={handleLeadClick} />
        ) : (
          <ListView leads={leads} onLeadClick={handleLeadClick} />
        )}
      </div>

      {/* Edit Dialog */}
      <LeadEditDialog
        lead={selectedLead}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveLead}
        onDelete={handleDeleteLead}
      />
    </div>
  );
};

export default Leads;
