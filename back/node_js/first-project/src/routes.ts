import { NextFunction, Router, type Request, type Response } from "express";

const router = Router();

const tarefas = [
  { id: 1, nome: "Estudar Node.js" },
  { id: 2, nome: "Estudar TypeScript" },
  { id: 3, nome: "Estudar Express" },
];

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("PASSOU PELO MIDLEWARE GLOBAL");

  return next();
});

function checkTarefa(req: Request, res: Response, next: NextFunction) {
  if (!req.body.nome) {
    return res.status(400).json({ message: "O campo 'nome' é obrigatório!" });
  }

  return next();
}

router.get("/tarefas", (req: Request, res: Response) => {
  res.json({ message: tarefas });
});

router.get("/tarefa/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const tarefa = tarefas.find((t) => t.id === Number(id));

  res.json({ tarefa: tarefa });
});

router.post("/tarefa", checkTarefa, (req: Request, res: Response) => {
  const { nome } = req.body;
  const id = tarefas.length + 1;
  const novaTarefa = { id, nome };
  tarefas.push(novaTarefa);

  res
    .status(200)
    .json({ message: "Tarefa criada com sucesso!", tarefa: novaTarefa });
});

router.put("/tarefa/:id", checkTarefa, (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome } = req.body;
  const tarefa = tarefas.find((t) => t.id === Number(id));

  if (tarefa) {
    tarefa.nome = nome;
    res.json({
      message: `Tarefa com id ${id} atualizada com sucesso!`,
      tarefa: tarefa,
    });
  } else {
    res.status(404).json({ message: `Tarefa com id ${id} não encontrada!` });
  }
});

router.delete("/tarefa/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const index = tarefas.findIndex((t) => t.id === Number(id));

  if (index > -1) {
    tarefas.splice(index, 1);
    res.json({ message: `Tarefa com id ${id} removida com sucesso!` });
  } else {
    res.status(404).json({ message: `Tarefa com id ${id} não encontrada!` });
  }
});

export { router };
