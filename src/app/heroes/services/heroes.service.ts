import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Hero } from "../models/interfaces/hero.interfaces";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  /** HttpClient for API requests */
  private _http = inject(HttpClient);

  /** Current notification message */
  public notification: string | null = null;

  /** Notification type: success or error */
  public notificationType: 'success' | 'error' = 'success';

  /** Base API URL for heroes */
  private _apiUrl = "http://localhost:3000/heroes";

  /**
   * Fetches the list of heroes from the API.
   * @return Observable of Hero array.
   */
  public getHeroes(): Observable<Hero[]> {
    return this._http.get<Hero[]>(this._apiUrl).pipe(
      tap(() => {
        this._setNotification('✅ Heroes loaded successfully!', 'success');
      }),
      catchError((err) => {
        this._setNotification('❌ Error loading heroes. Please try again.', 'error');
        return throwError(() => new Error('Error loading heroes'));
      })
    );
  }

  /**
   * Fetches a single hero by its ID from the API.
   * @param id Hero identifier.
   * @returns Observable of Hero array.
   */
  public getHeroById(id: string): Observable<Hero> {
    return this._http.get<Hero>(`${this._apiUrl}/${id}`)
      .pipe(
        tap(() => {
          this._setNotification('✅ Hero details loaded successfully!', 'success');
        }),
        catchError((err) => {
          this._setNotification('❌ Error loading hero details. Please try again.', 'error');
          return throwError(() => new Error('Error loading hero details'));
        })
      );
  }

  /**
   * Creates a new hero.
   * Shows success or error notification automatically.
   * @param hero Hero data to be created.
   * @returns Observable that emits the created hero.
   */
  public createHero(hero: Hero): Observable<Hero> {
    return this._http.post<Hero>(this._apiUrl, hero).pipe(
      tap(() => {
        this._setNotification('✅ Hero created successfully!', 'success');
      }),
      catchError(
        (err) => {
          const raw = err?.error;
          const isDuplicate = typeof raw === 'string' && raw.toLowerCase().includes('duplicate id');
          const message = isDuplicate
            ? '❌ Cannot create hero. Try a different Superhero name.'
            : '❌ Error creating hero. Please try again.';
          this._setNotification(message, 'error');
          return throwError(() => new Error(message));
        }
      )
    );
  }

  /**
   * Updates an existing hero
   * Requires a valid hero.id.
   * @param hero Full hero data to update.
   * @returns Observable that emits the updated hero.
   */
  public updateHero(hero: Hero): Observable<Hero> {
    if (!hero?.id) {
      const msg = '❌ Cannot update hero without a valid id.';
      this._setNotification(msg, 'error');
      return throwError(() => new Error(msg));
    }

    return this._http.put<Hero>(`${this._apiUrl}/${hero.id}`, hero).pipe(
      tap(() => {
        this._setNotification('✅ Hero updated successfully!', 'success');
      }),
      catchError(() => {
        const message = '❌ Error updating hero. Please try again.';
        this._setNotification(message, 'error');
        return throwError(() => new Error(message));
      })
    );
  }

  /**
  * Displays a temporary notification
  * @param message Notification text
  * @param type Notification type (success/error)
  */
  private _setNotification(message: string, type: 'success' | 'error') {
    this.notification = message;
    this.notificationType = type;

    setTimeout(() => this.notification = null, 4000);
  }
}
