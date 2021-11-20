import React, { useState, useEffect } from "react";
import uxp from "uxp";

const fs = uxp.storage.localFileSystem;
const userSettingsFile = "user_settings.json";

const Preferences = ({ dialog, updateLayoutCb }) => {
  const [currentFilePath, setCurrentFilePath] = useState();
  const [inputFilePath, setInputFilePath] = useState();
  const [settingsJsonFileData, setSettingsJsonFileData] = useState();
  const [settingsFileToken, setSettingsFileToken] = useState();

  const openChosingFileDialog = async () => {
    const file = await fs.getFileForOpening();
    if (file) {
      if (file.isFile) {
        setInputFilePath(file.nativePath);
      }
    }
    return;
  };

  const writeCurrentFile = async () => {
    if (currentFilePath === inputFilePath) return;
    console.log("write process");

    try {
      const entry = await fs.getEntryForPersistentToken(settingsFileToken);
      if (entry.isFile) {
        const writedResult = await entry.write(
          JSON.stringify({ ...settingsJsonFileData, file: inputFilePath })
        );
      }
    } catch (e) {
      console.log("ошибка при записи", e);
      return false;
    }
    // todo нужно понимать результат обработки для информирования какой файл был загружен
    updateLayoutCb && updateLayoutCb(inputFilePath);
    return true;
  };

  const onAccept = () => {
    const isWriteSuccess = writeCurrentFile();
    if (!isWriteSuccess) {
      //  информируем об ошибках
      return;
    }
    // можно передать данные в область основной панели
    isWriteSuccess && dialog.close({});
  };

  //прогнать файл через парсер чтобы дать юхеру понять что он валиден или нет
  const validate = () => {};

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
          setInputFilePath(currentSettingsFilePath);
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
