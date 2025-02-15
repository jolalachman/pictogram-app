import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, orderBy, deleteDoc } from '@angular/fire/firestore';
import { HistoryModel } from 'src/app/models/history.model';
import { AuthService } from '../../auth/services';
import { from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private historyCollection = collection(this.firestore, 'history');

  constructor(private firestore: Firestore, private authService: AuthService) {}

  async saveHistory(selectedTiles: string, generatedSentence: string) {
    this.authService.user$.subscribe( async user => {
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

  getUserHistory(): Observable<HistoryModel[]> {
    return this.authService.user$.pipe(
      switchMap(user => {
        let q;
        if (user) {
          q = query(this.historyCollection, where('userId', '==', user.uid));

        } else {
          console.log('Brak zalogowanego użytkownika, nie można pobrać historii');
          return of([]);
        }

        return from(getDocs(q)).pipe(
          switchMap(querySnapshot => {
            const tiles = querySnapshot.docs.map(doc => {
              const data = doc.data();
              return {
                userId: data['userId'],
                selectedTiles: data['selectedTiles'] || '',
                generatedSentence: data['generatedSentence'],
                creationDate: data['creationDate']
              } as HistoryModel
            }).sort((a, b) => b.creationDate.seconds - a.creationDate.seconds);
            return from([tiles]); // Return the tiles as an observable array
          })
        );
      })
    );
  }

  async deleteHistoryByGeneratedSentence(generatedSentence: string) {
    this.authService.user$.subscribe( async user => {
      if (!user) {
        return;
      }
      try {
        const historyQuery = query(
          this.historyCollection,
          where("userId", "==", user.uid),
          where("generatedSentence", "==", generatedSentence)
        );
  
        const querySnapshot = await getDocs(historyQuery);
  
        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (docSnapshot) => {
            await deleteDoc(docSnapshot.ref);
          });
        }
      } catch (error) {
        console.log('Error deleting history record: ', error);
      }
    });
  }
}
