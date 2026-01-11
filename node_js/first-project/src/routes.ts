import { Router, type Request, type Response} from "express";

const router = Router()

// router.get("/tarefas", (req: Request, res: Response) => {
//     res.json({message: "Listagem de tarefas"})
// })

router.get("/tarefas/:id", (req: Request, res: Response) => {
    const id = req.params.id
    
    res.json({tarefa: `Tarefa de id ${id}`})
})

export {router}