import React from "react";

import "./styles.css";
import { PanelController } from "./controllers/PanelController.jsx";
import { CommandController } from "./controllers/CommandController.jsx";
import { About } from "./components/About.jsx";
import { AllActionsPanel } from "./panels/AllActionsPanel/AllActionsPanel.jsx";


import { entrypoints } from "uxp";

//fetch('./uisettings.txt').then((response) => {
//  return response.text();
//})
//.then((data) => {
//  console.log(data);
//})

const aboutController = new CommandController(
  ({ dialog }) => <About dialog={dialog} />,
  {
    id: "showAbout",
    title: "React Starter Plugin Demo",
    size: { width: 480, height: 480 },
  }
);

const allActionsController = new PanelController(() => <AllActionsPanel />, {
  id: "apsretouch",
  menuItems: [
    {
      id: "reload0",
      label: "Перезапустить плагин",
      enabled: true,
      checked: false,
      oninvoke: () => location.reload(),
    },
    {
      id: "dialog0",
      label: "About this Plugin",
      enabled: true,
      checked: false,
      oninvoke: () => aboutController.run(),
    },
  ],
})


entrypoints.setup({
  plugin: {
    create(plugin) {
      /*optional */ console.log("created");
    },
    destroy() {
      /*optional */ console.log("destroyed");
    },
  },
  commands: {
    showAbout: aboutController
  },
  panels: {
    apsretouch: allActionsController
  },
});
