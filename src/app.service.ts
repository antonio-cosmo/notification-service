import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.notification.findMany();
  }

  async create({recipientId, content, category}: CreateNotificationDto){
    await this.prismaService.notification.create({data:{
      id: randomUUID(),
      content,
      category,
      recipientId
    }})
  }
}
