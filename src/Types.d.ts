export interface IParser {
  /**
   * Returns true if the parser will accept the file based on file name
   *
   * @param fileName the name of the file to check whether to parse or not
   */
  canParseString(fileName: string): boolean;

  parseFile(fileContents: string, fileName: string): null;

  createFile(): string;
}

export class Song {
  title: string;
  artist: string;
  filePath: string;
  spotifyID: string;
}

export class Playlist {
  title: string;
  songs: Song[];
}

export class Config {
  parsers: IParser[];
}
