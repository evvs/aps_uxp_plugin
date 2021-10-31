import React, { useReducer, useEffect } from "react";

import loadSettings from '../../utils/loadSettings'
import "./AllactionsPanel.css"

const initialState = {
  data: false,
  errors: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "unload":
      return initialState;
    case "loaded":
      return {
        data: action.payload.data,
        errors: action.payload.errors
      };
    default:
      return state;
  }
};

const dataLoaded = (data, errors) => ({
  type: "loaded",
  payload: {data, errors}
});

export const AllActionsPanel = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(async() => {
    const [data, errors] = await loadSettings();
    dispatch(dataLoaded(data, errors))
  }, [])

    return (
        <div>
        </div>
        )
}