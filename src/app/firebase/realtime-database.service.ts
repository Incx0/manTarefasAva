import { Injectable, inject } from '@angular/core';
import { Database, ref, set, onValue, remove, get, child, update } from '@angular/fire/database';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealtimeDatabaseService {

  private db = inject(Database);

  ref(url: string){
    return ref(this.db, url);
  }

  async getListLength(url: string): Promise<number> {
    const snapshot = await get(child(ref(this.db), url));
    if (snapshot.exists()){
      const data = snapshot.val();
      return Object.keys(data).length;
    }
    return 0;
  }

  add(url: string, data: any, id: number = 0){
    return from((async () => {

      let indice = 0;

      try{
        const length = await this.getListLength(url);
        indice = length + 1;
      } catch(e){
        console.warn('Erro ao buscar lista:', e);
      }

      const url_indice = id === 0 ? indice : id;
      const url_full = `${url}/${url_indice}`;
      const refObj = this.ref(url_full);

      return set(refObj, data);
    })());
  }

  query(url: string, callback: any){
    return onValue(this.ref(url), callback);
  }

  update(path: string, data: any): Promise<void> {
    const dbRef = ref(this.db, path);
    return update(dbRef, data);
  }

  remove(url: string) {
    return remove(this.ref(url));
  }
}