import React from "react";
import ActionButton from "../ActionButton";

import "./styles.css"

export default ({ buttons }) => {
  return (
    <div className="actionbuttons">
      {buttons.length > 0 ?
        buttons.map(({ id, name, description, color, standardActions, expandedEctions }) => (
          <ActionButton
            key={id}
            name={name}
            description={description}
            color={color}
            standartActions={standardActions}
            expandedEctions={expandedEctions}
          />
        )) :
        <h1>No buttons to load</h1>
        }
    </div>
  );
};
