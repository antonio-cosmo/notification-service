import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notifictionsRepository: NotificationsRepository) { }
  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { category, content, recipientId } = request;
    const notification = new Notification({
      content: new Content(content),
      category,
      recipientId,
    });

    await this.notifictionsRepository.create(notification);

    return {
      notification,
    };
  }
}
