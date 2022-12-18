import { randomUUID } from 'crypto';
import { Replace } from '../../helpers/Replace';
import { Content } from './content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null | undefined;
  canceledAt?: Date | null | undefined;
  createdAt: Date;
}
export class Notification {
  private props: NotificationProps;
  private _id: string;
  public get id() {
    return this._id;
  }
  constructor(props: Replace<NotificationProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get category(): string {
    return this.props.category;
  }

  public set category(category: string) {
    this.props.category = category;
  }


  public read() {
    this.props.readAt = new Date();
  }

  public unread() {
    this.props.readAt = null;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public cancel(): void {
    this.props.canceledAt = new Date();
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
