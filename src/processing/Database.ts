import makeDir from 'make-dir';
import path from 'path';
import sqlite3 from 'sqlite3';
import { Config, Song } from '../Types';
import { getDatabasePathFromConfig } from './Util';

class Database {
  private static readonly dbVersion = 1;
  private db: sqlite3.Database;

  constructor(config: Config) {
    const dbPath = getDatabasePathFromConfig(config);
    makeDir.sync(path.dirname(dbPath));
    this.db = new sqlite3.Database(dbPath);
    this.db.exec('CREATE TABLE IF NOT EXISTS songs ( title TEXT NOT NULL, artist TEXT NOT NULL, fileLocation TEXT, spotifyID TEXT, youtubeID TEXT, album TEXT, UNIQUE ( title, artist ) ON CONFLICT ROLLBACK );');
    this.db.exec('CREATE TABLE IF NOT EXISTS albums ( artist TEXT NOT NULL, album TEXT NOT NULL, releaseYear INT NOT NULL, UNIQUE ( artist, album ) ON CONFLICT ROLLBACK );');
    this.db.exec('CREATE TABLE IF NOT EXISTS meta ( id TEXT PRIMARY KEY NOT NULL, value TEXT );');

    this.db.get("SELECT value FROM meta WHERE id = 'dbVersion'", (err: Error | null, row: any) => {
      if (err) {
        // tslint:disable-next-line: no-console
        console.log('An error occurred while fetching the database version:');
        throw err;
      }

      row = row || {};
      const version = Number.parseInt(row.id, 10);
      if (Number.isNaN(version)) {
        this.db.exec(`REPLACE INTO meta (id, value) VALUES ('dbVersion', '${Database.dbVersion}')`);
      }

      if (version < Database.dbVersion) {
        switch (version) {
          case 1:
            // Do something, and remember to fallthrough
        }

        this.db.exec(`REPLACE INTO meta (id, value) VALUES ('dbVersion', '${Database.dbVersion}')`);
      } else if (version > Database.dbVersion) {
        throw new Error('Database version is higher than playlist-extend\'s supported version');
      }
    });
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
