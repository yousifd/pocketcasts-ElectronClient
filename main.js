const {app, BrowserWindow, globalShortcut} = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    useContentSize: true,
    icon: __dirname + '/logo.png',
    webPreferences: {
      nodeIntegration: false
    }
  })

  win.loadURL('https://play.pocketcasts.com')

  //win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

let angularMediaPlayerSelector = "angular.element(document).injector().get('mediaPlayer')"

function bindKeys() {
  globalShortcut.register('MediaPlayPause', () => {
    win.webContents.executeJavaScript(angularMediaPlayerSelector+".playPause()");
  })

  globalShortcut.register('MediaNextTrack', () => {
    win.webContents.executeJavaScript(angularMediaPlayerSelector+".jumpForward()");
  })

  globalShortcut.register('MediaPreviousTrack', () => {
    win.webContents.executeJavaScript(angularMediaPlayerSelector+".jumpBack()");
  })
}

app.on('ready', () => {
  createWindow()
  bindKeys()
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if(win === null) {
    createWindow();
  }
})
