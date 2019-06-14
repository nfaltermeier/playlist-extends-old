import fs from 'fs';
import path from 'path';
import util from 'util';
import Database from '../processing/Database';
import { Playlist } from '../Types';
import AbstractParser from './AbstractParser';

class PLXParser extends AbstractParser {
  private static readonly readFile = util.promisify(fs.readFile);
  private database: Database;

  constructor(database: Database) {
    super();

    this.database = database;
  }

  public canParseString(fileName: string): boolean {
    return /\.plx$/.test(fileName);
  }

  public parse(identifier: string): Promise<Playlist> {
    return PLXParser.readFile(identifier).then((buffer) => {
      const playlist: Playlist = { songs: [], title: path.basename(identifier, '.plx'), description: '' };

      const stringBuf = buffer.toString();
      const lines = stringBuf.split('\n');
      let isReadingDescription = false;
      lines.forEach((line) => {
        const firstWord = line.split(' ', 1)[0];

        if (isReadingDescription) {
          if (firstWord === '@description-end') {
            isReadingDescription = false;
          } else {
            playlist.description = playlist.description.concat(line);
          }
          // not reading description
        } else {
          switch (firstWord) {
            case '@extends':
              break;

            case '@name':
              // slice out "@name "
              playlist.title = line.slice(6);
              break;

            case '@description':
              isReadingDescription = true;
              // slice out "@description "
              playlist.description = playlist.description.concat(line.slice(13));
              break;

            default:
              break;
          }
        }
      });

      playlist.description = playlist.description.trim();
      return new Promise((resolve, reject) => { resolve(playlist); });
    });
  }

  public exportPlaylist(playlist: Playlist, identifier: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default PLXParser;
