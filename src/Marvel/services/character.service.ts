import axios from 'axios';
import CharacterMarvel from "../schemas/character.schema";
import { Character } from "../types/character.type";


class CharacterMarvelService {
    private baseURL: string = 'https://gateway.marvel.com:443/v1/public'
    private apiPublicKey: string = 'f03686592cac4cc4a8afffde669ee4d2'
    private hash: string = '26dbda14d8a4379d0dd42bdc17cf1c65'

    async FindCharacter() {
        const find = await axios.get(`${this.baseURL}/series/15305/characters?limit=30&ts=2&apikey=${this.apiPublicKey}&hash=${this.hash}`);

        const characters = find.data.data.results
        
        characters.forEach(async (character: Character) => {
            try {
                const thumbnailUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`
                const Character = new CharacterMarvel({
                    id_hero: character.id,
                    name: character.name,
                    description: character.description,
                    thumbnail: thumbnailUrl
                })

                await Character.save()
            } catch (error) {
                console.error('Erro ao salvar no banco de dados:', error)
            }
        })

        return characters
    }

    async Create(character: Character) {
      const createHero = await CharacterMarvel.create(character)
      return createHero
    }

    async findByIdCharacter(id: String) {
      const FindById = await CharacterMarvel.findById(id)
      return FindById
    }

    async Update(id: String, character: Character) {
      const updateCharacter = await CharacterMarvel.findByIdAndUpdate(id, {
        id_hero: character.id,
        name: character.name,
        description: character.description,
        thumbnail:character.thumbnail,
    }, { new: true })
      return updateCharacter
    }

    async Delete(id: String){
      try{
        const deleteCharacter = await CharacterMarvel.findByIdAndDelete(id)
        return "Heroi Deleta com sucesso"
      } catch (error) {
        throw new Error(`Erro ao deletar Heroi: ${error}`)
      }
    }
    
    async SearchHero(name: String){
      try{
        const existsHero = await CharacterMarvel.find({ name: name })
        return existsHero
      } catch (error) {
        throw new Error(`Erro ao buscar Heroi no API: ${error}`)
      }
    }
}


export default new CharacterMarvelService()