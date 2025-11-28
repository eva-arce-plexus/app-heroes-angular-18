import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HeroesService } from '../../services/heroes.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss'
})

export class HeroesListComponent {

  /** Provides access to HeroesService for fetching hero data. */
  private readonly _heroesService = inject(HeroesService);

  /** Reactive signal that stores the list of heroes. */
  public heroes = toSignal(this._heroesService.getHeroes(), { initialValue: [] });
}
