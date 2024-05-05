import app from '../src/app'
import { describe, it, expect } from "@jest/globals"
import ComicModel from '../src/Marvel/schemas/comic.schema'
import * as request from 'supertest'

const mockComic = {
    id_comic: 34232,
    title: "Teste título do nome do quadrinho",
    description: "Teste descrição do quadrinho",
    thumbnail: "Teste da url da imagem do quadrinho"
}

describe("Testando endpoints de Comics", () => {


    let globalComicId: String;

    it("deve retornar os comic do API", async () => {
        const response = await request.default(app).get("/quadrinhos")

        expect(response.status).toBe(200)
    })

    it("deve criar Comic", async () => {

         const response = await request.default(app).post('/quadrinhos/criar').send(mockComic).expect(200) 
         const findComic = await ComicModel.findById(response.body._id)
         globalComicId = response.body._id

         expect(response.body._id).toBeDefined()
         expect(globalComicId).toBe(response.body._id)
         expect(mockComic.id_comic).toBe(findComic?.id_comic)
         expect(mockComic.title).toBe(findComic?.title)
         expect(mockComic.description).toBe(findComic?.description)
         expect(mockComic.thumbnail).toBe(findComic?.thumbnail)
    });

    it("deve achar um comic pelo ID e retornar ele", async () => {
        const expectedComic = {
            id_comic: 34232,
            title: "Teste título do nome do quadrinho",
            description: "Teste descrição do quadrinho",
            thumbnail: "Teste da url da imagem do quadrinho"
        }

        const response = await request.default(app).get(`/quadrinhos/${globalComicId}`).expect(200)


        expect(response.body).toBeDefined()
        expect(response.body.id_comic).toBe(expectedComic.id_comic)
        expect(response.body.title).toBe(expectedComic.title)
        expect(response.body.description).toBe(expectedComic.description)
        expect(response.body.thumbnail).toBe(expectedComic.thumbnail)
    });

    it("deve atualizar o comic pelo id", async () => {
        const expectedUpdateComic = {
            title: "Updated Title comic",
        }

        const response = await request.default(app).put(`/quadrinhos/${globalComicId}`).send(expectedUpdateComic).expect(200)


        expect(response.body).toBeDefined()
        expect(response.body.title).toBe(expectedUpdateComic.title)

    });

    it("deve excluir o comic pelo id", async () => {
        const response = await request.default(app).delete(`/quadrinhos/${globalComicId}`)

        expect(response.status).toBe(200)
    })

    it("deve contar quanto comic ele tem", async () => {
        const response = await request.default(app).get("/quadrinho/contar")

        expect(response.status).toBe(200)
        expect(response.body).toEqual({"message": "Quantidade de quandrinho encontrado: 60"})
    })

});