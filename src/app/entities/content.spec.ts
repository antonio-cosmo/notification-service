import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Nova solicitação de amizade');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less than 5 characteres', () => {
    expect(() => new Content('aaaa')).toThrow();
  });

  it('should not be able to create a notification content with more than 249 characteres', () => {
    expect(() => new Content('b'.repeat(250))).toThrow();
  });
});
