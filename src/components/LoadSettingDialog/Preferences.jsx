import React, { useState, useEffect } from "react";
import parse from "../../utils/parser";

import uxp from "uxp";

const fs = uxp.storage.localFileSystem;
const userSettingsFile = "user_settings.json";

const Preferences = ({ dialog, updateLayoutCb }) => {
  const [currentFilePath, setCurrentFilePath] = useState();
  const [inputFilePath, setInputFilePath] = useState();
  const [settingsJsonFileData, setSettingsJsonFileData] = useState();
  const [settingsFileToken, setSettingsFileToken] = useState();

  const [newSelectedFileContent, setNewSelectedFileContent] = useState();
  const [newSelectedFileName, setNewSelectedFileName] = useState();

  const [error, setError] = useState();

  const openChosingFileDialog = async () => {
    try {
      const file = await fs.getFileForOpening({ types: ["txt"] });
      if (file) {
        if (file.isFile) {
          const filename = file.nativePath.split("\\").reverse()[0];
          const text = await file.read();

          setNewSelectedFileContent(text);
          setNewSelectedFileName(filename);
          setInputFilePath(file.nativePath);
          setError(undefined);
        }
      }
      return;
    } catch (e) {
      console.log(e);
    }
  };

  const writeCurrentFile = async () => {
    if (currentFilePath === inputFilePath) return;
    console.log("write process");

    try {
      const pluginFolder = await fs.getPluginFolder();
      const entry = await fs.getEntryForPersistentToken(settingsFileToken);

      const newTxtFile = await pluginFolder.createFile(newSelectedFileName, {
        overwrite: true,
      });
      const newSettingsCustomFileToken = await fs.createPersistentToken(newTxtFile);
      const mewFileEntry = await fs.getEntryForPersistentToken(newSettingsCustomFileToken);

      if (entry.isFile) {
        try {
          const res = parse(newSelectedFileContent);
          if (!res.length) {
            setError("В файле должна быть хотя бы 1 валидная инструкция");
            return false;
          }
        } catch (e) {
          setError("Невалидный формат файла");
          throw e;
        }

        try {
          await mewFileEntry.write(newSelectedFileContent);
          await entry.write(JSON.stringify({ ...settingsJsonFileData, file: newSelectedFileName }));
        } catch (e) {
          setError("Произошла ошибка при записи файла");
          throw e;
        }
      }
    } catch (e) {
      console.log("ошибка при записи", e);
      return false;
    }
    // todo нужно понимать результат обработки для информирования какой файл был загружен
    return true;
  };

  const onAccept = async () => {
    const isWriteSuccess = await writeCurrentFile();
    if (!isWriteSuccess) {
      //  информируем об ошибках
      return;
    }
    try {
      updateLayoutCb && updateLayoutCb(newSelectedFileName);
    } catch (e) {
      console.log(e, 666);
    }

    // можно передать данные в область основной панели
    dialog.close({});
  };

  //прогнать файл через парсер чтобы дать юхеру понять что он валиден или нет
  const validate = async () => {
    console.log(newSelectedFileContent);
    if (!newSelectedFileContent) return;
    try {
      const res = parse(newSelectedFileContent);
      if (!res.length) {
        setError("В файле должна быть хотя бы 1 валидная инструкция");
        return;
      }
    } catch (e) {
      setError("Невалидный формат файла");
      return;
    }
    setError(undefined);
  };

  // читаем файл настроек пользователя и вытаскием путь ведущий к файлу с кнпоками шкурки
  useEffect(() => {
    const processUserSettingsFile = async () => {
      try {
        console.log("initial process");

        const pluginFolder = await fs.getPluginFolder();
        const settingsFile = await pluginFolder.getEntry(userSettingsFile);
        const token = await fs.createPersistentToken(settingsFile);
        setSettingsFileToken(token);

        if (settingsFile.isFile) {
          const entry = await fs.getEntryForPersistentToken(token);
          const data = await entry.read();
          const parsed = JSON.parse(data);
          setSettingsJsonFileData(parsed);

          const currentSettingsFilePath = parsed.file;

          setCurrentFilePath(currentSettingsFilePath);
          setInputFilePath(`${pluginFolder.nativePath}${currentSettingsFilePath}`);
        }
      } catch (e) {
        console.log("ошибка при чтении текущего файла настроек пользователя", e);
      }
    };
    processUserSettingsFile();
  }, []);

  return (
    <div className="column">
      <sp-heading size="S" style={{ marginBottom: `20px` }}>
        Установить файл настроек
      </sp-heading>
      <div
        className="column"
        style={{
          border: `solid 1px #888`,
          borderRadius: `4px`,
          padding: `10px`,
          marginBottom: `30px`,
        }}
      >
        <sp-textfield
          placeholder="Путь к файлу"
          onInput={(evt) => setInputFilePath(evt.target.value)}
          value={inputFilePath}
          style={{ width: "600px", marginBottom: "10px" }}
        >
          <sp-label isrequired="true" slot="label">
            Путь к файлу
          </sp-label>
        </sp-textfield>

        <div className="row" style={{ justifyContent: `flex-start` }}>
          <sp-button variant="secondary" onClick={openChosingFileDialog} style={{ width: "120px" }}>
            Выбрать файл
          </sp-button>

          <sp-button
            variant="secondary"
            onClick={validate}
            style={{ width: "120px", marginLeft: `10px` }}
          >
            Валидировать
          </sp-button>
        </div>

        {error && (
          <div className="row" style={{ justifyContent: `flex-start` }}>
            {error}
          </div>
        )}
      </div>
      <div className="row" style={{ justifyContent: `flex-end` }}>
        <sp-button variant="secondary" onClick={() => dialog.close("reasonCanceled")}>
          Закрыть
        </sp-button>

        <sp-button variant="primary" style={{ marginLeft: `10px` }} onClick={onAccept}>
          Применить
        </sp-button>
      </div>
    </div>
  );
};

export default Preferences;
