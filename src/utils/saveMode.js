const uxp = require("uxp");
const fs = uxp.storage.localFileSystem;

// export default async (uistate, property, value) => {
//   if (property === "importantBtnsIds") {
//     const idsArr = uistate.importantBtnsIds;
//     value = idsArr.includes(value) ? idsArr.filter((id) => id !== value) : [...idsArr, value];
//   }

//   const temporaryFolder = await fs.getTemporaryFolder();
//   const file = await temporaryFolder.createFile("ui_settings.json", {
//     overwrite: true,
//   });
//   await file.write(
//     JSON.stringify({
//       ...uistate,
//       [property]: value,
//     })
//   );
// };
export default async (modesState, property, value) => {
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
        ...modesState,
        [property]: value,
      },
    })
  );
};
