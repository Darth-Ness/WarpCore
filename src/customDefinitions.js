const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('warpcore', {
    superConsoleLog:(text) => {
        ipcRenderer.sendToHost('debugLog',text)
    }
});