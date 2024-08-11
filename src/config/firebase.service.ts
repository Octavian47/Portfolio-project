import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, setLogLevel } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService {
  private readonly logger = new Logger(FirebaseService.name);
  private firestore: Firestore;
  private storage: FirebaseStorage;
  private app: FirebaseApp;

  constructor(private configService: ConfigService) {
    try {
      const firebaseConfig = {
        apiKey: this.configService.get<string>('FIREBASE_API_KEY'),
        authDomain: this.configService.get<string>('FIREBASE_AUTH_DOMAIN'),
        projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
        storageBucket: this.configService.get<string>('FIREBASE_STORAGE_BUCKET'),
        messagingSenderId: this.configService.get<string>('FIREBASE_MESSAGING_SENDER_ID'),
        appId: this.configService.get<string>('FIREBASE_APP_ID'),
      };

      // Log the Firebase config
      this.logger.debug('Initializing Firebase with the following config:', JSON.stringify(firebaseConfig));

      // Initialize Firebase
      this.app = initializeApp(firebaseConfig);

      // Initialize Firestore
      this.firestore = getFirestore(this.app);

      // Set log level to 'debug' for detailed logging
      setLogLevel('debug');

      // Initialize Storage
      this.storage = getStorage(this.app);

      this.logger.log('Firebase has been successfully initialized.');
    } catch (error) {
      this.logger.error('Failed to initialize Firebase', error.stack);
      throw new InternalServerErrorException('Firebase initialization failed. Please check the configuration.');
    }
  }

  getFirestore(): Firestore {
    if (!this.firestore) {
      this.logger.error('Firestore has not been initialized');
      throw new InternalServerErrorException('Firestore service is not available.');
    }
    return this.firestore;
  }

  getStorage(): FirebaseStorage {
    if (!this.storage) {
      this.logger.error('Storage has not been initialized');
      throw new InternalServerErrorException('Storage service is not available.');
    }
    return this.storage;
  }
}
