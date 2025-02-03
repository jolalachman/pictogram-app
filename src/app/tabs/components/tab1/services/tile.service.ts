import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services';
import { addDoc, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Tile } from 'src/app/models/tile.model';

@Injectable({
  providedIn: 'root'
})
export class TileService {

  private tilesCollection = collection(this.firestore, 'tiles');

  constructor(private firestore: Firestore, private authService: AuthService) { }

  async addTile(tile: {label: string; isCustom: boolean, iconName: string}){
    const user = this.authService.getCurrentUser();
    if (!user) return;
    try {
      const docRef = await addDoc(this.tilesCollection, 
        tile
      //,userid
      );
      console.log('Tile added with ID: ', docRef.id);
    } catch (error){
      console.log('Error adding tile: ', error);
    }
    window.location.reload();
    // await addDoc()
  }

  async getUserTiles(): Promise<Tile[]> {
    const user = this.authService.getCurrentUser();
    //TODO return wszystkie wspólne
    if (!user) return [];

    // const q = query(this.tilesCollection, where('userId', '==', user.uid));
    const q = query(this.tilesCollection);

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs
      .map(doc => {
        const data = doc.data();
        return {
          label: data['label'] || 'Brak nazwy',
          isCustom: data['isCustom'] ?? false,
          iconName: data['iconName'] || ''
        } as Tile
      });

    // return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // async addTile(tile: { label: string; icon: string }) {
  //   const user = this.authService.getCurrentUser(); // Pobierz aktualnego użytkownika
  //   if (!user) return;

  //   await addDoc(this.tilesCollection, {
  //     ...tile,
  //     userId: user.uid // Przypisujemy kafelek do użytkownika
  //   });
  // }

  // async getUserTiles() {
  //   const user = this.authService.getCurrentUser();
  //   if (!user) return [];

  //   const q = query(this.tilesCollection, where('userId', '==', user.uid));
  //   const querySnapshot = await getDocs(q);

  //   return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  // }
}
