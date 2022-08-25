const { app, BrowserWindow, BrowserView } = require('electron');
const path = require('path');
const vm = require('vm');
var mainWindow;
const {VM} = require('vm2');

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
    webPreferences:{ webviewTag:true },
    autoHideMenuBar: true
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html')).then(() => {
    //initializeExtensionContext("for (var i = 0; i < 10; i++) { openTab('https://google.com/') }");
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
