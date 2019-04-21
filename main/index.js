const path = require('path')
const { app, BrowserWindow } = require('electron')

global.spot = require('./spot')
/*
global.spot = {
  test: 'hello world'
}
*/

function createWindow () {
  const preloadPath = path.join(__dirname, 'preload.js')
  let win = new BrowserWindow({ 
    width: 800, 
    height: 600,
    webPreferences: {
      preload: preloadPath,
      nodeIntegration: true,
      webSecurity: false,
      webviewTag: true,
    }
  })

  // and load the index.html of the app.
  win.loadURL('http://localhost:3000')
}

app.on('ready', createWindow)