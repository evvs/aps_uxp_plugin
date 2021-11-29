import React, { useReducer, useEffect, useCallback } from "react";

import loadSettings from "../../utils/loadSettings";
import "./AllactionsPanel.css";

import ActionButtons from "../../components/ActionButtons";
import TopMenu from "../../components/TopMenu";
import BottomMenu from "../../components/BottomMenu";
import { Dialogs } from "../../components/LoadSettingDialog/Dialogs";

const initialState = {
  data: false,
  errors: [],
  ui: {
    fontSize: 13,
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
    case "changeFontSize":
      return {
        ...state,
        ui: {
          fontSize: action.payload,
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

export const AllActionsPanel = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const uploadUiSettingsFile = useCallback(async (fileName, isAbsolutePath) => {
  //   const [data, errors] = await loadSettings(fileName, isAbsolutePath);
  //   dispatch(dataLoaded(data, errors));
  // }, []);

  useEffect(async () => {
    const [data, errors] = await loadSettings();
    dispatch(dataLoaded(data, errors));
  }, []);

  const updateLayout = useCallback(async (filename) => {
    const [data, errors] = await loadSettings(filename);
    dispatch(dataLoaded(data, errors));
  }, []);

  useEffect(() => {
    console.log(state);
  });

  return (
    <div class="flexcontainer">
      {/*<Dialogs updateLayoutCb={updateLayout} />*/}
      <TopMenu state={state} dispatch={dispatch}/>
      {state.data && <ActionButtons state={state} />}
      <BottomMenu />
    </div>
  );
};
