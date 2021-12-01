import React from "react";
import runAction from "../../utils/runAction";

import "./styles.css";

export default ({ state }) => {
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
    <div className="bottom-menu">
      <sp-action-button onClick={() => standartExpandedLibraryOnClick("Ластик")}>
        <img src="./icons/eraser.svg" />
      </sp-action-button>

      <sp-action-button onClick={() => standartExpandedLibraryOnClick("Кисть")}>
        <img src="./icons/brush.svg" />
      </sp-action-button>

      <sp-action-button onClick={() => retouchLibraryOnClick("TOOL_Brush Mixer")}>
        <img src="./icons/brushMix.svg" />
      </sp-action-button>

      <sp-action-button onClick={() => retouchLibraryOnClick("TOOL_Stamp")}>
        <img src="./icons/stamp.svg" />
      </sp-action-button>

      <sp-action-button onClick={() => standartExpandedLibraryOnClick("Анализ               F3")}>
        <img src="./icons/analyse.svg" />
      </sp-action-button>

      <sp-action-button onClick={() => retouchLibraryOnClick("SERVICE_Defects_Show_Solarization")}>
        <img src="./icons/defects.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => retouchLibraryOnClick("SERVICE_Decomposition_Color-Luminosity")}
      >
        <img src="./icons/divide.svg" />
      </sp-action-button>

      <sp-action-button onClick={() => retouchLibraryOnClick("СЕРВИС_Разница")}>
        <img src="./icons/difference.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          standartExpandedLibraryOnClick(
            state.modes.expanded ? "Сервисы      (Guru)" : "Сервисы      (Profi)"
          );
        }}
      >
        <img src="./icons/services_panel_16x16.svg" />
      </sp-action-button>

      <sp-action-button onClick={() => standartExpandedLibraryOnClick("Соединить слои")}>
        <img src="./icons/mergeLayers.svg" />
      </sp-action-button>

      <sp-action-button onClick={() => retouchLibraryOnClick("DOCUMENT_Save_PSD_Autoindex")}>
        <img src="./icons/saveAutoIndex.svg" />
      </sp-action-button>

      <sp-action-button onClick={() => standartExpandedLibraryOnClick("СЛЕДУЮЩИЙ")}>
        <img src="./icons/next.svg" />
      </sp-action-button>
    </div>
  );
};
