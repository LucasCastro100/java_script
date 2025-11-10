import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users, Target } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SellersTab } from '@/components/goals/SellersTab';
import { GoalsTab } from '@/components/goals/GoalsTab';

const Goals = () => {
  const [activeTab, setActiveTab] = useState('sellers');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Metas</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie vendedores e suas metas de vendas
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="sellers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Vendedores
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Metas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sellers" className="mt-6">
          <SellersTab />
        </TabsContent>

        <TabsContent value="goals" className="mt-6">
          <GoalsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Goals;
