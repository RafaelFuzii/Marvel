import { Router } from 'express'
import CharacterController from './Marvel/controllers/character.controller'
import CreatorController from './Marvel/controllers/creator.controller'
import ComicController from './Marvel/controllers/comic.controller'

const routes = Router()

routes.get('/herois', CharacterController.FindCharacter)
routes.post('/herois/criar', CharacterController.CreateCharacter)
routes.get('/herois/:id', CharacterController.FindIdCharacter)
routes.put('/herois/:id', CharacterController.UpdateCharacter)
routes.delete('/herois/:id', CharacterController.DeleteCharacter)

routes.get('/criadores', CreatorController.Creators)
routes.post('/criadores/criar', CreatorController.CreateCreator)
routes.get('/criadores/:id', CreatorController.FindIdCreator)
routes.put('/criadores/:id', CreatorController.UpdateCreator)
routes.delete('/criadores/:id', CreatorController.DeleteCreator)

routes.get('/quadrinhos', ComicController.Comics)
routes.post('/quadrinhos/criar', ComicController.CreateComic)
routes.get('/quadrinhos/:id', ComicController.FindIdComic)
routes.put('/quadrinhos/:id', ComicController.UpdateComic)
routes.delete('/quadrinhos/:id', ComicController.DeleteComic)

// Rotas Auxiliares
routes.get('/criador/:funcao', CreatorController.FilterByRole)
routes.get('/heroi/buscar/:name', CharacterController.SearchCharacter)
routes.get('/quadrinho/contar', ComicController.CountComic)
routes.get('/criador/series/:name', CreatorController.SearchCreatorSeries)
routes.get('/criador/buscar/:name', CreatorController.SearchCreator)


export {
    routes
}