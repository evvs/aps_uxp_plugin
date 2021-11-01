import React from "react";
import "./styles.css"


const uxp = require("uxp");
const fs = uxp.storage.localFileSystem;

const batchPlay = require("photoshop").action.batchPlay;

async function ScriptRun(jsxFile) {
   let pluginFolder = await fs.getPluginFolder()
   try {
      let jsxFileObject = await pluginFolder.getEntry(jsxFile);
      var filetoken = await fs.createSessionToken(jsxFileObject);
   } catch (e) {
      app.showAlert("File Can't be found!");
   }
   return await batchPlay(
      [
         {
            "_obj": "AdobeScriptAutomation Scripts",
            "javaScript": {
               "_path": filetoken,
               "_kind": "local"
            },
            "javaScriptMessage": "JSM",
            "_isCommand": true,
            "_options": {

               "dialogOptions": "dontDisplay"

            },
         }
      ], {
      "synchronousExecution": false,
      "modalBehavior": "fail"
   });

}

export default ({ name, description, color, standartActions, expandedEctions }) => {
  return (
      <sp-action-button title={description} class="action-btn"
      onClick={() => {
        ScriptRun('pseudoHdr.jsx')
      }}
      >{name}</sp-action-button>
  );
};
