import { Component, inject, OnInit } from '@angular/core';
import { HeroesService } from '../../core/services/heroes.service';
import { Hero } from '../../core/hero.interfaces';

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss'
})

export class HeroesListComponent implements OnInit {
  heroesService = inject(HeroesService);
  heroes: Hero[] = [];

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes() {
    this.heroesService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    });
  }
}
