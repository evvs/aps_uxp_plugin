import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import ActionButton from "../ActionButton";

import "./styles.css";

export default ({ state, dispatch }) => {
  const [size, setSize] = useState(0);
  const [min, setMin] = useState(94);
  const elRef = useRef(null);

  useLayoutEffect(() => {
    function updateSize(e) {
      if (e) {
        console.log(e.target.clientWidth, "size");
        setSize(e.target.clientWidth);
      }
    }
    function debounce(func, wait, immediate) {
      let timeout;

      return function executedFunction() {
        const context = this;
        const args = arguments;

        const later = function () {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
      };
    }
    const el = elRef.current;

    el.addEventListener("resize", debounce(updateSize, 200));
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const all = document.querySelectorAll(".action-btn > p");
    let val = 0;
    all.forEach((btnText) => {
      if (btnText.clientWidth > val) val = btnText.clientWidth;
    });
    const vv = val + state.ui.fontSize - 13;

    setMin(vv);
  }, [size, state.ui.fontSize]);

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
            size={size}
            key={id}
            btnid={id}
            name={name}
            description={description}
            color={color}
            min={min}
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
