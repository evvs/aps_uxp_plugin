import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import "./styles.css";

import runAction from "../../utils/runAction";
import runScript from "../../utils/runScript";

export default ({
  name,
  description,
  color,
  standartActions,
  expandedActions,
  fontSize,
  isExpanded,
  isDoubleClick,
}) => {
  const onClickHandler = () => {
    if (isExpanded) {
      console.log("Расширенный");
      expandedActions.actions.forEach((action) => {
        runAction(action);
      });
      expandedActions.scripts.forEach((script) => {
        runScript(script);
      });
    } else {
      console.log("Стандартный");
      standartActions.actions.forEach((action) => {
        runAction(action);
      });
      standartActions.scripts.forEach((script) => {
        runScript(script);
      });
    }
  };

  const onDoubleClickHandler = () => {
    if (isDoubleClick) {
      console.log("Расширенный");
      expandedActions.actions.forEach((action) => {
        runAction(action);
      });
      expandedActions.scripts.forEach((script) => {
        runScript(script);
      });
    }
  };

  const [click, setClick] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // simple click
      if (click === 1) onClickHandler();
      setClick(0);
    }, 500); //delay

    if (click === 2) onDoubleClickHandler();

    return () => clearTimeout(timer);
  }, [click]);

  return (
    <sp-action-button
      title={description}
      class={`action-btn btn-${color}`}
      onClick={() => setClick((prev) => prev + 1)}
      onDoubleClick={() => setClick((prev) => prev + 1)}
      style={{
        fontSize: `${fontSize}`,
        minWidth: `${70 + 6 * fontSize}px`,
        height: `${fontSize + 10}px`,
      }}
    >
      {name}
    </sp-action-button>
  );
};
