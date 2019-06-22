import Database from '../processing/Database';
import { Config, Playlist } from '../Types';

export default abstract class AbstractParser {
  protected database: Database;
  protected getParsers: () => AbstractParser[];
  protected config: Config;

  constructor(database: Database, getParsers: () => AbstractParser[], config: Config) {
    this.database = database;
    this.getParsers = getParsers;
    this.config = config;
  }

  /**
   * Returns true if the parser will accept the file based on file name
   *
   * @param fileName the name of the file to check whether to parse or not
   */
  public abstract canParseString(fileName: string): boolean;

  public abstract parse(identifier: string): Promise<Playlist>;

  public abstract exportPlaylist(playlist: Playlist, identifier: string): Promise<void>;
}
