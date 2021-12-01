import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import "./styles.css";

import saveUiSettings from "../../utils/saveUiSettings";
import runAction from "../../utils/runAction";
import runScript from "../../utils/runScript";

const changeImportantBtnsIds = (btnid) => ({
  type: "changeImportantBtnsIds",
  payload: btnid,
});

export default ({
  btnid,
  name,
  min,
  size,
  description,
  color,
  standartActions,
  expandedActions,
  importantBtnsIds,
  fontSize,
  isExpanded,
  isDoubleClick,
  isImportantMark,
  dispatch,
  state
}) => {
  const [styles, setStyles] = useState({});

  const onClickHandler = () => {
    if (isImportantMark) {
      dispatch(changeImportantBtnsIds(btnid));
      saveUiSettings(state.ui, "importantBtnsIds", btnid);
      return;
    }
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

  //   вынести выше
  useEffect(() => {
    const columnsCount = Math.floor(size / min);

    setStyles({
      fontSize: `${fontSize}`,
      width: size / columnsCount - 4 + "px",
    });
  }, [size, min]);

  return (
    <sp-action-button
      title={description}
      class={`action-btn ${importantBtnsIds.includes(btnid) ? "importantBtn" : `btn-${color}`}`}
      onClick={() => setClick((prev) => prev + 1)}
      onDoubleClick={() => setClick((prev) => prev + 1)}
      style={styles}
    >
      <p
        style={{
          fontSize: `${fontSize}`,
        }}
      >
        {name}
      </p>
    </sp-action-button>
  );
};
