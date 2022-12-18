import { CancelNotification } from './../../../app/use-cases/cancel-notification';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ListNotifications } from '../../../app/use-cases/list-notifications';
import { SendNotification } from '../../../app/use-cases/send-notification';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotification: SendNotification,
    private readonly listNotifications: ListNotifications,
    private readonly cancelNotification: CancelNotification
  ) { }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id })
  }

  @Get()
  async findAll() {
    const { notifications } = await this.listNotifications.execute();

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP)
    }
  }
  @Post()
  async create(@Body() body: CreateNotificationDto) {
    const { recipientId, content, category } = body;
    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification)
    };
  }
}
