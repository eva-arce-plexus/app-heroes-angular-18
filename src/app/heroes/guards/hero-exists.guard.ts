
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HeroesService } from '../services/heroes.service';
import { firstValueFrom } from 'rxjs';


/**
 * Guard that checks if a hero exists before allowing navigation.
 * If the hero does not exist or an error occurs, redirects to the heroes list.
 */
export const heroExistsGuard: CanActivateFn = async (route) => {
  /** Service to fetch hero data */
  const heroesService = inject(HeroesService);

  /** Router instance for navigation */
  const router = inject(Router);

  /** Hero ID extracted from route parameters */
  const id = route.paramMap.get('id')!;

  try {
    const hero = await firstValueFrom(heroesService.getHeroById(id));
    if (hero) {
      return true;
    } else {
      router.navigate(['/heroes/list']);
      return false;
    }
  } catch {
    router.navigate(['/heroes/list']);
    return false;
  }
};
