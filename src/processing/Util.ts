import { join } from 'path';
import { Config } from '../Types';

const getUserDataFolder = () => {
  if (process.env.APPDATA) {
    return { path: process.env.APPDATA, linuxStyle: false };
  }

  if (process.platform === 'darwin') {
    return { path: `${process.env.HOME}/Library/Preferences`, linuxStyle: false };
  }

  return { path: '~', linuxStyle: true };
};

const getDatabasePathFromConfig = (config?: Config) => {
  if (config && config.databasePath) {
    return config.databasePath;
  }

  const { path, linuxStyle } = getUserDataFolder();
  return join(path, `${linuxStyle ? '.' : ''}playlist-extends`, 'database.sqlite');
};

export { getDatabasePathFromConfig };
