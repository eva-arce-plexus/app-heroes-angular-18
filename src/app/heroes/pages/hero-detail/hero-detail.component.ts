import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink} from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Hero } from '../../models/interfaces/hero.interfaces';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [RouterLink],
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
  private _heroId = this._route.snapshot.paramMap.get('id')!;

  /**
   * Signal holding hero details fetched by ID.
   */
  public hero = toSignal(this._heroesService.getHeroById(this._heroId), { initialValue: null });

  /**
   * Builds the image path for a hero.
   * If no image is provided, returns a default placeholder.
   *
   * @param hero Hero object containing the image name.
   * @returns Image path as a string.
   */
  public getHeroImage(hero: Hero): string {
    const img = hero.img?.trim();
    return img && img !== ''
      ? `assets/heroes/${img}.jpg`
      : 'assets/no-image.png';
  }
}
