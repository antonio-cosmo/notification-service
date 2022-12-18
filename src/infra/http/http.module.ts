import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { SendNotification } from '../../app/use-cases/send-notification';
import { ListNotifications } from '../../app/use-cases/list-notifications';
import { CancelNotification } from '@app/use-cases/cancel-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification, ListNotifications, CancelNotification],
})
export class HttpModule { }
