export interface Character{
    id: Number,
    name: String,
    description: String,
    thumbnail: {
        path: string;
        extension: string;
    };
}