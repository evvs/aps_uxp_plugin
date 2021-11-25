import React from "react";
import ActionButton from "../ActionButton";

import "./styles.css";

export default ({ state }) => {
  return (
    <div className="actionbuttons">
      {state.data.length > 0 ? (
        state.data.map(({ id, name, description, color, standartActions, expandedActions }) => (
          <ActionButton
            key={id}
            name={name}
            description={description}
            color={color}
            standartActions={standartActions}
            expandedActions={expandedActions}
            fontSize={state.ui.fontSize}
            isExpanded = {state.modes.expanded}
            isDoubleClick = {state.modes.doubleClick}
          />
        ))
      )
      : (
        <h1>No buttons to load</h1>
      )}
    </div>
  );
};
