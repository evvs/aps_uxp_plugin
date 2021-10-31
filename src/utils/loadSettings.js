import { ReadFileError } from "./Errors";
import parse from "./parser";
const fs = require("uxp").storage.localFileSystem;

export default async () => {
  const pluginFolder = await fs.getPluginFolder();
  const errors = [];
  let content = {
    filename: "",
    data: "",
  };

  const loadSettigs = async (filename) => {
    try {
      const file = await pluginFolder.getEntry(filename);
      return file;
    } catch (e) {
      throw new ReadFileError("can't open file", filename);
    }
  };

  try {
    const file = await loadSettigs("custom_settings.txt");
    content = {
      filename: "custom_settings.txt",
      data: await file.read(),
    };
  } catch (e) {
    errors.push(e);
    const file = await loadSettigs("default_settings.txt");
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
