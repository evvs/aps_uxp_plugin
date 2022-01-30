import React, { useState, useEffect, memo } from "react";
import "./styles.css";

import saveUiSettings from "../../utils/saveUiSettings";
import runAction from "../../utils/runAction";
import runScript from "../../utils/runScript";
import changeImportantBtnsIds from "../../actions/setImportantBtns";

const changeBottomMenuHint = (hint) => ({
  type: "changeBottomMenuHint",
  payload: hint,
});

const changeTopMenuHint = (hint, state) => ({
  type: "changeTopMenuHint",
  payload: hint,
});

export default memo(
  ({
    btnid,
    height,
    isLastClicked,
    name,
    marg,
    btnWidth,
    description,
    color,
    standartActions,
    expandedActions,
    fontSize,
    isExpanded,
    isDoubleClick,
    isImportantMark,
    dispatch,
    state,
    setLastClickedAction,
    hintSpot,
  }) => {
    const isImp = state.modes.expanded
      ? state.ui.importantBtnsIdsExpanded.includes(btnid)
      : state.ui.importantBtnsIds.includes(btnid);

    const onClickHandler = () => {
      if (isImportantMark) {
        const name = state.modes.expanded ? "importantBtnsIdsExpanded" : "importantBtnsIds";
        dispatch(changeImportantBtnsIds(btnid, state.modes.expanded));
        saveUiSettings(state.ui, name, btnid);
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

    const doubleClickDelay = isDoubleClick ? 500 : 1;

    useEffect(() => {
      const timer = setTimeout(() => {
        // simple click
        if (click === 1) onClickHandler();
        setClick(0);
      }, doubleClickDelay); //delay

      if (click === 2) onDoubleClickHandler();

      return () => clearTimeout(timer);
    }, [click, setLastClickedAction, doubleClickDelay]);

    const onChangeHintEvent = (hint, spot) => {
      if (spot) {
        spot === "bottom"
          ? dispatch(changeBottomMenuHint(hint))
          : dispatch(changeTopMenuHint(hint));
      } else {
        dispatch(changeBottomMenuHint(hint));
        dispatch(changeTopMenuHint(hint));
      }
    };

    return (
      <div
        onMouseEnter={() => state.modes.about && onChangeHintEvent(description, hintSpot)}
        onMouseLeave={() => state.modes.about && onChangeHintEvent("")}
        className={`action-btn ${isLastClicked && "last-clicked "} ${`btn-${
          isImp ? "important" : color
        }`}`}
        onClick={() => setClick((prev) => prev + 1)}
        onDoubleClick={() => setClick((prev) => prev + 1)}
        style={{
          height: `${height}px`,
          fontSize: `${fontSize}`,
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
  }
);
