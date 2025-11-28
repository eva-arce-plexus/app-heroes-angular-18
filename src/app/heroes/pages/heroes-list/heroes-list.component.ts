import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HeroesService } from '../../services/heroes.service';
import { RouterLink } from "@angular/router";
import { Hero } from '../../models/interfaces/hero.interfaces';

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss'
})

export class HeroesListComponent implements OnInit {

  /** Provides access to HeroesService for fetching hero data. */
  private readonly _heroesService = inject(HeroesService);

  /** Writable signal that holds the current list of heroes */
  public heroes = signal<Hero[]>([]);

  /** Loads heroes when component initializes */
  ngOnInit(): void {
    this._heroesService.getHeroes().subscribe({
      next: (data) => this.heroes.set(data),
      error: (err) => console.error('Error loading heroes:', err)
    });
  }

  /**
   * Deletes a hero after user confirmation and updates the list reactively.
   *
   * @param id Hero identifier to delete.
   */
  public deleteHero(id: string): void {
    const confirmed = confirm('Are you sure you want to delete this hero?');
    if (!confirmed) return;

    this._heroesService.deleteHero(id).subscribe({
      next: () => {
        this.heroes.update((currentHeroes: Hero[]) =>
          currentHeroes.filter((hero: Hero) => hero.id !== id)
        );
      },
      error: (err) => console.error('Error deleting hero:', err)
    });

  }
}
