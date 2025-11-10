import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Loader2, Pencil, Trash2 } from 'lucide-react';
import { GoalForm } from './GoalForm';
import { useToast } from '@/hooks/use-toast';

export function GoalsList() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingGoal, setEditingGoal] = useState<any>(null);
  const [deletingGoal, setDeletingGoal] = useState<any>(null);

  const { data: goals, isLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('goals')
        .select(`
          *,
          sellers (nome)
        `)
        .order('periodo', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (goalId: string) => {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', goalId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      toast({
        title: 'Meta excluída!',
        description: 'A meta foi removida com sucesso.',
      });
      setDeletingGoal(null);
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao excluir meta',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!goals || goals.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nenhuma meta cadastrada ainda.
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vendedor</TableHead>
            <TableHead>Período</TableHead>
            <TableHead>Meta</TableHead>
            <TableHead>Atingido</TableHead>
            <TableHead>Progresso</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {goals.map((goal) => {
            const progress = goal.valor_meta > 0 
              ? (goal.valor_atingido / goal.valor_meta) * 100 
              : 0;

            return (
              <TableRow key={goal.id}>
                <TableCell className="font-medium">
                  {(goal.sellers as any)?.nome || 'N/A'}
                </TableCell>
                <TableCell>
                  {new Date(goal.periodo + '-01').toLocaleDateString('pt-BR', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  R$ {goal.valor_meta.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell>
                  R$ {goal.valor_atingido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell className="w-[200px]">
                  <div className="flex items-center gap-2">
                    <Progress value={Math.min(progress, 100)} className="flex-1" />
                    <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingGoal(goal)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeletingGoal(goal)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Dialog open={!!editingGoal} onOpenChange={() => setEditingGoal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Meta</DialogTitle>
          </DialogHeader>
          <GoalForm
            goal={editingGoal}
            onSuccess={() => setEditingGoal(null)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingGoal} onOpenChange={() => setDeletingGoal(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta meta?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteMutation.mutate(deletingGoal.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
