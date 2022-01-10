import React, { forwardRef } from "react";
import runAction from "../../utils/runAction";
import "./styles.css";
import saveUiSettings from "../../utils/saveUiSettings";
import Analyse from "../../../plugin/icons/Analyse";
import Brush from "../../../plugin/icons/Brush";
import MaskWhite from "../../../plugin/icons/MaskWhite";
import MaskBlack from "../../../plugin/icons/MaskBlack";
import MaskRestore from "../../../plugin/icons/MaskRestore";
import Defects from "../../../plugin/icons/Defects";
import Services from "../../../plugin/icons/Services";
import Difference from "../../../plugin/icons/Difference";
import SaveAutoIndex from "../../../plugin/icons/SaveAutoIndex";
import Next from "../../../plugin/icons/Next";
import MergeLayers from "../../../plugin/icons/MergeLayers";
import Divide from "../../../plugin/icons/Divide";
import Objects from "../../../plugin/icons/Objects";
import Preset from "../../../plugin/icons/Preset";
import Raw from "../../../plugin/icons/Raw";
import Snapshot from "../../../plugin/icons/Snapshot";
import Layers from "../../../plugin/icons/Layers";
import Help from "../../../plugin/icons/Help";
import Favorites from "../../../plugin/icons/Favorites";
import Document from "../../../plugin/icons/Document";
import Container from "../../../plugin/icons/Container";
import BeforeAfter from "../../../plugin/icons/BeforeAfter";
import TwoWindows from "../../../plugin/icons/TwoWindows";
import Settings from "../../../plugin/icons/Settings";

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

const btns = [
  {
    hint: "Выбрать инструмент «Кисть» (мягкая круглая) с настройками для маски текущего слоя",
    id: "brushBtn",
    clickHandler: (state) => standartExpandedLibraryOnClick("Кисть", state),
    icon: <Brush />,
  },
  {
    hint: "Заменить маску на текущем слое на белую",
    id: "maskWhiteBtn",
    clickHandler: (state) => standartExpandedLibraryOnClick("маска: Белая", state),
    icon: <MaskWhite />,
  },
  {
    hint: "Заменить маску на текущем слое на чёрную",
    id: "maskBlackBtn",
    clickHandler: (state) => standartExpandedLibraryOnClick("маска: Чёрная", state),
    icon: <MaskBlack />,
  },
  {
    hint: "Восстановить (очистить) маску на текущем слое",
    id: "maskRestoreBtn",
    clickHandler: (state) => standartExpandedLibraryOnClick("маска: Очистить", state),
    icon: <MaskRestore />,
  },
  {
    hint: "сервис: Анализ изображения (F3)",
    id: "analyzeBtn",
    clickHandler: (state) => standartExpandedLibraryOnClick("Анализ               F3", state),
    icon: <Analyse />,
  },
  {
    hint: "сервис «Проявить дефекты»",
    id: "defectsBtn",
    clickHandler: (state) => retouchLibraryOnClick("SERVICE_Defects_Show_Solarization", state),
    icon: <Defects />,
  },
  {
    hint: "Разложить эффект текущего слоя на составляющие: ТОН и ЦВЕТ",
    id: "divideBtn",
    clickHandler: (state) => retouchLibraryOnClick("SERVICE_Decomposition_Color-Luminosity", state),
    icon: <Divide />,
  },
  {
    hint: "сервис «Разница» ",
    id: "differenceBtn",
    clickHandler: (state) => retouchLibraryOnClick("СЕРВИС_Разница", state),
    icon: <Difference />,
  },
  {
    hint: "под-панель «Сервисы» ",
    id: "servicesBtn",
    clickHandler: (state) =>
      standartExpandedLibraryOnClick(
        state.modes.expanded ? "Сервисы      (Guru)" : "Сервисы      (Profi)",
        state
      ),
    icon: <Services />,
  },
  {
    hint: "Свести слои",
    id: "mergeBtn",
    clickHandler: (state) => standartExpandedLibraryOnClick("Соединить слои", state),
    icon: <MergeLayers />,
  },
  {
    hint: "Сохранить текущий документ с индексом",
    id: "saveAutoIndexBtn",
    clickHandler: (state) => retouchLibraryOnClick("DOCUMENT_Save_PSD_Autoindex", state),
    icon: <SaveAutoIndex />,
  },
  {
    hint: "Сохранить текущий документ и открыть следующий",
    id: "nextBtn",
    clickHandler: (state) => standartExpandedLibraryOnClick("СЛЕДУЮЩИЙ", state),
    icon: <Next />,
  },
];

const changeImportantBtnsIds = (btnid) => ({
  type: "changeImportantBtnsIds",
  payload: btnid,
});

const changeBottomMenuHint = (hint) => ({
  type: "changeBottomMenuHint",
  payload: hint,
});

const BottomButton = ({ id, hint, clickHandler, icon, state, dispatch }) => {
  const onChangeHintEvent = (hint) => {
    dispatch(changeBottomMenuHint(hint));
  };
  return (
    <sp-action-button
      onClick={() => {
        if (state.modes.importantMark) {
          dispatch(changeImportantBtnsIds(id));
          saveUiSettings(state.ui, "importantBtnsIds", id);
        } else {
          clickHandler(state);
        }
      }}
      onMouseEnter={() => state.modes.about && onChangeHintEvent(hint)}
      onMouseLeave={() => onChangeHintEvent("")}
      class={state.ui.importantBtnsIds.includes(id) ? "important" : ""}
    >
      {icon}
    </sp-action-button>
  );
};

export default forwardRef(({ state, dispatch }, ref) => {
  return (
    <div className="bottom-menu" ref={ref}>
      {btns.map(({ id, hint, clickHandler, icon }) => (
        <BottomButton
          id={id}
          hint={hint}
          clickHandler={clickHandler}
          icon={icon}
          state={state}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
});
