import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAnime } from '../../types/userAnime.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private apiUrl = 'http://localhost:8000/user'; // ← Python Local FastAPI url for user animes

  constructor(private http: HttpClient) {}

  getAnimes(): Observable<UserAnime[]> {
    return this.http.get<UserAnime[]>(this.apiUrl);
  }
}
