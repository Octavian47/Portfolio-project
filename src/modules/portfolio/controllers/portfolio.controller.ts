import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PortfolioService } from '../services/portfolio.service';
import { PortfolioItem } from '../entities/portfolio-item.entity';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() portfolioItem: PortfolioItem) {
    await this.portfolioService.createPortfolioItem(portfolioItem);
    return {
      status: 'success',
      message: 'Portfolio item created successfully',
      data: portfolioItem,
    };
  }

  @Get()
  async findAll() {
    const items = await this.portfolioService.getPortfolioItems();
    return {
      status: 'success',
      message: 'Portfolio items retrieved successfully',
      data: items,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const item = await this.portfolioService.getPortfolioItemById(id);
    return {
      status: 'success',
      message: `Portfolio item with ID ${id} retrieved successfully`,
      data: item,
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() portfolioItem: Partial<PortfolioItem>) {
    await this.portfolioService.updatePortfolioItem(id, portfolioItem);
    return {
      status: 'success',
      message: `Portfolio item with ID ${id} updated successfully`,
      data: portfolioItem,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.portfolioService.deletePortfolioItem(id);
  }
}
