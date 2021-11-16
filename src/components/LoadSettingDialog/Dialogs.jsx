import React from "react";
import ReactDOM from "react-dom";
import Preferences from "./Preferences";

export const Dialogs = ({ updateLayoutCb }) => {
  let preferencesDialog = null;

  const openPreferences = async () => {
    if (!preferencesDialog) {
      preferencesDialog = document.createElement("dialog");
      ReactDOM.render(
        <Preferences
          dialog={preferencesDialog}
          updateLayoutCb={(fileName) => {
            console.log("передать функции апдейта шкурки для подгрузки данных по новому файлу");
            updateLayoutCb(fileName, true);
          }}
        />,
        preferencesDialog
      );
    }
    document.body.appendChild(preferencesDialog);
    let result = await preferencesDialog.uxpShowModal({
      title: "Выбор файла настроек",
      resize: "both",
      size: {
        width: 800,
        height: 250,
      },
    });
    // Do whatever you need with the {smartObject, vectorContent} result
    console.log(result);
    preferencesDialog.remove();
  };

  return (
    <div>
      <div className="row" style={{ margin: `20px`, justifyContent: `space-around` }}>
        <sp-action-button onClick={openPreferences} width="160">
          Open Dialog
        </sp-action-button>
      </div>
    </div>
  );
};
