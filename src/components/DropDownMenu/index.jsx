import React, { useState } from "react";

import "./styles.css";

const changeFontSize = (fontSize) => ({
  type: "changeFontSize",
  payload: fontSize,
});

export default ({ state, dispatch }) => {
  const sliderEvent = ({ target: { value } }) => {
    console.log(value);
    dispatch(changeFontSize(value * 13));
    //e.stopPropagation();
    //e.nativeEvent.stopImmediatePropagation();
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
          <sp-checkbox class="dd-item">режим расширенный</sp-checkbox>
        </div>
        <div>
          <sp-checkbox class="dd-item">режим "Двойной клик"</sp-checkbox>
        </div>
        <div>
          <sp-checkbox class="dd-item">Подскази по сервисам</sp-checkbox>
        </div>
      </div>
      <sp-divider></sp-divider>
      <div className="dd-item">Загрузить файл конфигурации</div>
      <div className="dd-item">Сбросить настройки</div>
      <div className="dd-item">О продукте</div>
    </div>
  );
};
