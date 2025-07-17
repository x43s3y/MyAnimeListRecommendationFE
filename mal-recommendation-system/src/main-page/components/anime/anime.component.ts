import { Component } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { Anime } from '../../../types/anime'
import { combineLatest, map, Observable } from 'rxjs';
import { Genres } from '../../../types/genre';


@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.scss'
})
export class AnimeComponent {
    animeData$!: Observable<Anime[]>;
    filteredAnimeData$!: Observable<Anime[]>;
    genresData$!: Observable<Map<string, number>>;
    userTopGenres$!: Observable<Map<string, number>>;
    genresList: Genres[] = [];
    sortedGenresOnUserPopularity!: Map<Genres[], number>;
    randomAnime$!: Observable<Anime>;
    
    constructor(private animeService: AnimeService) {}

    ngOnInit() {
        this.genresData$ = this.animeService.getUserWatchedGenres()

        this.userTopGenres$ = this.extractTopUserGenres(this.genresData$)

        this.animeData$ = this.animeService.getAnimes().pipe(
            map(response => response.map(anime => {
                return new Anime(
                    anime.title,
                    anime.mean,
                    anime.genre_list.map(g => new Genres(g.genre)),
                    anime.icon
                )}
            ))
        )

        this.filteredAnimeData$ = this.filterAnimeOnGenres(this.animeData$, this.userTopGenres$)
    }

    private filterAnimeOnGenres(animes$: Observable<Anime[]>, genres$: Observable<Map<string, number>>) {
        return combineLatest([animes$, genres$]).pipe(
            map(([animes, genres]) => {
                return animes.filter(anime =>
                    anime.genre_list.some(g => genres.has(g.genre))
                );
            })
        )
    }

    public generateRandomAnime(animes$: Observable<Anime[]>) {
        this.randomAnime$ = animes$.pipe(
            map(animes => {
                const randomIndex = Math.floor(Math.random() * animes.length)
                return animes[randomIndex]
            })
        )
    }

    private extractTopUserGenres(genres: Observable<Map<string, number>>) {
        return genres.pipe(
            map(response => {                                
                const genreMap = new Map<string, number>(Object.entries(response));
                const sortedGenreMap = new Map(
                [...genreMap.entries()]
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 10)
                );

                return sortedGenreMap
            })
        )
    }
}
