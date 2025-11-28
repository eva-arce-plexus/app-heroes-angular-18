import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../models/interfaces/hero.interfaces';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss'
})

export class HeroFormComponent {
  /** Service to handle hero API requests */
  private _heroService = inject(HeroesService);

  /** Router for navigation */
  private _router = inject(Router);

  /** FormBuilder to create reactive form */
  private _fb = inject(FormBuilder);

  /** Reactive form for hero creation */
  public heroForm = this._fb.group({
    superhero: ["", [Validators.required]],
    img: [""],
    publisher: ["", [Validators.required]],
    alter_ego: ["", [Validators.required]],
    first_appearance: ["", [Validators.required]],
    alt_img: [""],
  });

  /** Field configuration for dynamic form rendering */
  public fields = [
    { name: 'superhero', label: 'Superhero', required: true },
    { name: 'publisher', label: 'Publisher', required: true },
    { name: 'alter_ego', label: 'Alter Ego', required: true },
    { name: 'first_appearance', label: 'First Appearance', required: true },
    { name: 'img', label: 'Image', required: false },
    { name: 'alt_img', label: 'Alt Image', required: false },
  ];

  /** Handles hero creation when form is submitted */
  public addHero(): void {
    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched();
      return;
    }

    const newHero: Hero = {
      id: this.heroForm.value.superhero!.toLowerCase().replace(/\s+/g, '-'),
      ...this.heroForm.value,
    } as Hero;

    this._heroService.createHero(newHero).subscribe({
      next: () => {
        this.heroForm.reset();
        setTimeout(() => this.goToHomePage(), 4000);
      }
    });
  }

  /** Navigates to hero list page */
  public goToHomePage(): void {
    this._router.navigate(['/heroes/list']);
  }

  /** Clears the form fields */
  public cleanForm(): void {
    this.heroForm.reset();
  }

  /** Checks if a form field is invalid and has been touched. */
  public isFieldInvalid(fieldName: string): boolean {
    const control = this.heroForm.get(fieldName);
    return control ? control.invalid && control.touched : false;
  }
}
