import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lead, LeadStatus, statusConfig } from '@/types/lead';
import { TrendingUp, Users, CheckCircle, XCircle, DollarSign, Clock, Calendar, BarChart3 } from 'lucide-react';
import { useLeadStats } from '@/hooks/useLeadStats';
import { useLeads } from '@/hooks/useLeads';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LeadEditDialog } from '@/components/LeadEditDialog';

const Dashboard = () => {
  const { stats: dbStats, isLoading: statsLoading } = useLeadStats();
  const { leads, isLoading: leadsLoading, updateLead, deleteLead } = useLeads();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const isLoading = statsLoading || leadsLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const emAndamento = dbStats.contato + dbStats.proposta + dbStats.negociacao + dbStats.novo;
  const taxaConversao = dbStats.total > 0 ? ((dbStats.ganho / dbStats.total) * 100).toFixed(1) : '0';

  const leadsPorStatus: Record<LeadStatus, number> = {
    novo: dbStats.novo,
    contato: dbStats.contato,
    proposta: dbStats.proposta,
    negociacao: dbStats.negociacao,
    ganho: dbStats.ganho,
    perdido: dbStats.perdido,
  };

  // Dados para gráfico de pizza - Distribuição por Status
  const pieChartData = Object.entries(statusConfig).map(([status, config]) => ({
    name: config.label,
    value: leadsPorStatus[status as LeadStatus],
    color: config.color,
  }));

  // Dados para gráfico de valor por status
  const valorPorStatus = leads.reduce((acc, lead) => {
    if (lead.valorEstimado) {
      acc[lead.status] = (acc[lead.status] || 0) + lead.valorEstimado;
    }
    return acc;
  }, {} as Record<LeadStatus, number>);

  const valorStatusData = Object.entries(statusConfig).map(([status, config]) => ({
    status: config.label,
    valor: valorPorStatus[status as LeadStatus] || 0,
  }));

  // Dados para gráfico de leads por mês
  const leadsPorMes = leads.reduce((acc, lead) => {
    const mes = lead.criadoEm.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
    acc[mes] = (acc[mes] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const leadsMesData = Object.entries(leadsPorMes)
    .sort((a, b) => {
      const [mesA, anoA] = a[0].split(' ');
      const [mesB, anoB] = b[0].split(' ');
      return anoA === anoB ? mesA.localeCompare(mesB) : anoA.localeCompare(anoB);
    })
    .slice(-6)
    .map(([mes, count]) => ({
      mes: mes.charAt(0).toUpperCase() + mes.slice(1),
      leads: count,
    }));

  // Dados para funil de vendas
  const funilData = [
    { etapa: 'Novo', quantidade: dbStats.novo, taxa: 100 },
    { etapa: 'Contato', quantidade: dbStats.contato, taxa: dbStats.novo > 0 ? (dbStats.contato / dbStats.novo) * 100 : 0 },
    { etapa: 'Proposta', quantidade: dbStats.proposta, taxa: dbStats.contato > 0 ? (dbStats.proposta / dbStats.contato) * 100 : 0 },
    { etapa: 'Negociação', quantidade: dbStats.negociacao, taxa: dbStats.proposta > 0 ? (dbStats.negociacao / dbStats.proposta) * 100 : 0 },
    { etapa: 'Ganho', quantidade: dbStats.ganho, taxa: dbStats.negociacao > 0 ? (dbStats.ganho / dbStats.negociacao) * 100 : 0 },
  ];

  const COLORS = {
    novo: '#3b82f6',
    contato: '#a855f7',
    proposta: '#eab308',
    negociacao: '#f97316',
    ganho: 'hsl(var(--success))',
    perdido: 'hsl(var(--destructive))',
  };

  const statsCards = [
    {
      title: 'Total de Leads',
      value: dbStats.total,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Leads Ganhos',
      value: dbStats.ganho,
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Leads Perdidos',
      value: dbStats.perdido,
      icon: XCircle,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    },
    {
      title: 'Em Andamento',
      value: emAndamento,
      icon: Clock,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      title: 'Taxa de Conversão',
      value: `${taxaConversao}%`,
      icon: TrendingUp,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Valor Total Ganho',
      value: `R$ ${dbStats.valor_total_ganho.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Visão geral do seu pipeline de vendas
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribuição por Status - Gráfico de Pizza */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Distribuição por Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => percent > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : null}
                  outerRadius={90}
                  innerRadius={50}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={2}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[Object.keys(statusConfig)[index] as LeadStatus]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Valor Estimado por Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Valor Estimado por Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={valorStatusData}>
                <XAxis 
                  dataKey="status" 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip 
                  formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="valor" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Leads por Mês */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Leads por Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={leadsMesData}>
                <XAxis 
                  dataKey="mes" 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Funil de Vendas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Funil de Vendas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={funilData} layout="vertical">
                <XAxis 
                  type="number" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  dataKey="etapa" 
                  type="category" 
                  axisLine={false}
                  tickLine={false}
                  width={90}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => {
                    if (name === 'quantidade') return [value, 'Quantidade'];
                    return [`${value.toFixed(1)}%`, 'Taxa de Conversão'];
                  }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="quantidade" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Leads Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leads
              .sort((a, b) => b.criadoEm.getTime() - a.criadoEm.getTime())
              .slice(0, 5)
              .map((lead) => {
                const statusInfo = statusConfig[lead.status];
                return (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedLead(lead);
                      setDialogOpen(true);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${statusInfo.color}`} />
                      <div>
                        <p className="font-medium text-foreground">{lead.nome}</p>
                        <p className="text-sm text-muted-foreground">{lead.produto}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{statusInfo.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {lead.criadoEm.toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>

      <LeadEditDialog
        lead={selectedLead}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={updateLead}
        onDelete={deleteLead}
      />
    </div>
  );
};

export default Dashboard;
