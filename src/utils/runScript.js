const uxp = require("uxp");
const fs = uxp.storage.localFileSystem;

const batchPlay = require("photoshop").action.batchPlay;

async function ScriptRun(jsxFile) {
  let pluginFolder = await fs.getPluginFolder()
console.log(jsxFile)
  try {
    let jsxFileObject = await pluginFolder.getEntry(`scripts/${jsxFile}.jsx`);
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


const runScript = async (scriptName) => {
  await ScriptRun(scriptName);
};

export default runScript;