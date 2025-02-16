import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import OpenAI from 'openai';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { getItem, setItem } from 'src/app/storage';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private defaultPrompt = 'Stwórz zdanie lub pytanie z podanych wyrazów. Nie odnoś się do poprzednio wygenerowanych zdań i nie dodawaj nic nadmiarowego, ale popraw je aby miało sens gramatycznie.';

  constructor(private translate: TranslateService, private alertController: AlertController) {
    this.initPrompt();
  }

  async initPrompt() {
    const newPrompt = await this.getPrompt();
    await setItem('prompt', newPrompt);
  }

  
  async generateSentece(inputWords: string): Promise<string | null> {
    try {
      const openai = new OpenAI({
        apiKey: environment.openAPIKey,
        dangerouslyAllowBrowser: true
      });

      const newPrompt = await this.getPrompt();
  
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
          {
            "role": "user",
            "content": `${newPrompt}. Odpowiedz w języku w języku ${this.translate.currentLang}. Oto podane wyrazy: ${inputWords}`
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

  async getPrompt() {
    return await getItem('prompt') ?? this.defaultPrompt;
  }

  async changePrompt(newPrompt: string) {
    await setItem('prompt', newPrompt);
  }
}
