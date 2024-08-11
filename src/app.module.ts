import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PortfolioModule } from './modules/portfolio/portfolio.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // Global setup for ConfigModule
    PortfolioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
