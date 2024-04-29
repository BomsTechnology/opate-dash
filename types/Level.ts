export interface Level {
    id: string
    level: number
    name: string
    nb_points: number
    languages: {
        id: string
        name: string
        image: string
        path: string
    }
}