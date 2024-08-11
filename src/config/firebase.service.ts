import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore, setLogLevel } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService {
  private firestore: Firestore;
  private storage: FirebaseStorage;

  constructor(private configService: ConfigService) {
    const firebaseConfig = {
    apiKey: this.configService.get<string>('FIREBASE_API_KEY'),
    authDomain: this.configService.get<string>('FIREBASE_AUTH_DOMAIN'),
    projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'), 
    storageBucket: this.configService.get<string>('FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: this.configService.get<string>('FIREBASE_MESSAGING_SENDER_ID'),
    appId: this.configService.get<string>('FIREBASE_APP_ID'),
  };


    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Firestore
    this.firestore = getFirestore(app);

    // Set log level to 'debug' for detailed logging
    setLogLevel('debug');

    // Initialize Storage
    this.storage = getStorage(app);
  }

  getFirestore() {
    return this.firestore;
  }

  getStorage() {
    return this.storage;
  }
}
