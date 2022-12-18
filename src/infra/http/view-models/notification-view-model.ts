import { Notification } from "@app/entities/notification";

export class NotificationViewModel {
  public static toHTTP(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      canceledAt: notification.canceledAt
    }
  }
}