import { Component, EnvironmentInjector, inject } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { triangle, ellipse, personCircleOutline, chatbubbleEllipsesOutline, reloadOutline, exitOutline } from 'ionicons/icons';
import { AuthService } from './components/auth/services';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    CommonModule,
    TranslateModule,
  ],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  user$ = this.authService.user$;

  constructor(private authService: AuthService, private router: Router) {
    addIcons({chatbubbleEllipsesOutline,reloadOutline,exitOutline,personCircleOutline});
  }

  public logout() {
    this.authService.logout().finally( () => { 
      this.router.navigate(['/tabs/tab1']);
      return;
  });
  }
}
