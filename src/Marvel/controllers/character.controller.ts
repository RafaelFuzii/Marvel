import { Request, Response } from 'express'
import CharacterMarvelService from '../services/character.service'


class CharacterController {
  
    async FindCharacter(req: Request, res: Response) {
        try {
            const saga = await CharacterMarvelService.FindCharacter();
            return res.send(saga);
        } catch (error) {
            console.error('Erro no controller:', error);
            return res.status(500).json({ message: 'Erro ao buscar Herois' });
        }
    }

    async CreateCharacter(req: Request, res: Response) {
      try {
          const character = await CharacterMarvelService.Create(req.body);
          return res.status(201).send(character);
      } catch (error) {
          console.error('Erro no controller:', error);
          return res.status(500).json({ message: 'Erro ao Criar Heroi' });
      }
    }

    async FindIdCharacter(req: Request, res: Response) {
      try {
          const character = await CharacterMarvelService.findByIdCharacter(req.params.id);
          return res.send(character);
      } catch (error) {
          console.error('Erro no controller:', error);
          return res.status(500).json({ message: 'Erro ao buscar Heroi' });
      }
    }

    async UpdateCharacter(req: Request, res: Response) {
      try {
          const character = await CharacterMarvelService.Update(req.params.id, req.body);
          return res.send(character);
      } catch (error) {
          console.error('Erro no controller:', error);
          return res.status(500).json({ message: 'Erro ao atualizar Heroi' });
      }
    }

    async DeleteCharacter(req: Request, res: Response) {
      try {
          const character = await CharacterMarvelService.Delete(req.params.id);
          return res.send(character);
      } catch (error) {
          console.error('Erro no controller:', error);
          return res.status(500).json({ message: 'Erro ao deletar Heroi' });
      }
    }

    async SearchCharacter(req: Request, res: Response) {
        try {
            const name = req.params.name;
            const character = await CharacterMarvelService.SearchHero(name);
            return res.send(character);
        } catch (error) {
            console.error('Erro no controller:', error);
            return res.status(500).json({ message: 'Erro ao deletar Heroi' });
        }
    }
}

export default new CharacterController()