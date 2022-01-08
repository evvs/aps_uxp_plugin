const uxp = require("uxp");
const fs = uxp.storage.localFileSystem;

export default async () => {
  const pluginFolder = await fs.getPluginFolder();
  const settingsFile = await pluginFolder.getEntry("user_settings.json");
  const token = await fs.createPersistentToken(settingsFile);
  // setSettingsFileToken(token);

  const entry = await fs.getEntryForPersistentToken(token);
  const data = JSON.parse(await entry.read());

  await entry.write(
    JSON.stringify({
      ...data,
      modes: {
        ...data.modes,
        expanded: false,
        doubleClick: false,
        importantMark: false,
      },
    })
  );
};
