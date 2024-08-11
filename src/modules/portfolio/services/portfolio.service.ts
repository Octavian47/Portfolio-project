import { Injectable, Logger, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { FirebaseService } from '../../../config/firebase.service';
import { PortfolioItem } from '../entities/portfolio-item.entity';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, query, where } from 'firebase/firestore';

@Injectable()
export class PortfolioService {
    private readonly collectionName = 'portfolio-items';
    private readonly logger = new Logger(PortfolioService.name);

    constructor(private readonly firebaseService: FirebaseService) {}

    /**
     * Creates a new portfolio item, avoiding duplicates by checking for an existing item with the same title.
     * @param item - The portfolio item to create.
     * @throws ConflictException if an item with the same title already exists.
     * @throws InternalServerErrorException for other errors during creation.
     */
    async createPortfolioItem(item: PortfolioItem): Promise<void> {
        const firestore = this.firebaseService.getFirestore();
        const collectionRef = collection(firestore, this.collectionName);

        try {
        // Check for duplicates by querying the collection for items with the same title
        const duplicateQuery = query(collectionRef, where('title', '==', item.title));
        const duplicateSnapshot = await getDocs(duplicateQuery);

        if (!duplicateSnapshot.empty) {
            this.logger.warn(`A portfolio item with the title "${item.title}" already exists.`);
            throw new ConflictException(`A portfolio item with the title "${item.title}" already exists.`);
        }

        // If no duplicates found, proceed to add the new item
        const docRef = await addDoc(collectionRef, item);
        this.logger.log(`Portfolio item created successfully with ID: ${docRef.id}`);
        } catch (error) {
        this.logger.error('Failed to create portfolio item', error.stack);
        if (error instanceof ConflictException) {
            throw error; // Re-throw conflict exception
        } else {
            throw new InternalServerErrorException('Failed to create portfolio item');
        }
        }
    }

    /**
     * Retrieves all portfolio items, including their document IDs.
     * @returns A list of portfolio items with their IDs.
     * @throws InternalServerErrorException if the retrieval fails.
     */
    async getPortfolioItems(): Promise<PortfolioItem[]> {
        try {
        const firestore = this.firebaseService.getFirestore();
        const collectionRef = collection(firestore, this.collectionName);
        const snapshot = await getDocs(collectionRef);

        // Map each document to a PortfolioItem, including the document ID
        const items = snapshot.docs.map(doc => {
            const data = doc.data() as PortfolioItem;
            return { id: doc.id, ...data };
        });

        this.logger.log('Fetched all portfolio items successfully');
        return items;
        } catch (error) {
        this.logger.error('Failed to fetch portfolio items', error.stack);
        throw new InternalServerErrorException('Failed to fetch portfolio items');
        }
    }

    /**
     * Updates an existing portfolio item by its ID.
     * @param id - The ID of the portfolio item to update.
     * @param item - The updated portfolio item data.
     * @throws InternalServerErrorException if the update fails.
     */
    async updatePortfolioItem(id: string, item: Partial<PortfolioItem>): Promise<void> {
        try {
        const firestore = this.firebaseService.getFirestore();
        const docRef = doc(firestore, this.collectionName, id);
        await updateDoc(docRef, item);
        this.logger.log(`Portfolio item updated successfully: ${id}`);
        } catch (error) {
        this.logger.error(`Failed to update portfolio item with ID: ${id}`, error.stack);
        throw new InternalServerErrorException(`Failed to update portfolio item with ID: ${id}`);
        }
    }

    /**
     * Deletes a portfolio item by its ID.
     * @param id - The ID of the portfolio item to delete.
     * @throws InternalServerErrorException if the deletion fails.
     */
    async deletePortfolioItem(id: string): Promise<void> {
        try {
        const firestore = this.firebaseService.getFirestore();
        const docRef = doc(firestore, this.collectionName, id);
        await deleteDoc(docRef);
        this.logger.log(`Portfolio item deleted successfully: ${id}`);
        } catch (error) {
        this.logger.error(`Failed to delete portfolio item with ID: ${id}`, error.stack);
        throw new InternalServerErrorException(`Failed to delete portfolio item with ID: ${id}`);
        }
    }

    /**
     * Retrieves a single portfolio item by its ID.
     * @param id - The ID of the portfolio item to retrieve.
     * @returns The portfolio item if found, or throws a NotFoundException.
     * @throws InternalServerErrorException if the retrieval fails.
     */
    async getPortfolioItemById(id: string): Promise<PortfolioItem | null> {
        try {
            const firestore = this.firebaseService.getFirestore();
            const docRef = doc(firestore, this.collectionName, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data() as PortfolioItem;
                this.logger.log(`Portfolio item fetched successfully: ${id}`);
                // Use type assertion to indicate that the object includes the id
                return { id, ...data } as PortfolioItem;
            } else {
                this.logger.warn(`Portfolio item not found: ${id}`);
                throw new NotFoundException(`Portfolio item not found: ${id}`);
            }
        } catch (error) {
            this.logger.error(`Failed to fetch portfolio item with ID: ${id}`, error.stack);
            throw new InternalServerErrorException(`Failed to fetch portfolio item with ID: ${id}`);
        }
    }
}
