import React from "react";
import "./styles.css";

const uxp = require("uxp");
const fs = uxp.storage.localFileSystem;

const batchPlay = require("photoshop").action.batchPlay;

async function ScriptRun(jsxFile) {
   console.log(jsxFile)
  let pluginFolder = await fs.getTemporaryFolder();
  try {
    let jsxFileObject = await pluginFolder.getEntry(jsxFile);
    var filetoken = await fs.createSessionToken(jsxFileObject);
  } catch (e) {
    app.showAlert("File Can't be found!");
  }
  return await batchPlay(
    [
      {
        _obj: "AdobeScriptAutomation Scripts",
        javaScript: {
          _path: filetoken,
          _kind: "local",
        },
        javaScriptMessage: "JSM",
        _isCommand: true,
        _options: {
          dialogOptions: "dontDisplay",
        },
      },
    ],
    {
      synchronousExecution: false,
      modalBehavior: "fail",
    }
  );
}

const createFile = async () => {
  const folder = await fs.getTemporaryFolder();
  const file = await folder.createFile("action.jsx", {
    overwrite: true,
  });
  await file.write(`$.evalFile('C:/Program Files/Adobe/Adobe Photoshop 2021/Presets/Scripts/APs_Scripts/APs_RETOUCH_set_ru/_APsRETOUCH_FirmLib_ru.jsm')
$.evalFile('C:/Program Files/Adobe/Adobe Photoshop 2021/Presets/Scripts/APs_Scripts/APs_RETOUCH_set_ru/_APsRETOUCH_KeywordsLib_ru.jsm')
   
do_Action('APs_RETOUCH_Profi', 'Pseudo HDR');`);

   return 'action.jsx'
};

const runAction = async() => {
   const path = await createFile()
   await ScriptRun(path)
}

export default ({ name, description, color, standartActions, expandedEctions }) => {
  return (
    <sp-action-button
      title={description}
      class="action-btn"
      onClick={() => runAction()}
    >
      {name}
    </sp-action-button>
  );
};
