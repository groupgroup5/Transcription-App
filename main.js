// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, MenuItem, shell } = require("electron");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    resizable: false,
    fullscreen: false,

    titleBarStyle: "hiddenInset",
    webPreferences: {
      nodeIntegration: true
    }
  });

  // load index.html
  mainWindow.loadFile("index.html");

  mainWindow.on("closed", function() {

    mainWindow = null;
  });

  var menu = Menu.buildFromTemplate([
    {
      label: "",
      submenu: [
        {
          label: "Refresh",
          role: "reload",
          accelerator: "Cmd+R"
        },
        {
          label: "About",
          role: "about"
        },

        {
          label: "Quit",
          click() {
            app.quit();
          },
          accelerator: "Cmd+Q"
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        {
          label: "Select All",
          role: "selectall",

          accelerator: "Cmd+A"
        },
        {
          label: "Copy",
          role: "copy",

          accelerator: "Cmd+C"
        },
        {
          label: "Cut",
          role: "cut",

          accelerator: "Cmd+X"
        },
        {
          label: "Paste",
          role: "paste",

          accelerator: "Cmd+V"
        }
      ]
    },
    {
      label: "Help",
      submenu: [
        {
          label: "Docs"
          
        },
        {
          label: "Developer"
          
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);
}

// insert Mr. Incredibles "It's showtime."
app.on("ready", createWindow);

// quit when all windows die
app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() { //AWAKEN
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.