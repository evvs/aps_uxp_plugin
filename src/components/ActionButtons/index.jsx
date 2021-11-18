import React from "react";
import ActionButton from "../ActionButton";

import "./styles.css";

export default ({ state }) => {
  return (
    <div className="actionbuttons">
      {state.data.length > 0 ? (
        state.data.map(({ id, name, description, color, standartActions, expandedEctions }) => (
          <ActionButton
            key={id}
            name={name}
            description={description}
            color={color}
            standartActions={standartActions}
            expandedEctions={expandedEctions}
            fontSize={state.ui.fontSize}
          />
        ))
      ) : (
        <h1>No buttons to load</h1>
      )}
    </div>
  );
};
