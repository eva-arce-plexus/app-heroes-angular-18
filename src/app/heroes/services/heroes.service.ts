import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
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

  /**
   * Creates a new hero.
   * @param hero - Hero data to be created.
   * @returns Observable that emits the created hero. Rethrows a error message on failure.
   */
  public createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.apiUrl, hero).pipe(
       catchError(
        (err) => {
          const raw = err?.error;
          const isDuplicate = typeof raw === 'string' && raw.toLowerCase().includes('duplicate id');
          const message = isDuplicate
            ? '❌ Cannot create hero. Try a different Superhero name.'
            : '❌ Error creating hero. Please try again.';
          return throwError(() => new Error(message));
        }
      )
    );
  }
}
