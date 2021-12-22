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

const createFile = async (scriptname) => {
  let { nativePath } = await fs.getPluginFolder();
  const folder = await fs.getTemporaryFolder();
  const file = await folder.createFile("script.jsx", {
    overwrite: true,
  });

  console.log(folder)

  nativePath = platform === "darwin" ? nativePath : nativePath.replace(/\\/gi, "/");

  await file.write(`var sPath = Folder(app.path + "/" + localize("$$$/ScriptingSupport/InstalledScripts=Presets/Scripts")).absoluteURI + '/APs_Scripts/APs_RETOUCH_set_ru/${scriptname}.jsx';
  var fjsx = File(sPath);
  $.evalFile(fjsx);`);

  return "script.jsx";
};

const runScript = async (scriptname) => {
  const filename = await createFile(scriptname);
  await ScriptRun(filename);
};

export default runScript;
