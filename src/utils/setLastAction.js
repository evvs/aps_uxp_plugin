const uxp = require("uxp");
const fs = uxp.storage.localFileSystem;

export default async (id) => {
  const pluginFolder = await fs.getPluginFolder();
  const settingsFile = await pluginFolder.getEntry("user_settings.json");
  const token = await fs.createPersistentToken(settingsFile);

  const entry = await fs.getEntryForPersistentToken(token);
  const data = JSON.parse(await entry.read());

  await entry.write(
    JSON.stringify({
      ...data,
      ui: {
        ...data.ui,
        lastActionBtnId: id,
      },
    })
  );
};
