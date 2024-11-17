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
import { triangle, ellipse, personCircleOutline } from 'ionicons/icons';
import { AuthService } from './components/auth/services';

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
    TranslateModule,
  ],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(private authService: AuthService) {
    addIcons({ triangle, ellipse, personCircleOutline });
  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  public logout() {
    this.authService.logout();
  }
}
