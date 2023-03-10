import { Injectable } from '@nestjs/common';
import { Notification } from '../../../../app/entities/notification';
import { NotificationsRepository } from '../../../../app/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notifiation-mappers';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) { }


  public async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)
    await this.prisma.notification.create({
      data: raw
    });
  }

  public async save(notification: Notification) {
    const raw = PrismaNotificationMapper.toPrisma(notification)
    await this.prisma.notification.update({
      where: {
        id: raw.id
      },
      data: raw
    });
  }

  public async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId
      }
    })

    if (!notification) return null;

    return PrismaNotificationMapper.toDomain(notification)
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId,
      },
    });

    return count;
  }


  public async findAll(): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany();

    return notifications.map(PrismaNotificationMapper.toDomain);
  }
}
