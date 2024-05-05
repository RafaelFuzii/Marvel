import axios from 'axios';
import  Comics  from '../schemas/comic.schema';
import { Comic } from '../types/comic.type';

class ComicService {
    private baseURL: string = 'https://gateway.marvel.com:443/v1/public'
    private apiPublicKey: string = 'f03686592cac4cc4a8afffde669ee4d2'
    private hash: string = '26dbda14d8a4379d0dd42bdc17cf1c65'

    async Comics() {
        const comics = await axios.get(`${this.baseURL}/series/15305/comics?limit=60&ts=2&apikey=${this.apiPublicKey}&hash=${this.hash}`)
        const comicsData = comics.data.data.results
        

        comicsData.forEach(async (comics: Comic) => { 
            try {
                const thumbnailUrl = `${comics.thumbnail.path}.${comics.thumbnail.extension}`
                const dates = comics.dates
                let focDate:any

                for (const datePublish of dates) {
                    if (datePublish.type == 'focDate') {
                        focDate = datePublish.date;
                        break;
                    }
                }
                
                const comic = new Comics({
                    id_comic: comics.id,
                    title: comics.title,
                    description: comics.description,
                    thumbnail: thumbnailUrl,
                    date: focDate
                })
                
                await comic.save()
            } catch (error) {
                console.error('Erro ao salvar no banco de dados:', error)
            }
        })
        return comicsData
    }

    async Create(comic: Comic) {
        const createComic = await Comics.create(comic)
        return createComic
      }
  
      async findByIdComic(id: String) {
        const FindById = await Comics.findById(id)
        return FindById
      }
  
      async Update(id: String, comic: Comic) {
        const updateComic = await Comics.findByIdAndUpdate(id, {
          title: comic.title,
          description: comic.description,
          thumbnail:comic.thumbnail,
          date: comic.dates
      }, { new: true })
        return updateComic
      }
  
      async Delete(id: String){
        try{
          const deleteComic = await Comics.findByIdAndDelete(id)
          return deleteComic
        } catch (error) {
          throw new Error(`Erro ao deletar Comic: ${error}`)
        }
      }
  
      async CountComic(){
        try{
          const count = await Comics.countDocuments({})
          return count
        } catch (error) {
          throw new Error(`Erro ao contar quantidade Comic: ${error}`)
        }
      }
}


export default new ComicService()