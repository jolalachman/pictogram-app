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

  async seedDatabase() {
    const tiles = [
      { label: 'Kawa', isCustom: false, iconName: 'coffee', color:'default', isSelected: false },
      { label: 'Serce', isCustom: false, iconName: 'heart', color:'default', isSelected: false },
      { label: 'Gwiazda', isCustom: false, iconName: 'star', color:'default', isSelected: false },
      { label: 'Samochód', isCustom: false, iconName: 'car', color:'default', isSelected: false },
      { label: 'Dom', isCustom: false, iconName: 'home', color:'default', isSelected: false },
      { label: 'Osoba', isCustom: false, iconName: 'user', color:'default', isSelected: false },
      { label: 'Komputer', isCustom: false, iconName: 'laptop', color:'default', isSelected: false },
      { label: 'Książka', isCustom: false, iconName: 'book-open', color:'default', isSelected: false },
      { label: 'Uśmiech', isCustom: false, iconName: 'smile', color:'default', isSelected: false },
      { label: 'Pieniądze', isCustom: false, iconName: 'money-bill', color:'default', isSelected: false },
      { label: 'Telefon', isCustom: false, iconName: 'phone', color:'default', isSelected: false },
      { label: 'Samolot', isCustom: false, iconName: 'plane', color:'default', isSelected: false },
      { label: 'Tort', isCustom: false, iconName: 'birthday-cake', color:'default', isSelected: false },
      { label: 'Praca', isCustom: false, iconName: 'briefcase', color:'default', isSelected: false },
      { label: 'Muzyka', isCustom: false, iconName: 'music', color:'default', isSelected: false },
    ];
    try {
      for(const tile of tiles) {
        const docRef = await addDoc(this.tilesCollection, tile);
        console.log('Tile added with ID: ', docRef.id);
      }
      console.log('Database seeding completed.');
    } catch (error){
      console.log('Error seeding database: ', error);
    }
    // window.location.reload();
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
