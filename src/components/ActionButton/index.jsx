import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import "./styles.css";

import runAction from "../../utils/runAction";
import runScript from "../../utils/runScript";

export default ({
  name,
  size,
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

  console.log(size);
  useEffect(() => {
    const timer = setTimeout(() => {
      // simple click
      if (click === 1) onClickHandler();
      setClick(0);
    }, 500); //delay

    if (click === 2) onDoubleClickHandler();

    return () => clearTimeout(timer);
  }, [click]);

  const getWidth = (sizee, fontsizee) => {
    switch (true) {
      case sizee >= 830:
        return sizee / 6;
      case sizee >= 755:
        return sizee / 5;
      case sizee >= 603:
        return sizee / 4 + fontsizee * 4 - 3;
      case sizee >= 472:
        return sizee / 3 - 7;
      case sizee >= 317:
        return sizee / 2 - 14;
      default:
        return sizee + fontSize - 14;
    }
  };

  console.log(getWidth(size));
  return (
    <sp-action-button
      title={description}
      class={`action-btn btn-${color}`}
      onClick={() => setClick((prev) => prev + 1)}
      onDoubleClick={() => setClick((prev) => prev + 1)}
      style={{
        fontSize: `${fontSize}`,
        minWidth: `${70 + 6 * fontSize}px`,
        height: `${fontSize + 8}px`,
        // maxWidth: `${size / 4}px`,
        maxWidth: getWidth(size, fontSize),
      }}
    >
      {name}
    </sp-action-button>
  );
};
