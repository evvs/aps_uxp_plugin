import React, { forwardRef } from "react";
import runAction from "../../utils/runAction";
import "./styles.css";
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

const btnsHints = {
  eraserBtn: "Выбрать инструмент «Ластик (мягкая круглая)» с настройками для маски текущего слоя",
  brushBtn: "Выбрать инструмент «Кисть (мягкая круглая)» с настройками для маски текущего слоя",
  brushMixBtn: "Выбрать инструмент «Кисть-Микс»",
  stumpBtn: "Выбрать инструмент «Штамп»",
  analyzeBtn: "сервис: Анализ изображения (F3)",
  defectsBtn: 'сервис: "Проявить дефекты"',
  divideBtn: "Разложить эффект текущего слоя на составляющие: ТОН и ЦВЕТ",
  differenceBtn: "сервис: Показать разницу",
  servicesBtn: "Выбрать сервис для анализа и обработки изображения",
  mergeBtn: "сервис: Свести слои",
  saveAutoIndexBtn: "сервис: Сохранить текущий документ с индексом",
  nextBtn: "сервис: Сохранить текущий документ и открыть следующий",
};

const changeBottomMenuHint = (hint) => ({
  type: "changeBottomMenuHint",
  payload: hint,
});

export default forwardRef(({ state, dispatch }, ref) => {
  console.log(state.dispatch, ref, 6666);
  const onChangeHintEvent = (hint) => {
    dispatch(changeBottomMenuHint(hint));
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
    <div className="bottom-menu" ref={ref}>
      <sp-action-button
        onClick={() => standartExpandedLibraryOnClick("Кисть")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.brushBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <Brush />
      </sp-action-button>

      <sp-action-button
        onClick={() => retouchLibraryOnClick("TOOL_Stamp")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.stumpBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <MaskWhite />
      </sp-action-button>

      <sp-action-button
        onClick={() => standartExpandedLibraryOnClick("Анализ               F3")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.analyzeBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <MaskBlack />
      </sp-action-button>

      <sp-action-button
        onClick={() => retouchLibraryOnClick("SERVICE_Defects_Show_Solarization")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.defectsBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <MaskRestore />
      </sp-action-button>

      <sp-action-button
        onClick={() => retouchLibraryOnClick("SERVICE_Decomposition_Color-Luminosity")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.divideBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <Analyse />
      </sp-action-button>

      <sp-action-button
        onClick={() => retouchLibraryOnClick("СЕРВИС_Разница")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.differenceBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <Defects />
      </sp-action-button>

      <sp-action-button
        onClick={() => standartExpandedLibraryOnClick("СЛЕДУЮЩИЙ")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.nextBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <Divide />
      </sp-action-button>

      <sp-action-button
        onClick={() => standartExpandedLibraryOnClick("Соединить слои")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.mergeBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <Difference />
      </sp-action-button>

      <sp-action-button
        onClick={() => retouchLibraryOnClick("DOCUMENT_Save_PSD_Autoindex")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.saveAutoIndexBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <Services />
      </sp-action-button>

      <sp-action-button
        onClick={() => retouchLibraryOnClick("DOCUMENT_Save_PSD_Autoindex")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.saveAutoIndexBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <MergeLayers />
      </sp-action-button>

      <sp-action-button
        onClick={() => retouchLibraryOnClick("DOCUMENT_Save_PSD_Autoindex")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.saveAutoIndexBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <SaveAutoIndex />
      </sp-action-button>

      <sp-action-button
        onClick={() => standartExpandedLibraryOnClick("СЛЕДУЮЩИЙ")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.nextBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <Next />
      </sp-action-button>
    </div>
  );
});
