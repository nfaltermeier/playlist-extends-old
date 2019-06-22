import AbstractParser from './parsers/AbstractParser';

export interface Song {
  title: string;
  artist: string;
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
  parsers?: AbstractParser[];
}
