import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import OpenAI from 'openai';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor() { }

  // async generateSentece(inputWords: string): Promise<string | null> {
  //   const openai = new OpenAI({
  //     apiKey: environment.openAPIKey,
  //     dangerouslyAllowBrowser: true
  //   });
  
  //   const completion = await openai.chat.completions.create({
  //     model: "gpt-4o-mini",
  //     store: true,
  //     messages: [
  //       { "role": "user", "content": `Stwórz zdanie z podanych wyrazów: ${inputWords}.` },
  //     ],
  //   });
  
  //   return completion.choices[0].message.content;  // ⬅ Zwracamy zdanie
  // }
  
  async generateSentece(inputWords: string): Promise<string | null> {

    const openai = new OpenAI({
      apiKey: environment.openAPIKey,
      dangerouslyAllowBrowser: true
    });
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {"role": "user", "content": `Stwórz zdanie z podanych wyrazów: ${inputWords}. Wygenerowane zdanie ma za zadanie ułatwić komunikację osobom z trudnościami (np. nieumiejącym mówić).`},
      ],
    });
    // return completion.choices[0].message.content;
    return completion.choices[0].message.content;
    // completion.then((result) => {return result.choices[0].message.content});

    
  }



}
