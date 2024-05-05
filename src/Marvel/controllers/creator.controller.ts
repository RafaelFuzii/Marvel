import { Request, Response } from 'express'
import CreatorService from '../services/creator.service';
import { send } from 'process';


class CreatorController {
    async Creators(req: Request, res: Response) {
        try {
            const criadores = await CreatorService.Creators();
            return res.status(200).json({message: "Criadores criando com sucesso"});
        } catch (error) {
            console.error('Erro no controller:', error);
            return res.status(500).json({ message: 'Erro ao buscar Criadores' });
        }
    }

    async CreateCreator(req: Request, res: Response) {
      try {
          const creator = await CreatorService.Create(req.body);
          return res.send(creator).status(201);
      } catch (error) {
          console.error('Erro no controller:', error);
          return res.status(500).json({ message: 'Erro ao Criar Criador' });
      }
    }

    async FindIdCreator(req: Request, res: Response){
        try{
            const creator = await CreatorService.findByIdCreator(req.params.id)
            return res.send(creator)
        } catch (error){
            console.error(error)
            return res.status(500).json({ message: 'Erro ao achar Criador'})
        }
    }

    async UpdateCreator(req: Request, res: Response) {
        try {
            const creator = await CreatorService.Update(req.params.id, req.body);
            return res.send(creator);
        } catch (error) {
            console.error('Erro no controller:', error);
            return res.status(500).json({ message: 'Erro ao atualizar Criador' });
        }
      }
  
      async DeleteCreator(req: Request, res: Response) {
        try {
            const creator = await CreatorService.Delete(req.params.id);
            return res.status(200).json("Deletado com sucesso");
        } catch (error) {
            console.error('Erro no controller:', error);
            return res.status(500).json({ message: 'Erro ao deletar Criador' });
        }
      }

      async FilterByRole(req: Request, res: Response) {
        try {
            const funcao = req.params.funcao;
            const filteredCreators = await CreatorService.FilterByRole(funcao);
            return res.send(filteredCreators);
        } catch (error) {
            console.error('Erro no controller:', error);
            return res.status(500).json({ message: 'Erro ao Filtrar' });
        }
      }

      async SearchCreatorSeries(req: Request, res: Response) {
        try {
            const names = req.params.name;
            const filteredCreators = await CreatorService.SearchCreatorSeries(names);
            return res.send(filteredCreators);
        } catch (error) {
            console.error('Erro no controller:', error);
            return res.status(500).json({ message: 'Erro ao Filtrar' });
        }
      }

      async SearchCreator(req: Request, res: Response) {
            try {
                const name = req.params.name;
                const creator = await CreatorService.SearchCreator(name);
                return res.send(creator);
            } catch (error) {
                console.error('Erro no controller:', error);
                return res.status(500).json({ message: 'Erro ao deletar Heroi' });
            }
        }
}

export default new CreatorController()