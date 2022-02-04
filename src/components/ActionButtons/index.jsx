import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import setLastAction from "../../utils/setLastAction";
import ActionButton from "../ActionButton";
import uxp from "uxp";
import "./styles.css";
import runOption from "../../utils/runOption";

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
  const fontS = state.modes.expanded ? state.ui.fontSizeExpanded : state.ui.fontSize;
  const [heightBtn, setHeightBtn] = useState(fontS * 1.6);
  const [hintsIndex, setHintsIndex] = useState(0);
  const [lastClickedAction, setLastClickedAction] = useState(null);
  const [btnWidth, setBtnWidth] = useState(100);
  const [marg, setMarg] = useState(0);
  const debouncedsize = useDebounce(size, 20);
  const [heightBtns, setHeightBtns] = useState(0);

  useEffect(() => {
    const all = document.querySelectorAll(".action-btn > p");
    let val = 0;
    all.forEach((btnText) => {
      if (btnText.clientWidth > val) val = btnText.clientWidth;
    });
    setHeightBtn(Math.ceil(fontS * 1.6));
    setMin(val);
  }, [heightBtns, fontS]);

  useLayoutEffect(() => {
    const count = state.data.length;
    let columnsCount = Math.floor(debouncedsize / min);
    columnsCount = Math.max(Math.floor((debouncedsize - count * 2 - columnsCount) / min), 1);
    const containersCountInRow = Math.min(columnsCount, count);

    const buttonsToShowHintBottom = containersCountInRow * 5;
    setHintsIndex(buttonsToShowHintBottom);
    setBtnWidth(100 / containersCountInRow);
    setMarg((columnsCount * 3) / columnsCount);
  }, [debouncedsize, fontS, min]);

  useLayoutEffect(async () => {
    const pluginFolder = await fs.getPluginFolder();
    const settingsFile = await pluginFolder.getEntry("user_settings.json");
    const token = await fs.createPersistentToken(settingsFile);

    const entry = await fs.getEntryForPersistentToken(token);
    const data = JSON.parse(await entry.read());

    setLastClickedAction(data.ui.lastActionBtnId);
  }, []);

  const setLastClickedActionCb = async (bntId) => {
    setLastClickedAction(bntId);
    setLastAction(bntId);
  };

  const elRef = useRef(null);

  useLayoutEffect(() => {
    function updateSize(e) {
      if (e) {
        setHeightBtns(e.target.clientHeight);
      }
    }
    const el = elRef.current;
    el.addEventListener("resize", updateSize);
    updateSize();
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <div
      ref={elRef}
      className={`actionbuttons`}
      style={{
        maxHeight: `calc(100vh - ${top + btm + 12}px)`,
        overflow: isVisibleDropDown && 215 > height - top - btm - 8 ? "hidden" : "auto",
      }}
    >
      {state.ui.topMenuHint.length > 0 && (
        <div style={{ fontSize: `${fontS}`, top: `${top}px` }} className="top-hint">
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
              height={heightBtn}
              btnid={id}
              name={name}
              description={description}
              color={color || "none"}
              standartActions={standartActions}
              expandedActions={expandedActions}
              fontSize={fontS}
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

      {/*<button*/}
      {/*  onClick={async () => {*/}
      {/*    await runOption('openAtn(">1.atn");');*/}
      {/*    await new Promise((resolve) => {*/}
      {/*      let count = 5;*/}
      {/*      const t = setInterval(() => {*/}
      {/*        runOption('if (checkActSet("1")) {do_Action("1", "1"); removeActSet("1");}');*/}
      {/*        count--;*/}
      {/*        if (count === 0) {*/}
      {/*          clearInterval(t);*/}
      {/*          resolve();*/}
      {/*        }*/}
      {/*      }, 300);*/}
      {/*    });*/}
      {/*  }}*/}
      {/*>*/}
      {/*  do_Action 1 and remove*/}
      {/*</button>*/}
      {state.ui.bottomMenuHint.length > 0 && (
        <div
          style={{
            fontSize: `${fontS}`,
            bottom: `${height - heightBtns - top - 11}px`,
          }}
          className="bottom-hint"
        >
          {state.ui.bottomMenuHint}
        </div>
      )}
    </div>
  );
};
