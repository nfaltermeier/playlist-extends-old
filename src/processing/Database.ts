import makeDir from 'make-dir';
import path from 'path';
import sqlite3 from 'sqlite3';
import { Config, Song } from '../Types';
import { getDatabasePathFromConfig } from './Util';

class Database {
  private db: sqlite3.Database;

  constructor(config?: Config) {
    const dbPath = getDatabasePathFromConfig(config);
    makeDir.sync(path.dirname(dbPath));
    this.db = new sqlite3.Database(dbPath);
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
