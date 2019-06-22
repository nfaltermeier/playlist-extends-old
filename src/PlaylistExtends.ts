import { AbstractParser, PLXParser } from './parsers';
import Database from './processing/Database';
import { Config } from './Types';

class PlaylistExtends {
  private database: Database;
  private parsers: AbstractParser[];

  constructor(config: Config = {}) {
    this.database = new Database(config);

    const getParsers = () => this.parsers;
    this.parsers = [ new PLXParser(this.database, getParsers, config) ];
    if (config.parsers) {
      const configParsers = config.parsers.map((parser) => new parser(this.database, getParsers, config));
      this.parsers.concat(configParsers);
    }
  }
}

export default PlaylistExtends;
