import React from "react";
import runAction from "../../utils/runAction";
import "./styles.css";

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

export default ({ state, dispatch }) => {
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
    <div className="bottom-menu">
      <sp-action-button
        onClick={() => standartExpandedLibraryOnClick("Ластик")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.eraserBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/eraser.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => standartExpandedLibraryOnClick("Кисть")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.brushBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/brush.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => retouchLibraryOnClick("TOOL_Brush Mixer")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.brushMixBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/brushMix.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => retouchLibraryOnClick("TOOL_Stamp")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.stumpBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/stamp.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => standartExpandedLibraryOnClick("Анализ               F3")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.analyzeBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/analyse.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => retouchLibraryOnClick("SERVICE_Defects_Show_Solarization")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.defectsBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/defects.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => retouchLibraryOnClick("SERVICE_Decomposition_Color-Luminosity")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.divideBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/divide.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => retouchLibraryOnClick("СЕРВИС_Разница")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.differenceBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/difference.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => {
          standartExpandedLibraryOnClick(
            state.modes.expanded ? "Сервисы      (Guru)" : "Сервисы      (Profi)"
          );
        }}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.servicesBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/services_panel_16x16.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => standartExpandedLibraryOnClick("Соединить слои")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.mergeBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/mergeLayers.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => retouchLibraryOnClick("DOCUMENT_Save_PSD_Autoindex")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.saveAutoIndexBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/saveAutoIndex.svg" />
      </sp-action-button>

      <sp-action-button
        onClick={() => standartExpandedLibraryOnClick("СЛЕДУЮЩИЙ")}
        onMouseEnter={() => state.modes.about && onChangeHintEvent(btnsHints.nextBtn)}
        onMouseLeave={() => onChangeHintEvent("")}
      >
        <img src="./icons/next.svg" />
      </sp-action-button>
    </div>
  );
};
