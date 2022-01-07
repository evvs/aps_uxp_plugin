import React, {
  useReducer,
  useEffect,
  useCallback,
  useLayoutEffect,
  useState,
  useRef,
} from "react";

import loadSettings from "../../utils/loadSettings";
import "./AllactionsPanel.css";

import ActionButtons from "../../components/ActionButtons";
import TopMenu from "../../components/TopMenu";
import BottomMenu from "../../components/BottomMenu";
import { Dialogs } from "../../components/LoadSettingDialog/Dialogs";
const uxp = require("uxp");
const fs = uxp.storage.localFileSystem;

const initialState = {
  data: false,
  errors: [],
  ui: {
    fontSize: 13,
    importantBtnsIds: [],
    topMenuHint: "",
    bottomMenuHint: "",
  },
  modes: {
    expanded: false,
    doubleClick: false,
    about: false,
    importantMark: false,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "unload":
      return initialState;
    case "loaded":
      return {
        ...state,
        data: action.payload.data,
        errors: action.payload.errors,
      };
    case "uiDataLoaded":
      return {
        ...state,
        ui: {
          ...state.ui,
          ...action.payload.ui,
        },
        modes: {
          ...state.modes,
          ...action.payload.modes
        }
      };
    case "changeFontSize":
      return {
        ...state,
        ui: {
          ...state.ui,
          fontSize: action.payload,
        },
      };
    case "changeTopMenuHint":
      return {
        ...state,
        ui: {
          ...state.ui,
          topMenuHint: action.payload,
        },
      };
    case "changeBottomMenuHint":
      return {
        ...state,
        ui: {
          ...state.ui,
          bottomMenuHint: action.payload,
        },
      };
    case "changeImportantBtnsIds":
      const importantBtnsIdsArr = state.ui.importantBtnsIds;
      const newIdsArr = importantBtnsIdsArr.includes(action.payload)
        ? importantBtnsIdsArr.filter((id) => id !== action.payload)
        : [...state.ui.importantBtnsIds, action.payload];

      return {
        ...state,
        ui: {
          ...state.ui,
          importantBtnsIds: newIdsArr,
        },
      };
    case "changeExpandedMode":
      return {
        ...state,
        modes: {
          ...state.modes,
          expanded: !state.modes.expanded,
        },
      };
    case "changeDoubleClickMode":
      return {
        ...state,
        modes: {
          ...state.modes,
          doubleClick: !state.modes.doubleClick,
        },
      };
    case "changeAboutkMode":
      return {
        ...state,
        modes: {
          ...state.modes,
          about: !state.modes.about,
        },
      };
    case "changeImportantMarkMode":
      return {
        ...state,
        modes: {
          ...state.modes,
          importantMark: !state.modes.importantMark,
        },
      };
    case "resetModes":
      return {
        ...state,
        modes: {
          expanded: false,
          doubleClick: false,
          about: false,
          importantMark: false,
        },
      };
    default:
      return state;
  }
};

const dataLoaded = (data, errors) => ({
  type: "loaded",
  payload: { data, errors },
});

const uiDataLoading = (uiData) => ({
  type: "uiDataLoaded",
  payload: uiData,
});

const loadUiSettings = async () => {
  const pluginFolder = await fs.getPluginFolder();
  const settingsFile = await pluginFolder.getEntry("user_settings.json");
  const token = await fs.createPersistentToken(settingsFile);
  // setSettingsFileToken(token);

  const entry = await fs.getEntryForPersistentToken(token);
  if (entry.isFile) {
    const data = await entry.read();
    return JSON.parse(data);
  }

  return false;
};

export const AllActionsPanel = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const top = React.createRef();
  const btm = React.createRef();
  const [size, setSize] = useState(0);
  const [height, setHeight] = useState(0);
  const [btmHeight, setBtmHeight] = useState(0);
  const [topHeight, setTopHeight] = useState(0);
  const elRef = useRef(null);
  // const uploadUiSettingsFile = useCallback(async (fileName, isAbsolutePath) => {
  //   const [data, errors] = await loadSettings(fileName, isAbsolutePath);
  //   dispatch(dataLoaded(data, errors));
  // }, []);

  useLayoutEffect(() => {
    function updateSize(e) {
      if (e) {
        setSize(e.target.clientWidth);
        setHeight(e.target.clientHeight);
      }
    }
    function updateSizeB(e) {
      if (e) {
        setBtmHeight(e.target.clientHeight);
      }
    }
    function updateSizeT(e) {
      if (e) {
        setTopHeight(e.target.clientHeight);
      }
    }

    const el = elRef.current;
    const elTop = top.current;
    const elBtm = btm.current;

    el.addEventListener("resize", updateSize);
    elTop.addEventListener("resize", updateSizeT);
    elBtm.addEventListener("resize", updateSizeB);
    updateSize();
    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("resize", updateSizeT);
      window.removeEventListener("resize", updateSizeB);
    };
  }, []);

  useEffect(async () => {
    try {
      // await runPathScript("call_set_setttings.jsx");
      const [data, errors] = await loadSettings();
      const uiData = await loadUiSettings();
      console.log(uiData);
      if (uiData) {
        dispatch(uiDataLoading(uiData));
      }
      dispatch(dataLoaded(data, errors));
    } catch (e) {
      console.log(e);
    }
  }, []);

  const updateLayout = useCallback(async (filename) => {
    const [data, errors] = await loadSettings(filename);
    dispatch(dataLoaded(data, errors));
  }, []);

  return (
    <div className="panel-container" ref={elRef}>
      {/*<Dialogs updateLayoutCb={updateLayout} />*/}
      <TopMenu
        state={state}
        dispatch={dispatch}
        ref={top}
        size={size}
        height={height}
        top={topHeight}
        btm={btmHeight}
      />
      {state.data && (
        <ActionButtons
          state={state}
          dispatch={dispatch}
          size={size}
          height={height}
          top={topHeight}
          btm={btmHeight}
        />
      )}
      <BottomMenu state={state} dispatch={dispatch} ref={btm} />
    </div>
  );
};
