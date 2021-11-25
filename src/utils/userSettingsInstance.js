const fs = require("uxp").storage.localFileSystem;

export const userSettingsFileName = "user_settings.json";

export const getUserSettingsFileToken = async () => {
  const pluginFolder = await fs.getPluginFolder();
  const settingsFile = await pluginFolder.getEntry(userSettingsFileName);
  const token = await fs.createPersistentToken(settingsFile);

  return token;
};
