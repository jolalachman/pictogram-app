import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore';
import { History } from 'src/app/models/history.model';
import { AuthService } from '../../auth/services';
import { Tile } from 'src/app/models/tile.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private historyCollection = collection(this.firestore, 'history'); // Kolekcja w Firebase

  constructor(private firestore: Firestore, private authService: AuthService) {}

  async saveHistory(selectedTiles: string, generatedSentence: string) {

    this.authService.getCurrentUser().subscribe( async user => {
      if(!user) {
        console.log("Nie można zapisać historii, użytkownik niezalogowany");
        return;
      }

      try {
        const historyEntry = {
          userId: user.uid,
          selectedTiles: selectedTiles,
          generatedSentence: generatedSentence,
          creationDate: new Date()
        };

        const docRef = await addDoc(this.historyCollection, 
          historyEntry
        );
        console.log('History added with ID: ', docRef.id);
      } catch (error){
      console.log('Error adding history: ', error);
      }

    });

  }

  async getUserHistory(userId: string): Promise<History[]> {
    // const q = query(this.historyCollection, where('userId', '==', userId));
    // const querySnapshot = await getDocs(q);
    
    // return querySnapshot.docs.map(doc => doc.data() as History);

    return new Promise((resolve) => {
      this.authService.getCurrentUser().subscribe(async user => {
        try{
          let q;
          if (user) {
            q = query(this.historyCollection, where('userId', '==', user.uid));
          } else {
            console.log('Brak zalogowanego użytkownika, nie można pobrać historii');
            return;
          }

          const querySnapshot = await getDocs(q);

          const history = querySnapshot.docs
            .map(doc => {
              const data = doc.data();
              return {
                selectedTiles: data['selectedTiles'] || '',
                generatedSentence: data['generatedSentence'],
                creationDate: data['creationDate']
              } as History
            });

            resolve(history);
        } catch (error){
          console.error("Błąd pobierania historii:", error);
          // reject(error);
        }
        });
    });

  }
}
