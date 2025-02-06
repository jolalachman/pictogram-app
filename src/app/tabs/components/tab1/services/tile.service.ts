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

  async getUserTiles(): Promise<Tile[]> {

    return new Promise((resolve) => {
      this.authService.getCurrentUser().subscribe(async user => {
        try{

          let q;

          if (user) {
            q = query(this.tilesCollection, where('userId', 'in', ['', user.uid]));
          } else {
            q = query(this.tilesCollection, where('userId', '==', ''));
          }

          const querySnapshot = await getDocs(q);

          const tiles = querySnapshot.docs
            .map(doc => {
              const data = doc.data();
              return {
                label: data['label'] || 'Brak nazwy',
                isCustom: data['isCustom'] ?? false,
                iconName: data['iconName'] || '',
                isSelected: false,
                color: "default",
              } as Tile
            });

            resolve(tiles);
        } catch (error){
          console.error("Błąd pobierania kafelków:", error);
          // reject(error);
        }
        });
    });
  }

  async seedDatabase() {
    const tiles = [
      { label: 'Kawa', isCustom: false, iconName: 'coffee', color:'default', isSelected: false, userId: '' },
      { label: 'Serce', isCustom: false, iconName: 'heart', color:'default', isSelected: false, userId: '' },
      { label: 'Gwiazda', isCustom: false, iconName: 'star', color:'default', isSelected: false, userId: '' },
      { label: 'Samochód', isCustom: false, iconName: 'car', color:'default', isSelected: false, userId: '' },
      { label: 'Dom', isCustom: false, iconName: 'home', color:'default', isSelected: false, userId: '' },
      { label: 'Osoba', isCustom: false, iconName: 'user', color:'default', isSelected: false, userId: '' },
      { label: 'Komputer', isCustom: false, iconName: 'laptop', color:'default', isSelected: false, userId: '' },
      { label: 'Książka', isCustom: false, iconName: 'book-open', color:'default', isSelected: false, userId: '' },
      { label: 'Uśmiech', isCustom: false, iconName: 'smile', color:'default', isSelected: false, userId: '' },
      { label: 'Pieniądze', isCustom: false, iconName: 'money-bill', color:'default', isSelected: false, userId: '' },
      { label: 'Telefon', isCustom: false, iconName: 'phone', color:'default', isSelected: false, userId: '' },
      { label: 'Samolot', isCustom: false, iconName: 'plane', color:'default', isSelected: false, userId: '' },
      { label: 'Tort', isCustom: false, iconName: 'birthday-cake', color:'default', isSelected: false, userId: '' },
      { label: 'Praca', isCustom: false, iconName: 'briefcase', color:'default', isSelected: false, userId: '' },
      { label: 'Muzyka', isCustom: false, iconName: 'music', color:'default', isSelected: false, userId: '' },
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
    
  }
  
}
