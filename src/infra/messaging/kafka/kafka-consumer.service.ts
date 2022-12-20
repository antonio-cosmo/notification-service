import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy {
  constructor(private configService: ConfigService) {
    super({
      client: {
        clientId: 'notifications',
        brokers: [configService.get<string>('UPSTASH_KAFKA_REST_URL')!],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            configService.get<string>('UPSTASH_KAFKA_REST_USERNAME')!,
          password:
            configService.get<string>('UPSTASH_KAFKA_REST_PASSWORD')!,
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
