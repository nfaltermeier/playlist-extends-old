import { Database as sqliteDatabase } from 'sqlite3';
import { Config, Song } from '../Types';
import { getDatabasePathFromConfig } from './Util';

class Database {
  private db: sqliteDatabase;

  constructor(config?: Config) {
    this.db = new sqliteDatabase(getDatabasePathFromConfig(config));
  }

  public addSongToDatabase(song: Song): Promise<void> {
    return new Promise((resolve, reject) => reject());
  }

  public editSongInDatabase(oldData: Song, newData: Song): Promise<void> {
    return new Promise((resolve, reject) => reject());
  }

  public removeSongFromDatabase(song: Song): Promise<void> {
    return new Promise((resolve, reject) => reject());
  }

  public getSongFromDatabase(identifier: string): Promise<Song> {
    return new Promise((resolve, reject) => reject());
  }
}

export default Database;
