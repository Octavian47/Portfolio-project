import { Module } from '@nestjs/common';
import { PortfolioController } from './controllers/portfolio.controller';
import { PortfolioService } from './services/portfolio.service';
import { FirebaseService } from '../../config/firebase.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule], // Import ConfigModule tu use firebase 
  controllers: [PortfolioController],  // Register the controller
  providers: [PortfolioService, FirebaseService], // Register providers
})
export class PortfolioModule {}
