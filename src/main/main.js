import { app, BrowserWindow, ipcMain, session, dialog } from 'electron';
import http from 'http';
import setup from './proxy';
import { join } from 'path';
import { initDb, db, redirectMap, updateRedirectMap } from './store'
console.clear();
console.log('#####################################################');
initDb(() => {
  let proxyServer = setup(http.createServer(), {});
  proxyServer.listen(3128, function () {
    let port = proxyServer.address().port;
    console.log('HTTP(s) proxy server listening on port %d', port);
  });
  app.whenReady().then(async () => {
    createWindow();
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': ['script-src \'self\'']
        }
      })
    })

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });
});


function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });
  mainWindow.setMenu(null);
  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  }
  else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  }
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

ipcMain.handle('getStore', async (event, someArgument) => {
  return db.getData("/appState");
})

ipcMain.handle('updateStore', async (event, updatedGroup) => {
  db.push("/appState", updatedGroup);
})

ipcMain.handle('delete', async (event, deletePath) => {
  let options = {
    buttons: ["Yes", "No", "Cancel"],
    message: `Do you really want to delete ${deletePath}?`
  }
  return dialog.showMessageBox(options)
})

ipcMain.handle('updateRedirectMap', async (event, newRedirectMap) => {
  updateRedirectMap(newRedirectMap);
})