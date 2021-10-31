import React from "react";

import loadSettings from '../../utils/loadSettings'
import "./AllactionsPanel.css"

export const AllActionsPanel = () => {
    return (
        <div>
          <sp-button onClick={() => console.log(loadSettings())}>Открыть</sp-button>
        </div>
        )
}