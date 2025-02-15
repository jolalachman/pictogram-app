import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireModule } from '@angular/fire/compat';
import { FontAwesomeModule, FaIconLibrary  } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { StatusBar, Style } from '@capacitor/status-bar';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

library.add(fas);

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, TranslateModule, CommonModule, AngularFireModule, FontAwesomeModule],
})
export class AppComponent {
  constructor(public translate: TranslateService, library: FaIconLibrary) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('pl');

    const browserLang = translate.getBrowserLang() ?? 'pl';
    const storedLang = localStorage.getItem('lang');
    translate.use(storedLang ?? (browserLang.match(/en|pl/) ? browserLang : 'pl'));
    StatusBar.setOverlaysWebView({ overlay: false });
    StatusBar.setStyle({ style: Style.Dark });
    library.addIconPacks(fas);
  }
}
