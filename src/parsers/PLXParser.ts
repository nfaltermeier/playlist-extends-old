import Database from '../processing/Database';
import { Playlist } from '../Types';
import AbstractParser from './AbstractParser';

class PLXParser extends AbstractParser {
  private database: Database;

  constructor(database: Database) {
    super();

    this.database = database;
  }

  public canParseString(fileName: string): boolean {
    return /\.plx$/.test(fileName);
  }

  public parse(identifier: string): Promise<Playlist> {
    throw new Error('Method not implemented.');
  }

  public exportPlaylist(playlist: Playlist, identifier: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default PLXParser;
