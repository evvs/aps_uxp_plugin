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

const createFile = async (isAfter) => {
  let { nativePath } = await fs.getPluginFolder();
  const folder = await fs.getTemporaryFolder();
  const file = await folder.createFile("action.jsx", {
    overwrite: true,
  });

  nativePath = platform === "darwin" ? nativePath : nativePath.replace(/\\/gi, "/");

  await file.write(`$.evalFile('${nativePath}jsx/APs_BeforeAfter.jsx');
  beforeAfter(${isAfter}, '0xDEADBEAF')`);

  return "action.jsx";
};

const runBeforeAfter = async (isAfter) => {
  const filename = await createFile(isAfter);
  await ScriptRun(filename);
};

export default runBeforeAfter;
