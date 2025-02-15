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

  private defaultTileLayout = 2;

  private tilesCollection = collection(this.firestore, 'tiles');

  constructor(private firestore: Firestore, private authService: AuthService) { }

  async addTile(tile: {label: string; isCustom: boolean, icon: string, category: string}){

    this.authService.user$.subscribe( async user => {
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
      } catch (error){
      console.log('Error adding tile: ', error);
      }

    });

  }

  getUserTiles(): Observable<Tile[]> {
    return this.authService.user$.pipe(
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

  async deleteTile(tile: Tile) {
    this.authService.user$.subscribe( async user => {
      if(!user) {
        console.log("Nie można dodać, użytkownik niezalogowany");
        return;
      }

      try {
        const querySnapshot = await getDocs(this.tilesCollection);
        const tileToDelete = querySnapshot.docs.find((docSnapshot) => {
          const data = docSnapshot.data();
          return data['userId'] === user.uid && data['icon'] === tile.icon && data['label']===tile.label;
        });

        if (tileToDelete) {
          // Step 3: Delete the matching document
          const docRef = doc(this.firestore, 'tiles', tileToDelete.id);
          await deleteDoc(docRef);
          console.log('Document deleted:', tileToDelete.id);
        } else {
          console.log('No matching tile found.');
        }
      } catch (error){
        console.log('Error deleting tile: ', error);
      }

    });
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

  get tileLayout(): number {
    return parseInt(localStorage.getItem('tileLayout') ?? this.defaultTileLayout.toString());
  }

  changeTileLayout(newTileLayout: number) {
    localStorage.setItem('tileLayout', newTileLayout.toString());
  }
  
}
