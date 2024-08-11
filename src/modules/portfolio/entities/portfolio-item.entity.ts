import { IsString, IsOptional } from 'class-validator';

export class PortfolioItem {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  imageFilename: string; 

  @IsString()
  @IsOptional()
  clientLink?: string;

  @IsString()
  @IsOptional()
  status?: 'visible' | 'hidden';
}
