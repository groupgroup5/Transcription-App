const { app, BrowserWindow } = require('electron/index');
app.on("ready", createWindows);
require("electron-reload")(__dirname);

function createWindows(){
  const window = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      preload: __dirname + "/preload.js"
    }
  });

  window.webContents.openDevTools();
  window.loadFile(__dirname + "/renderer/index.html");
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})