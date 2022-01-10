import React, { useState, useEffect, forwardRef } from "react";
import "./styles.css";

import saveUiSettings from "../../utils/saveUiSettings";
import runAction from "../../utils/runAction";
import runScript from "../../utils/runScript";

const changeImportantBtnsIds = (btnid) => ({
  type: "changeImportantBtnsIds",
  payload: btnid,
});

const changeBottomMenuHint = (hint) => ({
  type: "changeBottomMenuHint",
  payload: hint,
});

const changeTopMenuHint = (hint, state) => ({
  type: "changeTopMenuHint",
  payload: hint,
});

export default ({
  btnid,
  isLastClicked,
  name,
  marg,
  btnWidth,
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
  state,
  setLastClickedAction,
  hintSpot,
}) => {
  const onClickHandler = () => {
    if (isImportantMark) {
      dispatch(changeImportantBtnsIds(btnid));
      saveUiSettings(state.ui, "importantBtnsIds", btnid);
      return;
    }
    setLastClickedAction(btnid);

    if (isExpanded) {
      expandedActions.actions.forEach((action) => {
        runAction(action);
      });
      expandedActions.scripts.forEach((script) => {
        runScript(script);
      });
    } else {
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
      setLastClickedAction(btnid);

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
  }, [click, setLastClickedAction]);

  const onChangeHintEvent = (hint, spot) => {
    if (spot) {
      spot === "bottom" ? dispatch(changeBottomMenuHint(hint)) : dispatch(changeTopMenuHint(hint));
    } else {
      dispatch(changeBottomMenuHint(hint));
      dispatch(changeTopMenuHint(hint));
    }
  };

  return (
    <div
      onMouseEnter={() => state.modes.about && onChangeHintEvent(description, hintSpot)}
      onMouseLeave={() => onChangeHintEvent("")}
      className={`action-btn ${isLastClicked && "last-clicked "} ${
        importantBtnsIds.includes(btnid) ? "importantBtn" : `btn-${color}`
      }`}
      onClick={() => setClick((prev) => prev + 1)}
      onDoubleClick={() => setClick((prev) => prev + 1)}
      style={{
        fontSize: `${fontSize}`,
        // width: btnWidth + "px",
        width: "calc(" + btnWidth + "% - " + marg + "px)",
      }}
    >
      <p
        style={{
          fontSize: `${fontSize}`,
        }}
      >
        {name}
      </p>
    </div>
  );
};
