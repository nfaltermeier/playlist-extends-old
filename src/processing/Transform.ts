import { AbstractParser } from '../parsers';

const transformPlaylistFromIdentifiers =
    (parsers: AbstractParser[], inputIdentifier: string, outputIdentifier: string): Promise<void> => {
  const inputParser = parsers.find((parser) => parser.canParseString(inputIdentifier));
  const outputParser = parsers.find((parser) => parser.canParseString(outputIdentifier));

  if (inputParser === undefined) {
    throw new Error(`No parser could be found for ${inputIdentifier}`);
  }
  if (outputParser === undefined) {
    throw new Error(`No parser could be found for ${outputIdentifier}`);
  }

  return transformPlaylist(inputParser, inputIdentifier, outputParser, outputIdentifier);
};

const transformPlaylist =
    (inputParser: AbstractParser, inputIdentifier: string, outputParser: AbstractParser, outputIdentifier: string)
    : Promise<void> => {
  const playlistPromise = inputParser.parse(inputIdentifier);
  return playlistPromise.then((playlist) => outputParser.exportPlaylist(playlist, outputIdentifier));
};

export { transformPlaylist, transformPlaylistFromIdentifiers };
