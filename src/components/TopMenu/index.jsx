import React, { useState } from "react";

import runAction from "../../utils/runAction";
import DropDownMenu from "../DropDownMenu";

import "./styles.css";

const btnsHints = {
  helpBtn: "«ПОМОЩЬ» (F4): Подсказки по работе с текущим инструментом и его слоями.",
  beforeAfterBtn: "сервис: До/После (F2)",
  twoWindowsBtn: "сервис: Два окна. Удобно использовать для контроля ретуши...",
  snapshotBtn: "Сделать снимок видимых слоёв вверху документа",
  rawBtn:
    "Добавить вверху документа слой смарт-объект с исходными Raw данными (В папке текущего документа (учитывая все под-папки) ищется одноимённый документ любого формата Raw. Если не находит - создаётся смарт-объект со снимком слоёв.)",
  containerBtn: "Добавить тематический «Контейнер»",
  layersBtn: "сервис: Слои",
  documentBtn: "сервис: Документ",
  folderBtn: "сервис: Открыть папку",
  presetBtn: "сервис: Сохранить в пресет",
  favoritesBtn: "Открыть системную под-панель «ИЗБРАННОЕ» (F5)",
  settingsBtn: "Настройки панели"
};

const changeTopMenuHint = (hint) => ({
  type: "changeTopMenuHint",
  payload: hint,
});

export default ({ state, dispatch }) => {
  const [isVisibleDropDown, setisVisibleDropDown] = useState(false);

  const onChangeHintEvent = (hint) => {
    dispatch(changeTopMenuHint(hint));
  };

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
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.helpBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/help.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          standartExpandedLibraryOnClick("До / После         F2");
        }}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.beforeAfterBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/beforeAfter.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchLibraryOnClick("SERVICE_2 windows");
        }}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.twoWindowsBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/two_windows_15x16.svg" />
      </sp-action-button>

      <sp-action-button
        snapshotBtn
        onClick={() => {
          retouchLibraryOnClick("LAYERS_Shot visible_Top of the document");
        }}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.snapshotBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/snapshot.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchLibraryOnClick("Smart-object_Download RAW source");
        }}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.rawBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/raw.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchServicesLibraryOnClick("Контейнер");
        }}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.containerBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/container.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchServicesLibraryOnClick("Слои");
        }}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.layersBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/layers.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchServicesLibraryOnClick("Документ");
        }}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.documentBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/document.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchServicesLibraryOnClick("Папка");
        }}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.folderBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/folders_16x15.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchServicesLibraryOnClick("Пресет");
        }}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.presetBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/preset.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => standartExpandedLibraryOnClick("ИЗБРАННОЕ      F5")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.favoritesBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/favorites.svg" />
      </sp-action-button>

      <sp-action-button onClick={() => setisVisibleDropDown(!isVisibleDropDown)}
              onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.settingsBtn)}
              onMouseLeave={() => onChangeHintEvent("")}>
        <img src="./icons/settings.svg" />
      </sp-action-button>
      {isVisibleDropDown && <DropDownMenu state={state} dispatch={dispatch} />}
    </div>
  );
};
