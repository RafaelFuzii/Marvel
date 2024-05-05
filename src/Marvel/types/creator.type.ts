export interface Series {
  name: String,
}


export interface Creator{
  fullName: String,
  role: String,
  thumbnail: {
      path: string;
      extension: string;
  },
  quadrinhos: Series[]
}