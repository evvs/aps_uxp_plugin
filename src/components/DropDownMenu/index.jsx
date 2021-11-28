import React from "react";

import "./styles.css";

const changeFontSize = (fontSize) => ({
  type: "changeFontSize",
  payload: fontSize,
});

export default ({ state, dispatch }) => {
  const sliderEvent = ({ target: { value } }) => {
    dispatch(changeFontSize(value * 13));
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

  return (
    <div className="dropdown-menu">
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
            class="dd-item"
            onClick={() => expandedModeEvent()}
            {...(state.modes.expanded ? { checked: true } : {})}
          >
            режим "Расширенный"
          </sp-checkbox>
        </div>
        <div>
          <sp-checkbox
            class="dd-item"
            onClick={() => changeDoubleClickEvent()}
            {...(state.modes.doubleClick ? { checked: true } : {})}
          >
            режим "Двойной клик"
          </sp-checkbox>
        </div>
        <div>
          <sp-checkbox
            class="dd-item"
            onClick={() => changeAboutEvent()}
            {...(state.modes.about ? { checked: true } : {})}
          >
            режим "Подсказки"
          </sp-checkbox>
        </div>
        <div>
          <sp-checkbox
            class="dd-item"
            onClick={() => changeImportantMarkEvent()}
            {...(state.modes.importantMark ? { checked: true } : {})}
          >
            метка "Важно"
          </sp-checkbox>
        </div>
      </div>
      <sp-divider></sp-divider>
      <div className="dd-item">Редактировать кнопки</div>
      <div className="dd-item" onClick={() => resetModesEvent()}>
        Сбросить режимы
      </div>
      <div className="dd-item">Настройки</div>
    </div>
  );
};
