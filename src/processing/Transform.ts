import { AbstractParser } from '../parsers';
import { Playlist } from '../Types';

const transformPlaylistFromIdentifiers =
    (parsers: AbstractParser[], inputIdentifier: string, outputIdentifier: string): Promise<void> => {
  const inputParser = parsers.find((parser) => parser.canParseString(inputIdentifier));
};

const transformPlaylist =
    (inputParser: AbstractParser, inputIdentifier: string, outputParser: AbstractParser, outputIdentifier: string)
    : Promise<void> => {
  const playlist = inputParser.parse(inputIdentifier);
};
