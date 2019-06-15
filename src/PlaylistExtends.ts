import { AbstractParser, PLXParser } from './parsers';
import Database from './processing/Database';
import { Config } from './Types';

class PlaylistExtends {
  private database: Database;
  private parsers: AbstractParser[];

  constructor(config?: Config) {
    this.database = new Database(config);

    const getParsers = () => this.parsers;
    this.parsers = [ new PLXParser(this.database, getParsers) ];
    if (config && config.parsers) {
      this.parsers.concat(config.parsers);
    }
  }
}

export default PlaylistExtends;
