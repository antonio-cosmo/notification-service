import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-repository';
import { ListNotifications } from './list-notifications';

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const listNotification = new ListNotifications(notificationsRepository);
    const { notifications } = await listNotification.execute();


    expect(notificationsRepository.notifications.length).toEqual(notifications.length);
  });
});
