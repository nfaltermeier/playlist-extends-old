import AbstractParser from './parsers/AbstractParser';

export class Song {
  title: string;
  artist: string;
  sources: SongSources;
}

export class SongSources {
  youtube?: string;
  spotify?: string;
  filePath?: string;
}

export class Playlist {
  title: string;
  songs: Song[];
}

export class Config {
  databasePath?: string;
  parsers?: AbstractParser[];
}
