export interface Comic{
  id: Number,
  title: String,
  description: String,
  thumbnail: {
      path: string,
      extension: string,
  },
  dates: {
    type: String,
    date: Date
  }[]
}