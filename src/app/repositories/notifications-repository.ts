import { Notification } from "../entities/notification";

export abstract class NotificationsRepository {
  public abstract create: (notification: Notification) => Promise<void>;
  public abstract findById: (notificationId: string) => Promise<Notification | null>;
  public abstract save: (notification: Notification) => Promise<void>;
  abstract countManyByRecipientId(recipientId: string): Promise<number>;
  abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>;
  public abstract findAll: () => Promise<Notification[]>;

}
