import React from "react";

import "./styles.css";

export default () => {
  return (
    <div className="top-menu">
      <sp-action-button>
        <img src="./icons/help.svg" />
      </sp-action-button>
      <sp-action-button>
        <img src="./icons/beforeAfter.svg" />
      </sp-action-button>
      <sp-action-button>
        <img src="./icons/two_windows_15x16.svg" />
      </sp-action-button>
      <sp-action-button>
        <img src="./icons/snapshot.svg" />
      </sp-action-button>
      <sp-action-button>
        <img src="./icons/raw.svg" />
      </sp-action-button>
      <sp-action-button>
        <img src="./icons/container.svg" />
      </sp-action-button>
      <sp-action-button>
        <img src="./icons/layers.svg" />
      </sp-action-button>
      <sp-action-button>
        <img src="./icons/document.svg" />
      </sp-action-button>
      <sp-action-button>
        <img src="./icons/folders_16x15.svg" />
      </sp-action-button>
      <sp-action-button>
        <img src="./icons/preset.svg" />
      </sp-action-button>
      <sp-action-button>
        <img src="./icons/favorites.svg" />
      </sp-action-button>
      <sp-action-button>
        <img src="./icons/settings.svg" />
      </sp-action-button>
    </div>
  );
};
