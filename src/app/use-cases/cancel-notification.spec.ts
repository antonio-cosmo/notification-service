import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-repository';
import { CancelNotification } from './cancel-notification';

describe('Cancel Notification', () => {
  it('should be able to cancel notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      category: 'social',
      content: new Content('Nova solicitação'),
      recipientId: 'example-id'
    })

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
  });
});
