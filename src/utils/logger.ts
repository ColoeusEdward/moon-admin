
class Logger {
  private static instance: Logger;
  private logStore: any = []
  private constructor() { }
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
  public log(item: any): void {
    this.logStore.push(item)
  }
  public getLog(): void {
    console.log(this.logStore)
  }
}
