import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from '../services/portfolio.service';
import { PortfolioItem } from '../entities/portfolio-item.entity';
import { NotFoundException } from '@nestjs/common';
import { Express } from 'express';

describe('PortfolioController', () => {
  let controller: PortfolioController;
  let service: PortfolioService;

  const mockId = 'HKby2il5iGfIoujRieBG';
  const mockPortfolioItem: PortfolioItem = {
    title: 'Test Artwork',
    description: 'A description',
    imageFilename: 'uploads/test-image.jpg', // Change this to match your updated entity
    clientLink: 'https://clientwebsite.com',
    status: 'visible',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioController],
      providers: [
        {
          provide: PortfolioService,
          useValue: {
            createPortfolioItem: jest.fn(),
            getPortfolioItems: jest.fn(),
            getPortfolioItemById: jest.fn(),
            updatePortfolioItem: jest.fn(),
            deletePortfolioItem: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PortfolioController>(PortfolioController);
    service = module.get<PortfolioService>(PortfolioService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a portfolio item', async () => {
      const mockFile: Express.Multer.File = {
        originalname: 'test-image.jpg',
        filename: 'test-image.jpg',
        mimetype: 'image/jpeg',
        buffer: Buffer.from(''),
        size: 1024,
        stream: undefined,
        destination: '',
        path: '',
        fieldname: '',
        encoding: '',
      };

      const result = await controller.create(mockPortfolioItem, mockFile);

      expect(service.createPortfolioItem).toHaveBeenCalledWith({
        ...mockPortfolioItem,
        imageFilename: `/uploads/${mockFile.filename}`,
      });
      expect(result).toEqual({
        status: 'success',
        message: 'Portfolio item created successfully',
        data: {
          ...mockPortfolioItem,
          imageFilename: `/uploads/${mockFile.filename}`,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of portfolio items', async () => {
      jest.spyOn(service, 'getPortfolioItems').mockResolvedValue([mockPortfolioItem]);

      const result = await controller.findAll();

      expect(service.getPortfolioItems).toHaveBeenCalled();
      expect(result).toEqual({
        status: 'success',
        message: 'Portfolio items retrieved successfully',
        data: [mockPortfolioItem],
      });
    });
  });

  describe('findOne', () => {
    it('should return a single portfolio item', async () => {
      jest.spyOn(service, 'getPortfolioItemById').mockResolvedValue(mockPortfolioItem);

      const result = await controller.findOne(mockId);

      expect(service.getPortfolioItemById).toHaveBeenCalledWith(mockId);
      expect(result).toEqual({
        status: 'success',
        message: `Portfolio item with ID ${mockId} retrieved successfully`,
        data: mockPortfolioItem,
      });
    });

    it('should throw a NotFoundException if item not found', async () => {
      jest.spyOn(service, 'getPortfolioItemById').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('nonExistentId')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a portfolio item', async () => {
      const partialUpdate = { title: 'Updated Title' };
      const result = await controller.update(mockId, partialUpdate);

      expect(service.updatePortfolioItem).toHaveBeenCalledWith(mockId, partialUpdate);
      expect(result).toEqual({
        status: 'success',
        message: `Portfolio item with ID ${mockId} updated successfully`,
        data: partialUpdate,
      });
    });
  });

  describe('remove', () => {
    it('should remove a portfolio item', async () => {
      const result = await controller.remove(mockId);

      expect(service.deletePortfolioItem).toHaveBeenCalledWith(mockId);
      expect(result).toBeUndefined(); // because the @Delete method returns no content
    });
  });
});
