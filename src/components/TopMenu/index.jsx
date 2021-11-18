import React, { useState } from "react";
import runAction from "../../utils/runAction";
import DropDownMenu from "../DropDownMenu";

import "./styles.css";

export default ({state, dispatch}) => {
  const [isVisibleDropDown, setisVisibleDropDown] = useState(true);

  return (
    <div className="top-menu">
      <sp-action-button>
        <img src="./icons/help.svg" />
      </sp-action-button>
      <sp-action-button
        onClick={() => {
          runAction({
            setName: "APs_RETOUCH_Guru",
            actionName: "До / После         F2",
          });
        }}
      >
        <img src="./icons/beforeAfter.svg" />
      </sp-action-button>
      <sp-action-button
        onClick={() => {
          runAction({
            setName: "APs_RETOUCH_Library",
            actionName: "SERVICE_2 windows",
          });
        }}
      >
        <img src="./icons/two_windows_15x16.svg" />
      </sp-action-button>
      <sp-action-button>
        <img src="./icons/snapshot.svg" />
      </sp-action-button>
      <sp-action-button>
        <img src="./icons/raw.svg" />
      </sp-action-button>
      <sp-action-button>
        <img src="./icons/container.svg" />
      </sp-action-button>
      <sp-action-button>
        <img src="./icons/layers.svg" />
      </sp-action-button>
      <sp-action-button>
        <img src="./icons/document.svg" />
      </sp-action-button>
      <sp-action-button>
        <img src="./icons/folders_16x15.svg" />
      </sp-action-button>
      <sp-action-button>
        <img src="./icons/preset.svg" />
      </sp-action-button>
      <sp-action-button>
        <img src="./icons/favorites.svg" />
      </sp-action-button>
      <sp-action-button
        class="settings-btn"
        onClick={() => setisVisibleDropDown(!isVisibleDropDown)}
      >
        <img src="./icons/settings.svg" />
      </sp-action-button>
      {isVisibleDropDown && <DropDownMenu state={state} dispatch={dispatch}/>}
    </div>
  );
};
