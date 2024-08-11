import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PortfolioService } from '../services/portfolio.service';
import { PortfolioItem } from '../entities/portfolio-item.entity';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  async create(@Body() portfolioItem: PortfolioItem) {
    await this.portfolioService.createPortfolioItem(portfolioItem);
  }

  @Get()
  async findAll() {
    return this.portfolioService.getPortfolioItems();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.portfolioService.getPortfolioItemById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() portfolioItem: Partial<PortfolioItem>) {
    await this.portfolioService.updatePortfolioItem(id, portfolioItem);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.portfolioService.deletePortfolioItem(id);
  }
}
