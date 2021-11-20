import React from "react";
import "./styles.css";

import runAction from "../../utils/runAction";
import runScript from "../../utils/runScript";

export default ({ name, description, color, standartActions, expandedEctions, fontSize }) => {
  return (
    <sp-action-button
      title={description}
      class={`action-btn btn-${color}`}
      style={{ fontSize: `${fontSize}` }}
      onClick={() => {
        standartActions.actions.forEach((action) => {
          runAction(action);
        });
        standartActions.scripts.forEach((script) => {
          runScript(script);
        });
      }}
    >
      {name}
    </sp-action-button>
  );
};
