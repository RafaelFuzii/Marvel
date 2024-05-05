import axios from 'axios';
import creatorSchema from '../schemas/creator.schema';
import { Creator, Series } from "../types/creator.type";


class CreatorService {
    private baseURL: string = 'https://gateway.marvel.com:443/v1/public'
    private apiPublicKey: string = 'f03686592cac4cc4a8afffde669ee4d2'
    private hash: string = '26dbda14d8a4379d0dd42bdc17cf1c65'

    async Creators(){
        const findCreator = await axios.get(`${this.baseURL}/series/15305?&ts=2&apikey=${this.apiPublicKey}&hash=${this.hash}`)
        const findSeriesCreator = await axios.get(`${this.baseURL}/series/15305/creators?&ts=2&apikey=${this.apiPublicKey}&hash=${this.hash}`)

        const creators = findCreator.data.data.results[0].creators.items
        const creatorNames = creators.map((creator:any) => creator.name).sort()

        const seriesItems = findSeriesCreator.data.data.results
        const filteredSeriesItems = seriesItems.filter((creator:any) => creatorNames.includes(creator.fullName)).sort();
        

        const creatorRole = filteredSeriesItems.map((creator: any) => {
            const matchingCreator = creators.find((cre:any) => cre.name === creator.fullName);
            return matchingCreator ? matchingCreator.role : null;
        });
        console.log(creatorRole)

        // Mapa para manter as séries associadas por nome do criador
        const seriesByCreatorName = new Map();

        // Primeiro, vamos mapear todas as séries por criador
        for (const series of filteredSeriesItems) {
            const seriesNames = series.series.items.map((serie: any) => serie.name);
            
            // Assumindo que `series.fullName` contém o nome do criador para estas séries
            if (seriesByCreatorName.has(series.fullName)) {
                // Concatena as séries se já existirem entradas para este criador
                seriesByCreatorName.set(series.fullName, [...seriesByCreatorName.get(series.fullName), ...seriesNames]);
            } else {
                // Cria uma nova entrada no mapa para este criador
                seriesByCreatorName.set(series.fullName, seriesNames);
            }
        }


        const thumbnailUrls = await Promise.all(filteredSeriesItems.map(async (creator: Creator) => {
            return `${creator.thumbnail.path}.${creator.thumbnail.extension}`;
        }));
        
        const creatorName = await Promise.all(filteredSeriesItems.map(async (creator: Creator) => {
            return `${creator.fullName}`;
        }));

        
        for (const [index, creator] of creators.entries()) {
            try {
                    const isHaveCreator = filteredSeriesItems.some((item:any) => item.fullName === creator.name)
                    if(isHaveCreator){
                        const seriesNames = seriesByCreatorName.get(creatorName[index]) || []
                        const seriesData = seriesNames.map((name:any) => ({ name }))
    
                        const CreatorJob = new creatorSchema({
                            name: creatorName[index],
                            funcao:creatorRole[index],
                            series: seriesData,
                            thumbnail:thumbnailUrls[index]
                        });
            
                        await CreatorJob.save()
                    }
                    
                
            } catch (error) {
                console.error("Erro ao salvar no banco de dados:", error)
            }
        }

        return creators
    }

    async Create(creator: Creator) {
      const createCreator = await creatorSchema.create(creator)
      return createCreator
    }

    async findByIdCreator(id: String) {
      const FindById = await creatorSchema.findById(id)
      return FindById
    }

    async Update(id: String, creator: any) {
      const updateCreator = await creatorSchema.findByIdAndUpdate(id, {
        name: creator.name,
        funcao: creator.funcao,
        thumbnail:creator.thumbnail,
        series: creator.series.map((serie: any) => ({ name: serie.name }))
    }, { new: true })
      return updateCreator
    }

    async Delete(id: String){
      try{
        const deleteCreator = await creatorSchema.findByIdAndDelete(id)
        return deleteCreator
      } catch (error) {
        throw new Error(`Erro ao deletar Criador: ${error}`)
      }
    }

    async FilterByRole(funcao: String){
      try{
        const filterRole = await creatorSchema.find({ funcao: funcao });
        return filterRole;
      } catch (error) {
        throw new Error(`Erro ao Filtrar pela Função: ${error}`);
      }
    }

    async SearchCreatorSeries(name: String) {
      try{
        const search = await creatorSchema.findOne({ name: name}, 'series -_id');
        return search?.series;
      } catch (error) {
        throw new Error(`Erro ao buscar as seríes do criador: ${error}`);
      }
    }

    async SearchCreator(name: String){
      try{
        const existsCreator = await creatorSchema.find({ name: name })
        return existsCreator
      } catch (error) {
        throw new Error(`Erro ao buscar Criadores no API: ${error}`)
      }
    }

}


export default new CreatorService()