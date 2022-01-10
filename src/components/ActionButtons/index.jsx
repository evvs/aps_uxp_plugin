import React, { useState, useEffect, useLayoutEffect } from "react";
import setLastAction from "../../utils/setLastAction";
import ActionButton from "../ActionButton";
import uxp from "uxp";
import "./styles.css";

const fs = uxp.storage.localFileSystem;

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

export default ({ state, dispatch, size, top, btm, isVisibleDropDown, height }) => {
  const [min, setMin] = useState(100);
  const [hintsIndex, setHintsIndex] = useState(0);
  const [lastClickedAction, setLastClickedAction] = useState(null);
  const [btnWidth, setBtnWidth] = useState(100);
  const [marg, setMarg] = useState(0);
  const debouncedsize = useDebounce(size, 20);

  useLayoutEffect(() => {
    const all = document.querySelectorAll(".action-btn > p");
    setTimeout(() => {
      let val = 0;
      all.forEach((btnText) => {
        if (btnText.clientWidth > val) val = btnText.clientWidth;
      });
      setMin(val);
    }, 250);
  }, [state.ui.fontSize]);

  useLayoutEffect(() => {
    const count = state.data.length;
    let columnsCount = Math.floor(debouncedsize / min);
    columnsCount = Math.max(Math.floor((debouncedsize - count * 2 - columnsCount) / min), 1);
    const containersCountInRow = Math.min(columnsCount, count);

    const buttonsToShowHintBottom = containersCountInRow * 5;
    // const buttonsToShowHintTop = state.data.length - buttonsToShowHintBottom;
    setHintsIndex(buttonsToShowHintBottom);

    setBtnWidth(100 / containersCountInRow);
    setMarg((columnsCount * 3) / columnsCount);
  }, [debouncedsize, state.ui.fontSize, min]);

  useLayoutEffect(async () => {
    const pluginFolder = await fs.getPluginFolder();
    const settingsFile = await pluginFolder.getEntry("user_settings.json");
    const token = await fs.createPersistentToken(settingsFile);
    // setSettingsFileToken(token);

    const entry = await fs.getEntryForPersistentToken(token);
    const data = JSON.parse(await entry.read());

    setLastClickedAction(data.ui.lastActionBtnId);
  }, []);

  const setLastClickedActionCb = async (bntId) => {
    setLastClickedAction(bntId);
    setLastAction(bntId);
  };

  return (
    <div
      className={`actionbuttons`}
      style={{
        maxHeight: `calc(100vh - ${top + btm + 12}px)`,
        overflow: isVisibleDropDown && 215 > height - top - btm - 8 ? "hidden" : "auto",
      }}
    >
      {state.ui.topMenuHint.length > 0 && (
        <div style={{ fontSize: `${state.ui.fontSize}`, top: `${top}px` }} className="top-hint">
          {state.ui.topMenuHint}
        </div>
      )}
      {state.data.length > 0 ? (
        state.data.map(
          ({ id, name, description, color, standartActions, expandedActions }, index) => (
            <ActionButton
              btnWidth={btnWidth}
              key={id}
              marg={marg}
              btnid={id}
              name={name}
              description={description}
              color={color}
              standartActions={standartActions}
              expandedActions={expandedActions}
              importantBtnsIds={state.ui.importantBtnsIds}
              fontSize={state.ui.fontSize}
              isExpanded={state.modes.expanded}
              isDoubleClick={state.modes.doubleClick}
              isImportantMark={state.modes.importantMark}
              dispatch={dispatch}
              state={state}
              setLastClickedAction={setLastClickedActionCb}
              isLastClicked={lastClickedAction === id}
              hintSpot={index < hintsIndex ? "bottom" : "top"}
            />
          )
        )
      ) : (
        <h1>No buttons to load</h1>
      )}
      {state.ui.bottomMenuHint.length > 0 && (
        <div
          style={{ fontSize: `${state.ui.fontSize}`, bottom: `${btm}px` }}
          className="bottom-hint"
        >
          {state.ui.bottomMenuHint}
        </div>
      )}
    </div>
  );
};
