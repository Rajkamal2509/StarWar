import { Injectable } from '@angular/core';
import { CryptoService } from '../crypto/crypto.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(public crypto: CryptoService) {}

  setKey(key: string, data: any): void {
    data = this.crypto.encrypt(data, key);
    localStorage.setItem(key, data);
  }

  getKey(key: string) {
    if (localStorage.getItem(key)) {
      return this.crypto.decrypt(localStorage.getItem(key), key);
    }
  }

  clearStorage() {
    localStorage.clear();
  }

  removeKey(key: string) {
    localStorage.removeItem(key);
  }
}
