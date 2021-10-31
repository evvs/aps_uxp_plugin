import { ReadFileError } from './Errors';
import parse from './parser';
const fs = require("uxp").storage.localFileSystem;

export default async () => {
const pluginFolder = await fs.getPluginFolder();
const errors = []
let content = {
  filename: '',
  data: ''
}
let file
let result

const loadCustomSettings = async() => {
  try {
    const file = await pluginFolder.getEntry("custom_settings.txt");
    return file
  } catch(e) {
    throw new ReadFileError("can't open file", "custom_settings.txt")
  }
}

const loadDefaultSettigs = async() => {
  try {
    const file = await pluginFolder.getEntry("default_settings.txt");
    return file
  } catch(e) {
    throw new ReadFileError("can't open file", "default_settings.txt")
  }
}

try {
  file = await loadCustomSettings()
  content = {
    filename: 'custom_settings.txt',
    data: await file.read()
  }
  } catch (e) {
    errors.push(e)
    file = await loadDefaultSettigs();
    content = {
      filename: 'default_settings.txt',
      data: await file.read()
    }
  }

try {
  const result = parse(content.data);
  return [result, errors]
} catch (e) {
  errors.push(e)
  return [result, errors]
} 

}