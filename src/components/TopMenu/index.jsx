import React, { forwardRef, useState, useEffect } from "react";
import runAction from "../../utils/runAction";
import saveUiSettings from "../../utils/saveUiSettings";
import DropDownMenu from "../DropDownMenu";
import Objects from "../../../plugin/icons/Objects";
import Preset from "../../../plugin/icons/Preset";
import Raw from "../../../plugin/icons/Raw";
import Snapshot from "../../../plugin/icons/Snapshot";
import Layers from "../../../plugin/icons/Layers";
import Help from "../../../plugin/icons/Help";
import Favorites from "../../../plugin/icons/Favorites";
import Document from "../../../plugin/icons/Document";
import BeforeAfterLeft from "../../../plugin/icons/BeforeAfterLeft";
import TwoWindows from "../../../plugin/icons/TwoWindows";
import Folder from "../../../plugin/icons/Folder";
import Settings from "../../../plugin/icons/Settings";
import BeforeAfterRight from "../../../plugin/icons/BeforeAfterRight";
import "./styles.css";
import runBeforeAfter from "../../utils/runBeforeAfter";
import changeImportantBtnsIds from "../../actions/setImportantBtns";

const standartExpandedLibraryOnClick = (action, state) => {
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

const retouchLibraryOnClick = (action, state) => {
  runAction({
    setName: "APs_RETOUCH_Library",
    actionName: action,
  });
};

const retouchServicesLibraryOnClick = (action, state) => {
  runAction({
    setName: "APs_RETOUCH_Services",
    actionName: action,
  });
};

const changeTopMenuHint = (hint, state) => ({
  type: "changeTopMenuHint",
  payload: hint,
});

const btns = [
  {
    hint: "«ПОМОЩЬ» (F4): Подсказки по работе с текущим инструментом и его слоями.",
    id: "helpBtn",
    clickHandler: (state) => standartExpandedLibraryOnClick("ПОМОЩЬ          F4", state),
    icon: <Help />,
  },
  {
    hint: "сервис: До/После (F2)",
    id: "beforeAfterBtn",
    // clickHandler: (state) => standartExpandedLibraryOnClick("До / После         F2", state),
    clickHandler: ([isAfter, changeIsAfter]) => {
      runBeforeAfter(!isAfter);
      changeIsAfter(!isAfter);
    },
    icon: <BeforeAfterLeft />,
  },
  {
    hint: "Объекты- (F1): Выделите объект и выполните эту команду чтобы удалить объект «с учётом содержимого»",
    id: "objectsBtn",
    clickHandler: (state) =>
      standartExpandedLibraryOnClick("APs_RETOUCH_Services | Объекты-", state),
    icon: <Objects />,
  },
  {
    hint: "Два окна. Удобно использовать для контроля ретуши",
    id: "twoWindowsBtn",
    clickHandler: (state) => retouchLibraryOnClick("SERVICE_2 windows", state),
    icon: <TwoWindows />,
  },
  {
    hint: "Слой-снимок текущего состояния документа.",
    id: "snapshotBtn",
    clickHandler: (state) =>
      retouchLibraryOnClick("LAYERS_Shot visible_Top of the document", state),
    icon: <Snapshot />,
  },
  {
    hint: "Добавить вверху документа слой смарт-объект с исходными Raw данными. В папке текущего документа (учитывая все под-папки) ищется одноимённый документ любого формата Raw. Если не находит - создаётся смарт-объект со снимком слоёв.",
    id: "rawBtn",
    clickHandler: (state) => retouchLibraryOnClick("Smart-object_Download RAW source", state),
    icon: <Raw />,
  },
  //   { hint: "Добавить тематический «Контейнер»",
  //   id: "containerBtn",
  //   clickHandler: () =>
  // }

  {
    hint: "сервис «Слои»",
    id: "layersBtn",
    clickHandler: (state) => retouchServicesLibraryOnClick("Слои", state),
    icon: <Layers />,
  },
  {
    hint: "сервис «Документ»",
    id: "documentBtn",
    clickHandler: (state) => retouchServicesLibraryOnClick("Документ", state),
    icon: <Document />,
  },
  {
    hint: "сервис «Открыть папку»",
    id: "folderBtn",
    clickHandler: (state) => retouchServicesLibraryOnClick("Папка", state),
    icon: <Folder />,
  },
  {
    hint: "сервис: «Сохранить в пресет»",
    id: "presetBtn",
    clickHandler: (state) => retouchServicesLibraryOnClick("Пресет", state),
    icon: <Preset />,
  },
  {
    hint: "Системная под-панель «ИЗБРАННОЕ» (F5)",
    id: "favoritesBtn",
    clickHandler: (state) => standartExpandedLibraryOnClick("ИЗБРАННОЕ      F5", state),
    icon: <Favorites />,
  },
];

const TopButton = ({ id, hint, clickHandler, icon, state, dispatch }) => {
  const [isAfter, changeIsAfter] = useState(true);

  const onChangeHintEvent = (hint) => {
    dispatch(changeTopMenuHint(hint));
  };
  const isImportant = state.modes.expanded
    ? state.ui.importantBtnsIdsExpanded.includes(id)
    : state.ui.importantBtnsIds.includes(id);
  return (
    <div
      onClick={() => {
        if (state.modes.importantMark) {
          const name = state.modes.expanded ? "importantBtnsIdsExpanded" : "importantBtnsIds";
          dispatch(changeImportantBtnsIds(id, state.modes.expanded));
          saveUiSettings(state.ui, name, id);
        } else {
          clickHandler(id === "beforeAfterBtn" ? [isAfter, changeIsAfter] : state);
        }
      }}
      onMouseEnter={() => state.modes.about && onChangeHintEvent(hint)}
      onMouseLeave={() => state.modes.about && onChangeHintEvent("")}
      className={isImportant ? "important btn-custom" : "btn-custom"}
    >
      {id === "beforeAfterBtn" ? isAfter ? icon : <BeforeAfterRight /> : icon}
    </div>
  );
};

export default forwardRef(
  ({ state, dispatch, size, top, btm, height, setisVisibleDropDown, isVisibleDropDown }, ref) => {
    const [click, setClick] = useState(0);

    const onClickHandler = () => setisVisibleDropDown(!isVisibleDropDown);

    const onDoubleClickHandler = () => dispatch({ type: "changeExpandedMode" });

    useEffect(() => {
      const timer = setTimeout(() => {
        // simple click
        if (click === 1) onClickHandler();
        setClick(0);
      }, 200); //delay

      if (click === 2) onDoubleClickHandler();

      return () => clearTimeout(timer);
    }, [click]);

    const onChangeHintEvent = (hint) => {
      dispatch(changeTopMenuHint(hint));
    };

    return (
      <div className="top-menu" ref={ref}>
        {btns.map(({ id, hint, clickHandler, icon }) => (
          <TopButton
            id={id}
            key={id}
            hint={hint}
            clickHandler={clickHandler}
            icon={icon}
            state={state}
            dispatch={dispatch}
          />
        ))}
        <div
          onClick={() => setClick((prev) => prev + 1)}
          onDoubleClick={() => setClick((prev) => prev + 1)}
          className={
            state.modes.expanded ? "red settings-btn btn-custom" : "settings-btn btn-custom"
          }
          onMouseEnter={() => state.modes.about && onChangeHintEvent("Настройки панели")}
          onMouseLeave={() => state.modes.about && onChangeHintEvent("")}
        >
          <Settings />
        </div>
        {isVisibleDropDown && (
          <DropDownMenu
            state={state}
            dispatch={dispatch}
            size={size}
            height={height}
            top={top}
            btm={btm}
          />
        )}
      </div>
    );
  }
);
