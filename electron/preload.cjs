const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronPals', {
  pin: (pinned) => ipcRenderer.send('set-pinned', Boolean(pinned)),
})