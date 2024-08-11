import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../../config/firebase.service';
import { PortfolioItem } from '../entities/portfolio-item.entity';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

@Injectable()
export class PortfolioService {
  private collectionName = 'portfolio-items';

  constructor(private firebaseService: FirebaseService) {}

  async createPortfolioItem(item: PortfolioItem): Promise<void> {
    const firestore = this.firebaseService.getFirestore();
    const collectionRef = collection(firestore, this.collectionName);
    await addDoc(collectionRef, item);
  }

  async getPortfolioItems(): Promise<PortfolioItem[]> {
    const firestore = this.firebaseService.getFirestore();
    const collectionRef = collection(firestore, this.collectionName);
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map(doc => doc.data() as PortfolioItem);
  }

  async updatePortfolioItem(id: string, item: Partial<PortfolioItem>): Promise<void> {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, this.collectionName, id);
    await updateDoc(docRef, item);
  }

  async deletePortfolioItem(id: string): Promise<void> {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, this.collectionName, id);
    await deleteDoc(docRef);
  }

  async getPortfolioItemById(id: string): Promise<PortfolioItem | null> {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, this.collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as PortfolioItem;
    }
    return null;
  }
}
