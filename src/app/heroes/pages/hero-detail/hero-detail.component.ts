import { Component, inject } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss'
})

export class HeroDetailComponent {
  /**
   * Provides access to route parameters.
   */
  private _route = inject(ActivatedRoute);

  /**
   * Provides access to HeroesService for fetching hero data.
   */
  private readonly _heroesService = inject(HeroesService);

  /**
   * Stores the hero ID from the current route.
   */
  private heroId = this._route.snapshot.paramMap.get('id')!;

  /**
   * Signal holding hero details fetched by ID.
   */
  public hero = toSignal(this._heroesService.getHeroById(this.heroId), { initialValue: null });
}
