const uxp = require("uxp");
const fs = uxp.storage.localFileSystem;

export default async (uistate, property, value) => {
  const temporaryFolder = await fs.getTemporaryFolder();
  const file = await temporaryFolder.createFile("ui_settings.json", {
    overwrite: true,
  });
  await file.write(
    JSON.stringify({
      ...uistate,
      [property]: value,
    })
  );
};
