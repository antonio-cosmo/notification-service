export class Content {
  private readonly content;

  constructor(content: string) {
    const isContentValid = this.validateLengthValue(content);

    if (!isContentValid) {
      throw new Error();
    }

    this.content = content;
  }

  public get value(): string {
    return this.content;
  }

  private validateLengthValue(content: string): boolean {
    return content.length >= 5 && content.length <= 249;
  }
}
