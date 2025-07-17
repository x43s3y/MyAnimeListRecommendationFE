import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Anime } from '../../types/anime';
import { Genres } from '../../types/genre';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private apiUrl = 'http://localhost:8000/'; // Main URL
  private apiUrlAllAnime = `${this.apiUrl}all-anime`; // ← Python Local FastAPI url for user animes
  private apiUrlUser = `${this.apiUrl}user-anime`; // ← Python Local FastAPI url for user animes
  private apiUrlUserGenres = `${this.apiUrl}user-anime-genres`; // ← Python Local FastAPI url for user animes

  constructor(private http: HttpClient) {}

  getAnimes(): Observable<Anime[]> {
    const animes = this.http.get<Anime[]>(this.apiUrlAllAnime);
    return animes
  }

  getUserAnimes(): Observable<Anime[]> {
    const animes = this.http.get<Anime[]>(this.apiUrlUser);
    return animes
  }
  
  getUserWatchedGenres(): Observable<Map<string, number>> {
    const genres = this.http.get<Map<string, number>>(this.apiUrlUserGenres);
    return genres
  }
}
