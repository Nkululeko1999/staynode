import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module.js';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  await app.listen(process.env.port ?? 3000);
}
await bootstrap();
