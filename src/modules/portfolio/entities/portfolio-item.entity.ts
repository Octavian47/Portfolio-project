import { IsString, IsUrl, IsOptional } from 'class-validator';

export class PortfolioItem {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUrl()
  imageUrl: string;

  @IsUrl()
  @IsOptional()
  clientLink?: string;

  @IsString()
  @IsOptional()
  status?: 'visible' | 'hidden';
}
