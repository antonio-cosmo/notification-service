import { Injectable } from "@nestjs/common";
import { Notification } from "../entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";

interface ListNotificationResponse {
  notifications: Notification[];
}
@Injectable()
export class ListNotifications {
  constructor(private notificationsRepository: NotificationsRepository) { };

  async execute(): Promise<ListNotificationResponse> {
    const notifications = await this.notificationsRepository.findAll();
    return {
      notifications
    }
  }
}