import React, { useState, useEffect } from "react";
import saveUiSettings from "../../utils/saveUiSettings";
import changeBtnSettings from "../../utils/changeBtnSettings";
import runOption from "../../utils/runOption";

import "./styles.css";

const changeFontSize = (fontSize) => ({
  type: "changeFontSize",
  payload: fontSize,
});

export default ({ state, dispatch, top, size, btm, height }) => {
  const [fontSize, setFontSize] = useState(state.ui.fontSize);

  useEffect(() => {
    let timer = setTimeout(() => saveUiSettings(state.ui, "fontSize", fontSize), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [fontSize]);

  const sliderEvent = async ({ target: { value } }) => {
    const fontSize = value * 13;
    dispatch(changeFontSize(fontSize));
    setFontSize(fontSize);
  };

  const expandedModeEvent = () => {
    dispatch({ type: "changeExpandedMode" });
  };

  const changeDoubleClickEvent = () => {
    dispatch({ type: "changeDoubleClickMode" });
  };

  const changeAboutEvent = () => {
    dispatch({ type: "changeAboutkMode" });
  };

  const changeImportantMarkEvent = () => {
    dispatch({ type: "changeImportantMarkMode" });
  };

  const resetModesEvent = () => {
    dispatch({ type: "resetModes" });
  };

  const maxHeight = height - top - btm - 8;
  console.log(size, " sssize");

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
          value={`${state.ui.fontSize / 13}`}
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
          <sp-checkbox
            class="checkbox-item"
            onClick={() => changeDoubleClickEvent()}
            {...(state.modes.doubleClick ? { checked: true } : {})}
          >
            режим "Двойной клик"
          </sp-checkbox>
        </div>
        <div>
          <sp-checkbox
            class="checkbox-item"
            onClick={() => changeAboutEvent()}
            {...(state.modes.about ? { checked: true } : {})}
          >
            режим "Подсказки"
          </sp-checkbox>
        </div>
        <div>
          <sp-checkbox
            class="checkbox-item"
            onClick={() => changeImportantMarkEvent()}
            {...(state.modes.importantMark ? { checked: true } : {})}
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
          })()
        }
      >
        Редактировать кнопки
      </div>
      <div className="dd-item" onClick={() => resetModesEvent()}>
        Сбросить режимы
      </div>
      <div className="dd-item" onClick={() => runOption("aboutProduct();")}>
        Активация
      </div>
    </div>
  );
};
