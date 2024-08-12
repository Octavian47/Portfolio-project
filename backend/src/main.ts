import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // Create the Nest application instance
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Enable CORS with default settings
  app.enableCors();
  
  // Start the application on the specified port
  await app.listen(3000);
}

// Start the application
bootstrap();
