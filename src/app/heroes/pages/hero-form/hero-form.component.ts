import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../models/interfaces/hero.interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss'
})

export class HeroFormComponent implements OnInit {
  /** Service to handle hero API requests */
  private _heroService = inject(HeroesService);

  /** Router for navigation */
  private _router = inject(Router);

  /** ActivatedRoute to detect edit mode and read: id */
  private _route = inject(ActivatedRoute);

  /** FormBuilder to create reactive form */
  private _fb = inject(FormBuilder);

  /** Flag to know if the form is in edit mode */
  public isEdit = false;

  /**
   * Initializes the form mode (create or edit) based on the route.
   * If an `id` is present, loads the hero data into the form for editing.
   */
  ngOnInit(): void {
    const heroId = this._route.snapshot.paramMap.get('id');
    this.isEdit = !!heroId;

    if (this.isEdit && heroId) {
      this._loadHero(heroId);
    }
  }

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
  public submit(): void {
    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched();
      return;
    }

    const formValue = this.heroForm.value;
    const heroId = this._route.snapshot.paramMap.get('id');
    const hero: Hero = {
      id: this.isEdit && heroId
        ? heroId
        : formValue.superhero!.toLowerCase().replace(/\s+/g, '-'),
      ...formValue,
    } as Hero;

    const request = this.isEdit
      ? this._heroService.updateHero(hero)
      : this._heroService.createHero(hero);

    request.subscribe({
      next: () => {
        setTimeout(() => this.goToHomePage(), 4000);
      },
      error: (err) => {
        console.error('Error saving hero:', err);
      }
    });
  }

  /** Navigates to hero list page */
  public goToHomePage(): void {
    this._router.navigate(['/heroes/list']);
    this._cleanForm();
  }

  /** Checks if a form field is invalid and has been touched. */
  public isFieldInvalid(fieldName: string): boolean {
    const control = this.heroForm.get(fieldName);
    return control ? control.invalid && control.touched : false;
  }

  /**
   * Returns the hero image path or a default placeholder if none is provided.
   *
   * @param heroImg Image name or null/undefined.
   * @returns Path to the hero image or default image.
   */
  public getHeroImage(heroImg: string | null | undefined): string {
    if (!heroImg || heroImg.trim() === '') {
      return 'assets/no-image.png';
    }
    return `assets/heroes/${heroImg}.jpg`;
  }

  /**
   * Loads hero data into the form for edit mode.
   * @param id Hero ID to fetch data.
   */
  private _loadHero(id: string): void {
    this._heroService.getHeroById(id).subscribe({
      next: (hero) => {
        this.heroForm.patchValue({
          superhero: hero.superhero,
          img: hero.img ?? '',
          publisher: hero.publisher,
          alter_ego: hero.alter_ego,
          first_appearance: hero.first_appearance,
          alt_img: hero.alt_img ?? ''
        });
      }
    });
  }

  /** Clears the form fields */
  private _cleanForm(): void {
    this.heroForm.reset();
  }
}
