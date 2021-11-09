import React from "react";
import "./styles.css";

import runAction from "../../utils/runAction";
import runScript from "../../utils/runScript";

export default ({ name, description, color, standartActions, expandedEctions }) => {
  return (
    <sp-action-button
      title={description}
      class="action-btn"
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
