import { useState, useEffect } from 'react';
import { Lead, LeadStatus, statusConfig } from '@/types/lead';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useCompany } from '@/contexts/CompanyContext';

interface LeadEditDialogProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (lead: Partial<Lead> & { id: string }) => void;
  onDelete: (id: string) => void;
}

export function LeadEditDialog({ lead, open, onOpenChange, onSave, onDelete }: LeadEditDialogProps) {
  const { company } = useCompany();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [formData, setFormData] = useState<Partial<Lead>>(lead || {});

  const { data: sellers = [] } = useQuery({
    queryKey: ['sellers', company?.id],
    queryFn: async () => {
      if (!company?.id) return [];
      const { data, error } = await supabase
        .from('sellers')
        .select('*')
        .eq('company_id', company.id)
        .eq('ativo', true);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!company?.id && open,
  });

  // Atualizar formData quando o lead mudar
  useEffect(() => {
    if (lead) {
      setFormData(lead);
    }
  }, [lead]);

  if (!lead) return null;

  const handleSave = () => {
    onSave({ ...formData, id: lead.id });
    onOpenChange(false);
  };

  const handleDelete = () => {
    onDelete(lead.id);
    setShowDeleteAlert(false);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Lead</DialogTitle>
            <DialogDescription>
              Faça alterações nos dados do lead abaixo.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={formData.nome || ''}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="produto">Produto</Label>
              <Input
                id="produto"
                value={formData.produto || ''}
                onChange={(e) => setFormData({ ...formData, produto: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="whatsappLead">WhatsApp Lead</Label>
                <Input
                  id="whatsappLead"
                  value={formData.whatsappLead || ''}
                  onChange={(e) => setFormData({ ...formData, whatsappLead: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="whatsappAtendente">WhatsApp Atendente</Label>
                <Input
                  id="whatsappAtendente"
                  value={formData.whatsappAtendente || ''}
                  onChange={(e) => setFormData({ ...formData, whatsappAtendente: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="localidade">Localidade</Label>
              <Input
                id="localidade"
                value={formData.localidade || ''}
                onChange={(e) => setFormData({ ...formData, localidade: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as LeadStatus })}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="valorEstimado">Valor Estimado</Label>
                <Input
                  id="valorEstimado"
                  type="number"
                  step="0.01"
                  value={formData.valorEstimado || ''}
                  onChange={(e) => setFormData({ ...formData, valorEstimado: parseFloat(e.target.value) || undefined })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="seller">Vendedor</Label>
              <Select
                value={formData.sellerId || 'none'}
                onValueChange={(value) => setFormData({ ...formData, sellerId: value === 'none' ? undefined : value })}
              >
                <SelectTrigger id="seller">
                  <SelectValue placeholder="Selecione um vendedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhum</SelectItem>
                  {sellers.map((seller) => (
                    <SelectItem key={seller.id} value={seller.id}>
                      {seller.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes || ''}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter className="flex justify-between">
            <Button
              variant="destructive"
              onClick={() => setShowDeleteAlert(true)}
              className="mr-auto"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                Salvar
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o lead "{lead.nome}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
