export interface SearchParams {
  [key: string]: string | undefined
}

// TODO: make type dynamic
export interface FetchImages {
  data: {
    similarity?: number | undefined
    id: string
    prompt: string
  }[]
  count: number
}

// TODO: make type dynamic
export interface RandomImages {
  data: {
    id: string
  }[]
}
