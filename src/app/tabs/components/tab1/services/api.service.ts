import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import OpenAI from 'openai';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private translate: TranslateService) { }

  
  async generateSentece(inputWords: string): Promise<string | null> {

    const openai = new OpenAI({
      apiKey: environment.openAPIKey,
      dangerouslyAllowBrowser: true
    });
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {"role": "user", "content": `Stwórz zdanie z podanych wyrazów: ${inputWords} w języku ${this.translate.currentLang}. Wygenerowane zdanie ma za zadanie ułatwić komunikację osobom z trudnościami (np. nieumiejącym mówić).`},
      ],
    });
    
    return completion.choices[0].message.content;

    
  }



}
