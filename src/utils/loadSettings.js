import { ReadFileError } from "./Errors";
import parse from "./parser";
import { getUserSettingsFileToken } from "./userSettingsInstance";
const fs = require("uxp").storage.localFileSystem;

const getFile = async (filename) => {
  try {
    const pluginFolder = await fs.getPluginFolder();

    const file = await pluginFolder.getEntry(filename);
    return file;
  } catch (e) {
    throw new ReadFileError("can't open file", filename);
  }
};

export default async (fileName) => {
  const pluginFolder = await fs.getPluginFolder();
  const errors = [];
  let content = {
    filename: "",
    data: "",
  };

  const settingsFileToken = await getUserSettingsFileToken();
  const settingsFileEntry = await fs.getEntryForPersistentToken(settingsFileToken);
  const settingsFileData = await settingsFileEntry.read();
  const userSettingsObj = JSON.parse(settingsFileData);

  fileName = fileName || userSettingsObj.file || userSettingsObj.defaultFile;

  try {
    const file = await getFile(fileName);
    content = {
      filename: fileName,
      data: await file.read(),
    };
  } catch (e) {
    console.log(e, "err", "go default");
    errors.push(e);
    const file = await getFile("default_settings.txt");
    content = {
      filename: "default_settings.txt",
      data: await file.read(),
    };
  }

  try {
    const result = parse(content.data);
    return [result, errors];
  } catch (e) {
    const result = "";
    errors.push(e);
    return [result, errors];
  }
};
