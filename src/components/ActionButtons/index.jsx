import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import ActionButton from "../ActionButton";

import "./styles.css";

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

export default ({ state, dispatch, size, top, btm }) => {
  const [min, setMin] = useState(94);
  const [btnWidth, setBtnWidth] = useState(94);
  const [marg, setMarg] = useState(0);
  const debouncedsize = useDebounce(size, 20);
  const debouncedmin = useDebounce(min, 20);

  useLayoutEffect(() => {
    const all = document.querySelectorAll(".action-btn > p");
    let val = 0;
    all.forEach((btnText) => {
      if (btnText.clientWidth > val) val = btnText.clientWidth;
    });
    val += 20;
    if (val > size) val = size - 26;

    setMin(val - 54);
  }, [size, state.ui.fontSize, debouncedsize]);

  useLayoutEffect(() => {
    const count = state.data.length;
    let columnsCount = Math.floor(debouncedsize / debouncedmin);
    columnsCount = Math.max(
      Math.floor((debouncedsize - count * 6 - columnsCount * 4) / debouncedmin),
      1
    );
    const containersCountInRow = Math.min(columnsCount, count);

    setBtnWidth(100 / containersCountInRow);
    setMarg((columnsCount * 3) / columnsCount);
  }, [debouncedsize, state.ui.fontSize, debouncedmin]);

  return (
    <div className="actionbuttons" style={{ maxHeight: `calc(100vh - ${top + btm + 12}px)` }}>
      {state.ui.topMenuHint.length > 0 && (
        <div style={{ fontSize: `${state.ui.fontSize}` }} className="top-hint">
          {state.ui.topMenuHint}
        </div>
      )}
      {state.data.length > 0 ? (
        state.data.map(({ id, name, description, color, standartActions, expandedActions }) => (
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
          />
        ))
      ) : (
        <h1>No buttons to load</h1>
      )}
      {state.ui.bottomMenuHint.length > 0 && (
        <div style={{ fontSize: `${state.ui.fontSize}` }} className="bottom-hint">
          {state.ui.bottomMenuHint}
        </div>
      )}
    </div>
  );
};
