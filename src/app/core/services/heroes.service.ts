import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Hero } from "../hero.interfaces";


@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:3000/heroes";

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl);
  }
}
