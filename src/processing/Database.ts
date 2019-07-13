import makeDir from 'make-dir';
import path from 'path';
import sqlite3 from 'sqlite3';
import { Config, Song, SongSources } from '../Types';
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
    return new Promise((resolve, reject) => {
      this.db.exec(`INSERT INTO songs (title, artist, fileLocation, spotifyID, youtubeID, album) \
VALUES (${song.title}, ${song.artist}, ${song.sources.filePath}, ${song.sources.spotify}, ${song.sources.youtube}, ${song.album});`
        , (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
    });
  }

  public editSongInDatabase(oldData: Song, newData: Song): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.exec(`UPDATE songs WHERE title='${oldData.title}' AND artist='${oldData.artist}' \
SET title='${newData.title}', artist='${newData.artist}', fileLocation='${newData.sources.filePath}', \
spotifyID='${newData.sources.spotify}', youtubeID='${newData.sources.youtube}', album='${newData.album}';`
        , (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
    });
  }

  public removeSongFromDatabase(song: Song): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.exec(`DELETE FROM songs WHERE title='${song.title}' AND artist='${song.artist}';`
        , (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
    });
  }

  public getSongFromDatabase(identifier: string): Promise<Song> {
    return new Promise((resolve, reject) => {
      let last = identifier.indexOf('-');
      while (last !== -1) {
        if (last === 0 || identifier[last - 1] !== '\\') {
          const songName = identifier.substring(0, last).replace('\\-', '-').trim();
          const artistName = identifier.substring(last + 1).replace('\\-', '-').trim();

          this.db.get(`SELECT * FROM songs WHERE title='${songName}' AND artist='${artistName}'`, (err, row) => {
            if (err) {
              reject(`A song could not be found in the database with the title '${songName}' by '${artistName}'.` +
              '\nPlease ensure the title and artist name are separated by a \'-\', optionally with spaces around the \'-\'.' +
              '\nAny other \'-\'s should be prefaced by a \'\\\', for example \'\\-\'.');
              return;
            }

            const sources: SongSources = { youtube: row.youtubeID, spotify: row.spotifyID, filePath: row.fileLocation };
            resolve({ ...row, title: songName, artist: artistName, sources });
          });
          return;
        }
        last = identifier.indexOf('-');
      }

      // no unescaped - was found
      reject('No unescaped \'-\' was found in the song identifier.' +
      '\nPlease separate the song\'s title from the artist\'s name with \'-\', optionally surrounded by spaces.' +
      '\nIf \'-\' occurs in either the song\'s title or artist\'s name preface the \'-\' with a \'\\\', for example \'\\-\'.');
    });
  }
}

export default Database;
