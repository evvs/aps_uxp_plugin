const uxp = require("uxp");
const fs = uxp.storage.localFileSystem;
const platform = require("os").platform();

const batchPlay = require("photoshop").action.batchPlay;

async function ScriptRun(jsxFile) {
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

const createFile = async (action) => {
  const { setName, actionName } = action;
  let { nativePath } = await fs.getPluginFolder();
  const folder = await fs.getTemporaryFolder();
  const file = await folder.createFile("action.jsx", {
    overwrite: true,
  });

  nativePath = platform === "darwin" ? nativePath : nativePath.replace(/\\/gi, "/");

  await file.write(`$.evalFile('${nativePath}scripts/_APsRETOUCH_FirmLib_ru.jsm');
  $.evalFile('${nativePath}scripts/_APsRETOUCH_KeywordsLib_ru.jsm');
  do_Action('${setName}', '${actionName}', false, undefined);`);

  return "action.jsx";
};

const runAction = async (action) => {
  const filename = await createFile(action);
  await ScriptRun(filename);
};

export default runAction;
