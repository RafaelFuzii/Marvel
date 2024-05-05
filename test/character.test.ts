import app from '../src/app'
import { describe, it, expect } from "@jest/globals"
import CharacterModel from '../src/Marvel/schemas/character.schema'
import * as request from 'supertest'

const mockCharacter = {
    id_hero: 3321,
    name: "Spider-Man",
    description: "Bitten by a radioactive spider, Peter Parker now has spider-like abilities.",
    thumbnail: "http:i.annihil.us/u/prod/marvel/i/mg/8/c0/520d1ad3e543f.jpg"
}

describe("Testando endpoints de Characters", () => {


    let globalCharacterId: String;

    it("deve retornar os herois do API", async () => {
        const response = await request.default(app).get("/herois")

        expect(response.status).toBe(200)
    })

    it("deve criar character", async () => {
         const response = await request.default(app).post('/herois/criar').send(mockCharacter).expect(201) 
         const findCharacter = await CharacterModel.findById(response.body._id)
         globalCharacterId = response.body._id

         expect(response.body._id).toBeDefined()
         expect(globalCharacterId).toBe(response.body._id)
         expect(mockCharacter.id_hero).toBe(findCharacter?.id_hero)
         expect(mockCharacter.name).toBe(findCharacter?.name)
         expect(mockCharacter.description).toBe(findCharacter?.description)
         expect(mockCharacter.thumbnail).toBe(findCharacter?.thumbnail)
    });

    it("deve achar um character pelo ID e retornar ele", async () => {
        const expectedCharacter = {
            id_hero: 3321,
            name: "Spider-Man",
            description: "Bitten by a radioactive spider, Peter Parker now has spider-like abilities.",
            thumbnail: "http:i.annihil.us/u/prod/marvel/i/mg/8/c0/520d1ad3e543f.jpg"
        }

        const response = await request.default(app).get(`/herois/${globalCharacterId}`).expect(200)


        expect(response.body).toBeDefined()
        expect(response.body.id_hero).toBe(expectedCharacter.id_hero)
        expect(response.body.name).toBe(expectedCharacter.name)
        expect(response.body.description).toBe(expectedCharacter.description)
        expect(response.body.thumbnail).toBe(expectedCharacter.thumbnail)
    });

    it("deve atualizar o character pelo id", async () => {
        const expectedUpdateCharacter = {
            name: "Spider Man Updated",
        };

        const response = await request.default(app).put(`/herois/${globalCharacterId}`).send(expectedUpdateCharacter).expect(200)


        expect(response.body).toBeDefined()
        expect(response.body.name).toBe(expectedUpdateCharacter.name)

    });

    it("deve excluir o character pelo id", async () => {
        const response = await request.default(app).delete(`/herois/${globalCharacterId}`)

        expect(response.status).toBe(200)
    })

    it("deve achar o character pelo nome", async () => {
        const response = await request.default(app).get("/heroi/buscar/Spider-Man")

        expect(response.status).toBe(200)
    })

});