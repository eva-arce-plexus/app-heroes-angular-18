import { Component, inject } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-notification-toast',
  standalone: true,
  imports: [],
  templateUrl: './notification-toast.component.html',
  styleUrl: './notification-toast.component.scss'
})

export class NotificationToastComponent {
  public heroesService = inject(HeroesService);
}
