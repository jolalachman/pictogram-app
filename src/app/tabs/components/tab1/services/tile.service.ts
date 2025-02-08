import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services';
import { addDoc, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { Tile } from 'src/app/models/tile.model';
import { Observable, switchMap, from, async } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TileService {

  private tilesCollection = collection(this.firestore, 'tiles');

  constructor(private firestore: Firestore, private authService: AuthService) { }

  async addTile(tile: {label: string; isCustom: boolean, iconName: string}){

    this.authService.getCurrentUser().subscribe( async user => {
      if(!user) {
        console.log("Nie można dodać, użytkownik niezalogowany");
        return;
      }

      try {
        const newTile = {
          ...tile,
          userId: user.uid
        };

        const docRef = await addDoc(this.tilesCollection, 
          newTile
        );
        console.log('Tile added with ID: ', docRef.id);
      } catch (error){
      console.log('Error adding tile: ', error);
      }
      window.location.reload();

    });

  }

  getUserTiles(): Observable<Tile[]> {
    return this.authService.getCurrentUser().pipe(
      switchMap(user => {
        let q;
        if (user) {
          q = query(this.tilesCollection, where('userId', 'in', ['', user.uid]));
        } else {
          q = query(this.tilesCollection, where('userId', '==', ''));
        }

        return from(getDocs(q)).pipe(
          switchMap(querySnapshot => {
            const tiles = querySnapshot.docs.map(doc => {
              const data = doc.data();
              return {
                label: data['label'] || 'Brak nazwy',
                category: data['category'] || '',
                isCustom: data['isCustom'] ?? false,
                icon: data['icon'] || '',
                isSelected: false,
              } as Tile;
            });
            return from([tiles]); // Return the tiles as an observable array
          })
        );
      })
    );
  }

  async seedDatabase() {
    const tiles: Tile[] = await fetch('./assets/icons/icons.json').then(response => response.json());
    
    try {
      for(const tile of tiles) {
        const docRef = await addDoc(this.tilesCollection, tile);
        console.log('Tile added with ID: ', docRef.id);
      }
      console.log('Database seeding completed.');
    } catch (error){
      console.log('Error seeding database: ', error);
    }
    
  }

  async deleteAllTiles() {
    try {
      // Step 1: Get all documents in the 'tiles' collection
      const querySnapshot = await getDocs(this.tilesCollection);
  
      // Step 2: Loop through each document and delete it
      querySnapshot.forEach(async (docSnapshot) => {
        const docRef = doc(this.firestore, 'tiles', docSnapshot.id);
        await deleteDoc(docRef);
        console.log('Document deleted:', docSnapshot.id);
      });
  
      console.log('All tiles have been deleted.');
    } catch (error) {
      console.error('Error deleting tiles: ', error);
    }
  }
  
}
