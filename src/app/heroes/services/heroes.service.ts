import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Hero } from "../models/interfaces/hero.interfaces";


@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:3000/heroes";

  /**
   * Fetches the list of heroes from the API.
   * @return Observable of Hero array.
   */
  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl);
  }

  /**
   * Fetches a single hero by its ID from the API.
   * @param id Hero identifier.
   * @returns Observable of Hero array.
   */
  public getHeroById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.apiUrl}/${id}`);
  }

  public createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.apiUrl, hero);
  }
}
