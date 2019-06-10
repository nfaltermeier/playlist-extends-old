import { Config } from '../Types';

import path = require('path');

const getUserDataFolder = () => {
  return process.env.APPDATA ||
    (process.platform === 'darwin' ? process.env.HOME + '/Library/Preferences' : '/var/lib');
};

const getDatabasePathFromConfig = (config?: Config) => {
 return (config && config.databasePath) || path.join(getUserDataFolder(), 'Playlist-Extends', 'database.sqlite');
};

export { getDatabasePathFromConfig };
