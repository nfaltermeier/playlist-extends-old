import AbstractParser from './parsers/AbstractParser';
import Database from './processing/Database';

export interface Song {
  title: string;
  artist: string;
  album?: string;
  sources: SongSources;
}

export interface SongSources {
  youtube?: string;
  spotify?: string;
  filePath?: string;
}

export interface Playlist {
  // can be empty but must be defined
  description: string;
  title: string;
  songs: Song[];
}

export interface Config {
  databasePath?: string;
  autoImportUnknownSongs?: boolean;
  // Takes the class of the parser so it can be constructed with  the database, other parsers, and config
  parsers?: Array<new (database: Database, getParsers: () => AbstractParser[], config: Config) => AbstractParser>;
}
