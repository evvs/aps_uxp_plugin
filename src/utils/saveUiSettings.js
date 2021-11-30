const uxp = require("uxp");
const fs = uxp.storage.localFileSystem;

export default async (uistate, property, value) => {
  if (property === "importantBtnsIds") {
    const idsArr = uistate.importantBtnsIds;
    value = idsArr.includes(value) ? idsArr.filter((id) => id !== value) : [...idsArr, value];
  }

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
