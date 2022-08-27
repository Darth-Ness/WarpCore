const { app, BrowserWindow, BrowserView } = require('electron');
const path = require('path');
var mainWindow;
const { VM } = require('vm2');
var dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share");
dataDirectory = path.join(process.env.HOME, "/.warpcore");
var addons = [];
const fs = require('fs');

try {
  var fileLocations = fs.readdirSync(path.join(dataDirectory, "addons"));
  for (var i in fileLocations) {
    var fileLocation = path.join(dataDirectory, "addons", fileLocations[i]);
    if (fs.existsSync(fileLocation)) {
      addons.push(fs.readFileSync(fileLocation).toString());
    }
  }
} catch (e) {}

const initializeExtensionContext = (code) => {
  var vm = new VM();
  vm.sandbox.openTab = (url) => {
    mainWindow.webContents.executeJavaScript('openTab("' + url + '");');
  }
  vm.run(code);
}

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { webviewTag: true },
    autoHideMenuBar: true
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html')).then(() => {
    //initializeExtensionContext("for (var i = 0; i < 10; i++) { openTab('https://google.com/') }");
    for (var i in addons) {
      initializeExtensionContext(addons[i]);
    }
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
