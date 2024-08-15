  import { Injectable } from '@angular/core';
  import * as CryptoJs from "crypto-js";

  @Injectable({
    providedIn: 'root'
  })
  export class CryptoService {
    constructor() {}

    encrypt(data: any, key: any) : any {
      try {
        return CryptoJs.AES.encrypt(JSON.stringify(data), key).toString();
      } catch (err) {
        console.log(err);
      }
    }

    decrypt(data: any, key: any) {
      try { 
        const bytes : any = CryptoJs.AES.decrypt(data, key);
        if (bytes === "") {
          return "";
        } else {
          if (bytes.toString()) {
            return JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
          }
          return data;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
