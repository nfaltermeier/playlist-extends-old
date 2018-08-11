import { Song } from '../Types';

class Database {
  private initialized: boolean;

  constructor() {
    this.initialized = false;
  }

  public initialize(path: string): boolean {
    return false;
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  public addToDatabase(song: Song): boolean {
    return false;
  }

  public editInDatabase(oldData: Song, newData: Song): boolean {
    return false;
  }

  public removeFromDatabase(song: Song): boolean {
    return false;
  }
}

export default Database;
