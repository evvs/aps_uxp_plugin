import React, { useState, useEffect } from "react";
import saveUiSettings from "../../utils/saveUiSettings";
import changeBtnSettings from "../../utils/changeBtnSettings";
import runOption from "../../utils/runOption";

import "./styles.css";
import saveMode from "../../utils/saveMode";
import resetModes from "../../utils/resetModes";

const changeFontSize = (fontSize, type) => ({
  type,
  payload: fontSize,
});

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default ({ state, dispatch, top, size, btm, height }) => {
  const fontS = state.modes.expanded ? state.ui.fontSizeExpanded : state.ui.fontSize;

  const [fontSize, setFontSize] = useState(fontS);
  const dfontSize = useDebounce(fontSize, 150);

  useEffect(() => {
    if (state.ui.fontSize !== dfontSize) {
      const fontSizee = dfontSize * 13;
      const name = dispatch(
        changeFontSize(
          fontSizee,
          state.modes.expanded ? "changeFontSizeExpanded" : "changeFontSize"
        )
      );
      let timer = setTimeout(
        () =>
          saveUiSettings(
            state.ui,
            state.modes.expanded ? "fontSizeExpanded" : "fontSize",
            fontSizee
          ),
        1000
      );
      return () => {
        clearTimeout(timer);
      };
    }
  }, [dfontSize]);

  const sliderEvent = async ({ target: { value } }) => {
    setFontSize(value);
  };

  const expandedModeEvent = async () => {
    await dispatch({ type: "changeExpandedMode" });
    await saveMode(state.modes, "expanded", !state.modes.expanded);
  };

  const changeDoubleClickEvent = async () => {
    await dispatch({
      type: state.modes.expanded ? "changeDoubleClickModeExpanded" : "changeDoubleClickMode",
    });
    await saveMode(
      state.modes,
      state.modes.expanded ? "doubleClickExpanded" : "doubleClick",
      state.modes.expanded ? !state.modes.doubleClickExpanded : !state.modes.doubleClick
    );
  };

  const changeAboutEvent = async () => {
    await dispatch({ type: state.modes.expanded ? "changeAboutModeExpanded" : "changeAboutMode" });
    await saveMode(
      state.modes,
      state.modes.expanded ? "aboutExpanded" : "about",
      state.modes.expanded ? !state.modes.aboutExpanded : !state.modes.about
    );
  };

  const changeImportantMarkEvent = async () => {
    await dispatch({
      type: state.modes.expanded ? "changeImportantMarkModeExpanded" : "changeImportantMarkMode",
    });
    await saveMode(
      state.modes,
      state.modes.expanded ? "importantMarkExpanded" : "importantMark",
      !state.modes.importantMark
    );
  };

  const resetModesEvent = async () => {
    await dispatch({ type: "resetModes" });
    await resetModes();
  };

  const maxHeight = height - top - btm - 8;
  const dClick = state.modes.expanded
    ? { ...(state.modes.doubleClickExpanded ? { checked: true } : {}) }
    : { ...(state.modes.doubleClick ? { checked: true } : {}) };
  const about = state.modes.expanded
    ? { ...(state.modes.aboutExpanded ? { checked: true } : {}) }
    : { ...(state.modes.about ? { checked: true } : {}) };
  const importantMark = state.modes.expanded
    ? { ...(state.modes.importantMarkExpanded ? { checked: true } : {}) }
    : { ...(state.modes.importantMark ? { checked: true } : {}) };

  return (
    <div
      className="dropdown-menu"
      style={{
        minWidth: size >= 249 ? `250px` : `${size}px`,
        top: `${top}px`,
        maxHeight: `${maxHeight}px`,
      }}
    >
      <div className="textsize-slider dd-item">
        <p>Размер шрифта:</p>
        <sp-slider
          min="1"
          max="2"
          step={0.01}
          value={`${fontS / 13}`}
          variant="filled"
          fill-offset="left"
          class="slider"
          onInput={(e) => sliderEvent(e)}
        ></sp-slider>
      </div>
      <sp-divider></sp-divider>
      <div className="checkbox-container">
        <div>
          <sp-checkbox
            class="checkbox-item"
            onClick={() => expandedModeEvent()}
            {...(state.modes.expanded ? { checked: true } : {})}
          >
            режим "Расширенный"
          </sp-checkbox>
        </div>
        <div>
          <sp-checkbox class="checkbox-item" onClick={() => changeDoubleClickEvent()} {...dClick}>
            режим "Двойной клик"
          </sp-checkbox>
        </div>
        <div>
          <sp-checkbox class="checkbox-item" onClick={() => changeAboutEvent()} {...about}>
            режим "Подсказки"
          </sp-checkbox>
        </div>
        <div>
          <sp-checkbox
            class="checkbox-item"
            onClick={() => changeImportantMarkEvent()}
            {...importantMark}
          >
            метка "Важно"
          </sp-checkbox>
        </div>
      </div>
      <sp-divider></sp-divider>
      <div
        className="dd-item"
        onClick={() =>
          (async () => {
            await changeBtnSettings();
            location.reload();
          })()
        }
      >
        Выбрать проект
      </div>
      <div className="dd-item" onClick={() => resetModesEvent()}>
        Сбросить настройки
      </div>
      <div className="dd-item" onClick={() => runOption("aboutProduct();")}>
        Активация
      </div>
    </div>
  );
};
