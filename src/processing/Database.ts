import sqlite3 from 'sqlite3';
import { Config, Song } from '../Types';
import { getDatabasePathFromConfig } from './Util';

class Database {
  private db: sqlite3.Database;

  constructor(config: Config) {
    this.db = new sqlite3.Database(getDatabasePathFromConfig(config));
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

  public checkIfSongInDatabase(identifier: string): Promise<boolean> {
    return new Promise((resolve, reject) => reject());
  }
}

export default Database;
