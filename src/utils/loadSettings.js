import { ReadFileError } from "./Errors";
import parse from "./parser";
const fs = require("uxp").storage.localFileSystem;

export default async (fileName = "custom_settings.txt", isAbsolutePath = false) => {
  const pluginFolder = await fs.getPluginFolder();
  const errors = [];
  let content = {
    filename: "",
    data: "",
  };

  const loadSettings = async (filename, isAbsolutePath = false) => {
    console.log("update", filename, isAbsolutePath);
    try {
      // TODO научиться читать файл по абсолютному пути
      const file = await pluginFolder.getEntry(filename);
      // isAbsolutePath
      //   ? await fs.getEntry(filename)
      //   :
      return file;
    } catch (e) {
      throw new ReadFileError("can't open file", filename);
    }
  };

  try {
    const file = await loadSettings(fileName, isAbsolutePath);
    content = {
      filename: "custom_settings.txt",
      data: await file.read(),
    };
  } catch (e) {
    console.log(e, "err", "go default");
    errors.push(e);
    const file = await loadSettings("default_settings.txt");
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
