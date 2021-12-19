import React from "react";

import "./styles.css";
import { PanelController } from "./controllers/PanelController.jsx";
import { CommandController } from "./controllers/CommandController.jsx";
import { About } from "./components/About.jsx";
import { AllActionsPanel } from "./panels/AllActionsPanel/AllActionsPanel.jsx";
import runOption from "./utils/runOption";

import { entrypoints } from "uxp";

const aboutController = new CommandController(({ dialog }) => <About dialog={dialog} />, {
  id: "showAbout",
  title: "React Starter Plugin Demo",
  size: { width: 480, height: 480 },
});

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
      id: "catalog0",
      label: "APs CATALOG",
      enabled: true,
      checked: false,
      oninvoke: () => runOption("show_APsCatFld();"),
    },
    {
      id: "panel0",
      label: "APs Панель",
      enabled: true,
      checked: false,
      oninvoke: () => runOption("show_APsPanelFld();"),
    },
    {
      id: "scripts0",
      label: "APs Скрипты",
      enabled: true,
      checked: false,
      oninvoke: () => runOption("show_APsScripts();"),
    },
    {
      id: "operations0",
      label: "APs Операции",
      enabled: true,
      checked: false,
      oninvoke: () =>  runOption("show_APsActions();"),
    },
    {
      id: "workspaces0",
      label: "APs Рабочие среды",
      enabled: true,
      checked: false,
      oninvoke: () => runOption("show_APsWorkspaces();"),
    },
    {
      id: "maintenance0",
      label: "Тех обслуживание",
      enabled: true,
      checked: false,
      oninvoke: () => runOption("callMaintenance();"),
    },
  ],
});

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
    showAbout: aboutController,
  },
  panels: {
    apsretouch: allActionsController,
  },
});
