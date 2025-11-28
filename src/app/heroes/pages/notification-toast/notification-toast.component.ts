import { Component, effect, inject, signal } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-notification-toast',
  standalone: true,
  imports: [],
  templateUrl: './notification-toast.component.html',
  styleUrl: './notification-toast.component.scss'
})

export class NotificationToastComponent {
  /** Provides access to HeroesService for fetching hero data. */
  private readonly _heroesService = inject(HeroesService);

  /** Signal that stores the current notification message from the service */
  public notification = this._heroesService.notification;

  /** Signal that stores the current notification type (success or error) */
  public notificationType = this._heroesService.notificationType;
}
