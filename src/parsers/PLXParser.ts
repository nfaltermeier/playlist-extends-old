import fs from 'fs';
import path from 'path';
import util from 'util';
import Database from '../processing/Database';
import { Playlist } from '../Types';
import AbstractParser from './AbstractParser';

class PLXParser extends AbstractParser {
  private static readonly readFile = util.promisify(fs.readFile);
  private database: Database;
  private getParsers: () => AbstractParser[];

  constructor(database: Database, getParsers: () => AbstractParser[]) {
    super();

    this.database = database;
    this.getParsers = getParsers;
  }

  public canParseString(fileName: string): boolean {
    return /\.plx$/.test(fileName);
  }

  public async parse(identifier: string): Promise<Playlist> {
    const buffer = await PLXParser.readFile(identifier);
    const playlist: Playlist = { songs: [], title: path.basename(identifier, '.plx'), description: '' };

    const stringBuf = buffer.toString();
    const lines = stringBuf.split('\n');
    let isReadingDescription = false;
    for (const line of lines) {
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
            // slice out "@extends "
            const extendingIdentifier = line.slice(9);
            const extendingParser = this.getParsers().find((parser) => parser.canParseString(extendingIdentifier));

            if (extendingParser === undefined) {
              throw new Error(`No parser found for extended playlist ${extendingIdentifier}`);
            }

            playlist.songs = playlist.songs.concat((await extendingParser.parse(extendingIdentifier)).songs);
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
    }

    playlist.description = playlist.description.trim();
    return playlist;
  }

  public exportPlaylist(playlist: Playlist, identifier: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default PLXParser;
