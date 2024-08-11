import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioService } from './portfolio.service';
import { FirebaseService } from '../../../config/firebase.service';
import { PortfolioItem } from '../entities/portfolio-item.entity';
import { ConflictException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, query, where } from 'firebase/firestore';

// Mock all Firestore functions:
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(() => ({ id: 'mockCollectionId' })),
  addDoc: jest.fn(),
  getDocs: jest.fn(),
  doc: jest.fn(() => ({ id: 'mockDocId' })),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  getDoc: jest.fn(),
  query: jest.fn(() => ({ id: 'mockQueryId' })),
  where: jest.fn(),
}));

describe('PortfolioService', () => {
  let service: PortfolioService;
  let firebaseService: FirebaseService;
  const mockId = 'HKby2il5iGfIoujRieBG'; // Firestore-like ID
  const firestoreMock = {}; // Mock Firestore instance

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortfolioService,
        {
          provide: FirebaseService,
          useValue: {
            getFirestore: jest.fn().mockReturnValue(firestoreMock),
          },
        },
      ],
    }).compile();

    service = module.get<PortfolioService>(PortfolioService);
    firebaseService = module.get<FirebaseService>(FirebaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPortfolioItem', () => {
    it('should create a portfolio item', async () => {
      const mockItem: PortfolioItem = {
        title: 'Test Artwork',
        description: 'A description',
        imageUrl: 'https://example.com/image.jpg',
        clientLink: 'https://clientwebsite.com',
        status: 'visible',
      };

      const mockQuerySnapshot = {
        empty: true, // Simulate no duplicates found
      };

      (getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);
      (addDoc as jest.Mock).mockResolvedValue({ id: mockId });

      await service.createPortfolioItem(mockItem);

      expect(getDocs).toHaveBeenCalledWith(expect.any(Object));
      expect(addDoc).toHaveBeenCalledWith(expect.any(Object), mockItem);
    });

    it('should throw a ConflictException if item with the same title exists', async () => {
      const mockItem: PortfolioItem = {
        title: 'Test Artwork',
        description: 'A description',
        imageUrl: 'https://example.com/image.jpg',
        clientLink: 'https://clientwebsite.com',
        status: 'visible',
      };

      const mockQuerySnapshot = {
        empty: false, // Simulate duplicate found
      };

      (getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);

      await expect(service.createPortfolioItem(mockItem)).rejects.toThrow(ConflictException);
    });
  });

  describe('getPortfolioItemById', () => {
    it('should return a portfolio item if found', async () => {
      const mockItem: PortfolioItem = {
        title: 'Test Artwork',
        description: 'A description',
        imageUrl: 'https://example.com/image.jpg',
        clientLink: 'https://clientwebsite.com',
        status: 'visible',
      };

      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true,
        id: mockId,
        data: () => mockItem,
      });

      const result = await service.getPortfolioItemById(mockId);

      expect(result).toEqual({ id: mockId, ...mockItem });
      expect(getDoc).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should throw a NotFoundException if item not found', async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => false, // Simulate document not found
      });

      await expect(service.getPortfolioItemById('nonExistentId')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getPortfolioItems', () => {
    it('should return an array of portfolio items', async () => {
      const mockItems = [
        {
          id: mockId,
          title: 'Test Artwork 1',
          description: 'A description 1',
          imageUrl: 'https://example.com/image1.jpg',
          clientLink: 'https://clientwebsite.com',
          status: 'visible',
        },
        {
          id: 'AnotherFirestoreID', // Another example Firestore ID
          title: 'Test Artwork 2',
          description: 'A description 2',
          imageUrl: 'https://example.com/image2.jpg',
          clientLink: 'https://clientwebsite.com',
          status: 'hidden',
        },
      ];

      const mockDocs = mockItems.map(item => ({
        id: item.id,
        data: () => item,
      }));

      (getDocs as jest.Mock).mockResolvedValue({ docs: mockDocs });

      const result = await service.getPortfolioItems();

      expect(result).toEqual(mockItems);
      expect(getDocs).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe('updatePortfolioItem', () => {
    it('should update a portfolio item', async () => {
      const mockItem: Partial<PortfolioItem> = {
        title: 'Updated Title',
      };

      (updateDoc as jest.Mock).mockResolvedValueOnce(undefined);

      await service.updatePortfolioItem(mockId, mockItem);

      expect(updateDoc).toHaveBeenCalledWith(expect.any(Object), mockItem);
    });
  });

  describe('deletePortfolioItem', () => {
    it('should delete a portfolio item if it exists', async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true, // Simulate the document exists
      });

      (deleteDoc as jest.Mock).mockResolvedValueOnce(undefined);

      await service.deletePortfolioItem(mockId);

      expect(getDoc).toHaveBeenCalledWith(expect.any(Object));
      expect(deleteDoc).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should throw a NotFoundException if the portfolio item does not exist', async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => false, // Simulate the document does not exist
      });

      await expect(service.deletePortfolioItem('nonExistentId')).rejects.toThrow(NotFoundException);
    });

    it('should throw an InternalServerErrorException if deletion fails', async () => {
      (getDoc as jest.Mock).mockResolvedValue({
        exists: () => true, // Simulate the document exists
      });

      (deleteDoc as jest.Mock).mockRejectedValue(new Error('Deletion failed'));

      await expect(service.deletePortfolioItem(mockId)).rejects.toThrow(InternalServerErrorException);
    });
  });
});
