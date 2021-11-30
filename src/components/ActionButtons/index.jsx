import React, { useState, useLayoutEffect, useRef } from "react";
import ActionButton from "../ActionButton";

import "./styles.css";

export default ({ state, dispatch }) => {
  const [size, setSize] = useState(0);
  const elRef = useRef(null);
  useLayoutEffect(() => {
    function updateSize(e) {
      if (e) setSize(e.target.clientWidth);
    }
    const el = elRef.current;

    el.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="actionbuttons" ref={elRef}>
      {state.data.length > 0 ? (
        state.data.map(({ id, name, description, color, standartActions, expandedActions }) => (
          <ActionButton
            size={size}
            key={id}
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
    </div>
  );
};
