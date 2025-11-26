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
  private router = inject(Router);

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

  /** Current notification message */
  public notification: string | null = null;

  /** Notification type: success or error */
  public notificationType: 'success' | 'error' = 'success';

  /**
   * Handles hero creation when form is submitted
   */
  public addHero(): void {
    if (this.heroForm.valid) {
      const newHero: Hero = {
        id: this.heroForm.value.superhero!.toLowerCase().replace(/\s+/g, '-'),
        ...this.heroForm.value,
      } as Hero;

      this._heroService.createHero(newHero).subscribe({
        next: (hero) => {
          this.showNotification('✅ Hero created successfully!', 'success');
          this.heroForm.reset();
          setTimeout(() => this.goToHomePage(), 3000);
        },
        error: (err) => {
          const raw = err?.error;
          const isDuplicate = typeof raw === 'string' && raw.toLowerCase().includes('duplicate id');
          const message = isDuplicate
            ? '❌ Cannot create hero. Try a different Superhero name.'
            : '❌ Error creating hero. Please try again.';
          this.showNotification(message, 'error');
        }
      });
    }
  }

  /**
    * Displays a temporary notification
    * @param message Notification text
    * @param type Notification type (success/error)
    */
  private showNotification(message: string, type: 'success' | 'error') {
    this.notification = message;
    this.notificationType = type;
    setTimeout(() => this.notification = null, 6000);
  }

  /** Navigates to hero list page */
  public goToHomePage(): void {
    this.router.navigate(['/heroes/list']);
  }
  /** Clears the form fields */
  public cleanForm(): void {
    this.heroForm.reset();
  }
}
