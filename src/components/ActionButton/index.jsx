import React from "react";
import "./styles.css"

export default ({ name, description, color, standartActions, expandedEctions }) => {
  return (
      <sp-action-button variant="primary" title={description} class="action-btn">{name}</sp-action-button>
  );
};
