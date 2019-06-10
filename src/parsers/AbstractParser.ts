import { Playlist } from '../Types';

export default abstract class Parser {
  /**
   * Returns true if the parser will accept the file based on file name
   *
   * @param fileName the name of the file to check whether to parse or not
   */
  public abstract canParseString(fileName: string): boolean;

  public abstract parse(identifier: string): Promise<Playlist>;

  public abstract exportPlaylist(playlist: Playlist, identifier: string): Promise<void>;
}
