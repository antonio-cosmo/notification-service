import { KafkaConsumerService } from '@infra/messaging/kafka/kafka-consumer.service';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const kafkaConsumerService = app.get(KafkaConsumerService);

  app.connectMicroservice<MicroserviceOptions>({
    strategy: kafkaConsumerService,
  });

  await app.startAllMicroservices();

  const configSwagger = new DocumentBuilder()
    .setTitle('Notifications Service')
    .setDescription('API Microsservice notifications')
    .setVersion('1.0')
    .build();

  const documentSwagger = SwaggerModule.createDocument(app, configSwagger);

  SwaggerModule.setup('api', app, documentSwagger);

  await app.listen(3000);
}
bootstrap();
