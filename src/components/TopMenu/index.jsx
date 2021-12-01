import React, { useState } from "react";

import runAction from "../../utils/runAction";
import DropDownMenu from "../DropDownMenu";

import "./styles.css";

export default ({ state, dispatch }) => {
  const [isVisibleDropDown, setisVisibleDropDown] = useState(false);

  const standartExpandedLibraryOnClick = (action) => {
    if (state.modes.expanded) {
      runAction({
        setName: "APs_RETOUCH_Expanded",
        actionName: action,
      });
    } else {
      runAction({
        setName: "APs_RETOUCH_Standart",
        actionName: action,
      });
    }
  };

  const retouchLibraryOnClick = (action) => {
    runAction({
      setName: "APs_RETOUCH_Library",
      actionName: action,
    });
  };

  const retouchServicesLibraryOnClick = (action) => {
    runAction({
      setName: "APs_RETOUCH_Services",
      actionName: action,
    });
  };

  return (
    <div className="top-menu">
      <sp-action-button
        onClick={() => {
          standartExpandedLibraryOnClick("ПОМОЩЬ          F4");
        }}
      >
        <img src="./icons/help.svg" className="filter-green" />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          standartExpandedLibraryOnClick("До / После         F2");
        }}
      >
        <img src="./icons/beforeAfter.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchLibraryOnClick("SERVICE_2 windows");
        }}
      >
        <img src="./icons/two_windows_15x16.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchLibraryOnClick("LAYERS_Shot visible_Top of the document");
        }}
      >
        <img src="./icons/snapshot.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchLibraryOnClick("Smart-object_Download RAW source");
        }}
      >
        <img src="./icons/raw.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchServicesLibraryOnClick("Контейнер");
        }}
      >
        <img src="./icons/container.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchServicesLibraryOnClick("Слои");
        }}
      >
        <img src="./icons/layers.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchServicesLibraryOnClick("Документ");
        }}
      >
        <img src="./icons/document.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchServicesLibraryOnClick("Папка");
        }}
      >
        <img src="./icons/folders_16x15.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchServicesLibraryOnClick("Пресет");
        }}
      >
        <img src="./icons/preset.svg" />
      </sp-action-button>

      <sp-action-button onClick={() => standartExpandedLibraryOnClick("ИЗБРАННОЕ      F5")}>
        <img src="./icons/favorites.svg" />
      </sp-action-button>

      <sp-action-button onClick={() => setisVisibleDropDown(!isVisibleDropDown)}>
        <img src="./icons/settings.svg" />
      </sp-action-button>
      {isVisibleDropDown && <DropDownMenu state={state} dispatch={dispatch} />}
    </div>
  );
};
