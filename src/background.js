"use strict";

import { app, protocol, Menu, BrowserWindow, ipcMain, dialog } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";
const {PosPrinter} = require("electron-pos-printer");
let win;
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    minWidth: 1200,
    minHeight: 760,
		frame: false,
		autoHideMenuBar: true,
    icon: "./src/assets/logo.png",
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
    },
  });
  win.maximize();
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    // if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
}
ipcMain.on("close", () => {
  app.quit();
});

ipcMain.on("sign-error", () => {
  dialog.showMessageBox({
    message: "Wrong UserName or password,please try again!",
    type: "error",
  });
});


//minimize the app
ipcMain.on("minimize", () => {
	win.minimize();
})

//maximize the app
ipcMain.on("maximize", () => {
	if (win.isMaximized()) {
		win.unmaximize();
	} else {
		win.maximize();
	}
})

ipcMain.on("load-receipt", (load) => {
	let receiptPage = new BrowserWindow({
		show: true,
		width: 400,
		height: 500,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: true,
			plugins: true
		}
	})

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		receiptPage.loadURL(process.env.WEBPACK_DEV_SERVER_URL + "receipt.html")
	} else {
		receipt_page.loadURL(`app://./receipt_page`)
	}

	receiptPage.on("closed" , () => {
		receiptPage = null;
	})
})

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
  const template = [
    {
      label: "demo",
      submenu: [
        { role: "reload" },
        { role: "toggledevtools" },
        { role: "quit" },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
