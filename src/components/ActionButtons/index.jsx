import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import ActionButton from "../ActionButton";

import "./styles.css";

export default ({ state, dispatch }) => {
  const [size, setSize] = useState(0);
  const [min, setMin] = useState(94);
  const [btnWidth, setBtnWidth] = useState(94);
  const [marg, setMarg] = useState(0);
  const elRef = useRef(null);

  useLayoutEffect(() => {
    function updateSize(e) {
      if (e) {
        console.log(e.target.clientWidth, "size");
        setSize(e.target.clientWidth);
      }
    }

    const el = elRef.current;

    el.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useLayoutEffect(() => {
    const all = document.querySelectorAll(".action-btn > p");
    let val = 0;
    all.forEach((btnText) => {
      if (btnText.clientWidth > val) val = btnText.clientWidth;
    });
    val += 20;
    if (val > size) val = size - 12;
    console.log(val, " min");

    setMin(val);
  }, [size, state.ui.fontSize]);

  useLayoutEffect(() => {
    const count = state.data.length;
    let columnsCount = Math.floor(size / min);
    columnsCount = Math.max(Math.floor((size - count * 6 - columnsCount * 4) / min), 1);
    const containersCountInRow = Math.min(columnsCount, count);

    setBtnWidth(100 / containersCountInRow);
    setMarg((columnsCount * 3) / columnsCount);
  }, [size, state.ui.fontSize, min]);

  return (
    <div className="actionbuttons" ref={elRef}>
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
