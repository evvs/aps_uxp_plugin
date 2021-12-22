import React, { forwardRef, useState } from "react";
import runAction from "../../utils/runAction";
import DropDownMenu from "../DropDownMenu";
import Objects from "../../../plugin/icons/Objects";
import Preset from "../../../plugin/icons/Preset";
import Raw from "../../../plugin/icons/Raw";
import Snapshot from "../../../plugin/icons/Snapshot";
import Layers from "../../../plugin/icons/Layers";
import Help from "../../../plugin/icons/Help";
import Favorites from "../../../plugin/icons/Favorites";
import Document from "../../../plugin/icons/Document";
import BeforeAfter from "../../../plugin/icons/BeforeAfter";
import TwoWindows from "../../../plugin/icons/TwoWindows";
import Folder from "../../../plugin/icons/Folder";
import Settings from "../../../plugin/icons/Settings";
import "./styles.css";

const btnsHints = {
  helpBtn: "«ПОМОЩЬ» (F4): Подсказки по работе с текущим инструментом и его слоями.",
  beforeAfterBtn: "сервис: До/После (F2)",
  objectsBtn:
    "Объекты- (F1): Выделите объект и выполните эту команду чтобы удалить объект «с учётом содержимого»",
  twoWindowsBtn: "Два окна. Удобно использовать для контроля ретуши",
  snapshotBtn: "Слой-снимок текущего состояния документа.",
  rawBtn:
    "Добавить вверху документа слой смарт-объект с исходными Raw данными. В папке текущего документа (учитывая все под-папки) ищется одноимённый документ любого формата Raw. Если не находит - создаётся смарт-объект со снимком слоёв.",
  containerBtn: "Добавить тематический «Контейнер»",
  layersBtn: "сервис «Слои»",
  documentBtn: "сервис «Документ»",
  folderBtn: "сервис «Открыть папку»",
  presetBtn: "сервис: «Сохранить в пресет»",
  favoritesBtn: "Системная под-панель «ИЗБРАННОЕ» (F5)",
  settingsBtn: "Настройки панели",
};

const changeTopMenuHint = (hint) => ({
  type: "changeTopMenuHint",
  payload: hint,
});

export default forwardRef(({ state, dispatch }, ref) => {
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
    <div className="top-menu" ref={ref}>
      <sp-action-button
        onClick={() => {
          standartExpandedLibraryOnClick("ПОМОЩЬ          F4");
        }}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.helpBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <Help />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          standartExpandedLibraryOnClick("До / После         F2");
        }}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.beforeAfterBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <BeforeAfter />
      </sp-action-button>

      <sp-action-button
        onClick={() => standartExpandedLibraryOnClick("APs_RETOUCH_Services | Объекты-")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.objectsBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <Objects />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchLibraryOnClick("SERVICE_2 windows");
        }}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.twoWindowsBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <TwoWindows />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchLibraryOnClick("LAYERS_Shot visible_Top of the document");
        }}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.snapshotBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <Snapshot />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchLibraryOnClick("Smart-object_Download RAW source");
        }}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.rawBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <Raw />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchServicesLibraryOnClick("Слои");
        }}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.layersBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <Layers />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchServicesLibraryOnClick("Документ");
        }}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.documentBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <Document />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchServicesLibraryOnClick("Папка");
        }}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.folderBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <Folder />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          retouchServicesLibraryOnClick("Пресет");
        }}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.presetBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <Preset />
      </sp-action-button>

      <sp-action-button
        onClick={() => standartExpandedLibraryOnClick("ИЗБРАННОЕ      F5")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.favoritesBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <Favorites />
      </sp-action-button>

      <sp-action-button
        onClick={() => setisVisibleDropDown(!isVisibleDropDown)}
        class="red-btn"
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.settingsBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <Settings />
      </sp-action-button>
      {isVisibleDropDown && <DropDownMenu state={state} dispatch={dispatch} />}
    </div>
  );
});
