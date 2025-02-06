import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore';
import { HistoryModel } from 'src/app/models/history.model';
import { AuthService } from '../../auth/services';
import { Tile } from 'src/app/models/tile.model';
import { orderBy } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private historyCollection = collection(this.firestore, 'history'); // Kolekcja w Firebase

  constructor(private firestore: Firestore, private authService: AuthService) {}

  async saveHistory(selectedTiles: string, generatedSentence: string) {
    console.log(selectedTiles);
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

  async getUserHistory(): Promise<HistoryModel[]> {

    return new Promise((resolve) => {
      this.authService.getCurrentUser().subscribe(async user => {
        try{
          let q;
          if (user) {
            // q = query(this.historyCollection, where('userId', '==', user.uid), orderBy('creationDate', 'desc'));
            q = query(this.historyCollection, where('userId', '==', user.uid));

          } else {
            console.log('Brak zalogowanego użytkownika, nie można pobrać historii');
            resolve([]);
            return;
          }

          const querySnapshot = await getDocs(q);

          const history = querySnapshot.docs
            .map(doc => {
              const data = doc.data();
              return {
                userId: data['userId'],
                selectedTiles: data['selectedTiles'] || '',
                generatedSentence: data['generatedSentence'],
                creationDate: data['creationDate']
              } as HistoryModel
            });

            resolve(history);
        } catch (error){
          console.error("Błąd pobierania historii:", error);
          resolve([]);
          // reject(error);
        }
        });
    });

  }
}
