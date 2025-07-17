import { Genres } from "./genre"

export class Anime {
    public title: string
    public mean: number
    public genre_list: Genres[]
    public icon?: string

    constructor(title: string, mean: number, genres: Genres[], icon?: string) {
        this.title = title
        this.mean = mean
        this.genre_list = genres
        this.icon = icon
    }
}