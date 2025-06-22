import { Component } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { CommonModule } from '@angular/common';
import { UserAnime } from '../../../types/userAnime.interface'
import { map, Observable } from 'rxjs';
import { Genres } from '../../../types/genre.interface';


@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.scss'
})
export class AnimeComponent {
    animeData$!: Observable<UserAnime[]>;
    
    constructor(private animeService: AnimeService) {}

    ngOnInit() {
        this.animeData$ = this.animeService.getAnimes().pipe(
            map(response => response.map(anime => 
                new UserAnime(
                    anime.title,
                    anime.mean,
                    anime.genre_list.map(g => new Genres(g.genre)),
                    anime.icon
                    )
            ))
        )
    }

    extractUserGenre(animeList: UserAnime[]) {}
}
