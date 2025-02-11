import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import OpenAI from 'openai';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private translate: TranslateService, private alertController: AlertController) { }

  
  async generateSentece(inputWords: string): Promise<string | null> {
    try {
      const openai = new OpenAI({
        apiKey: environment.openAPIKey,
        dangerouslyAllowBrowser: true
      });
  
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
          {
            "role": "user",
            "content": `Stwórz zdanie lub pytanie z podanych wyrazów w języku ${this.translate.currentLang}. Nie odnoś się do poprzednio wygenerowanych zdań i nie dodawaj nic nadmiarowego, ale popraw je aby miało sens gramatycznie. Oto podane wyrazy: ${inputWords}`
          },
        ],
      });
  
      return completion.choices[0].message.content;
  
    } catch (error) {
      this.showErrorAlert(error);
      return null;
    }
  }

  async showErrorAlert(error: any) {
    const alert = await this.alertController.create({
      header: 'Error',  // Title of the alert
      message: `An error occurred: ${this.translate.instant(error.message)  || 'Something went wrong'}`, // Error message
      buttons: ['OK']  // Button to dismiss the alert
    });

    await alert.present();  // Show the alert
  }
}
