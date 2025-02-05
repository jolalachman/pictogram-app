import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import OpenAI from 'openai';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor() { }

  async generateSentece(inputWords: string){

    const openai = new OpenAI({
      apiKey: environment.openAPIKey,
      dangerouslyAllowBrowser: true
    });
    
    const completion = openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {"role": "user", "content": `Stwórz zdanie z podanych wyrazów: ${inputWords}.`},
      ],
    });
    
    completion.then((result) => console.log(result.choices[0].message.content));

    
  }



}
