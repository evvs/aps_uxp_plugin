import React from "react";

import "./styles.css";
import { PanelController } from "./controllers/PanelController.jsx";
import { CommandController } from "./controllers/CommandController.jsx";
import { About } from "./components/About.jsx";
import { AllActionsPanel } from "./panels/AllActionsPanel/AllActionsPanel.jsx";
import runOption from "./utils/runOption";
import { entrypoints, shell, storage } from "uxp";

const aboutController = new CommandController(({ dialog }) => <About dialog={dialog} />, {
  id: "showAbout",
  title: "React Starter Plugin Demo",
  size: { width: 480, height: 480 },
});

const allActionsController = new PanelController(() => <AllActionsPanel />, {
  id: "apsretouch",
  menuItems: [
    {
      id: "catalog0",
      label: "папка: APs CATALOG",
      enabled: true,
      checked: false,
      oninvoke: () => runOption("show_APsCatFld();"),
    },
    {
      id: "panel0",
      label: "папка: APs Панель(CEP)",
      enabled: true,
      checked: false,
      oninvoke: () => runOption("show_APsPanelFld();"),
    },
    {
      id: "panel1",
      label: "папка: APs Панель(UXP)",
      enabled: true,
      checked: false,
      oninvoke: async () => {
        const fs = storage.localFileSystem;
        const pluginFolder = await fs.getPluginFolder();
        shell.openExternal(`file:///${pluginFolder.nativePath}`);
      },
    },
    {
      id: "scripts0",
      label: "папка: APs Скрипты",
      enabled: true,
      checked: false,
      oninvoke: () => runOption("show_APsScripts();"),
    },
    {
      id: "operations0",
      label: "APs Операции",
      enabled: true,
      checked: false,
      oninvoke: () => runOption("show_APsActions();"),
    },
    {
      id: "workspaces0",
      label: "APs Рабочие среды",
      enabled: true,
      checked: false,
      oninvoke: () => runOption("show_APsWorkspaces();"),
    },
    {
      id: "spacer1",
      label: "-",
    },
    {
      id: "helphow0",
      label: "помощь: Как установить",
      enabled: true,
      checked: false,
      oninvoke: () => {},
    },
    {
      id: "helplicense0",
      label: "помощь: Лицензия и активация",
      enabled: true,
      checked: false,
      oninvoke: () => {},
    },
    {
      id: "helpuxp0",
      label: "помощь: Панель UXP",
      enabled: true,
      checked: false,
      oninvoke: () => {},
    },
    {
      id: "helppresets0",
      label: "помощь: APs пересеты",
      enabled: true,
      checked: false,
      oninvoke: () => {},
    },
    {
      id: "helppanels0",
      label: "помощь: APs под-панели",
      enabled: true,
      checked: false,
      oninvoke: () => {},
    },
    {
      id: "helptips0",
      label: "помощь: APs подсказки",
      enabled: true,
      checked: false,
      oninvoke: () => {},
    },
    {
      id: "helphotkeys0",
      label: "помощь: Горячие клавиши",
      enabled: true,
      checked: false,
      oninvoke: () => {},
    },
    {
      id: "helpeducation0",
      label: "помощь: Обучение",
      enabled: true,
      checked: false,
      oninvoke: () => {},
    },
    {
      id: "spacer2",
      label: "-",
    },
    {
      id: "maintenance0",
      label: "Тех обслуживание",
      enabled: true,
      checked: false,
      oninvoke: () => runOption("callMaintenance();"),
    },
    {
      id: "reload0",
      label: "Перезапустить панель",
      enabled: true,
      checked: false,
      oninvoke: () => location.reload(),
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
