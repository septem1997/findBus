import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { TransformInterceptor } from './config/transform.filter';
import { AllExceptionsFilter } from './config/any-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors();
  await app.listen(3060);
}
bootstrap();
