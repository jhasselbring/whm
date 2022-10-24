import {app, BrowserWindow, ipcMain, session} from 'electron';
import fs from 'fs';
import {join, resolve} from 'path';
import { JsonDB, Config } from 'node-json-db';
const dbDir = resolve(app.getPath('userData') + '/db.json');
let db;
console.log('dbDir', dbDir);
if (fs.existsSync(dbDir)) {
  console.log('DB exists');
  dbReady();
}else{
  console.log('DB does not exist');
fs.writeFile(dbDir, '{}', 'utf-8', () => {
  dbReady();
})
}
function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  }
  else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  }
}
function dbReady(){
 db = new JsonDB(new Config(dbDir, true, false, '/'));
  app.whenReady().then(async () => {
    createWindow();
    var currentLaunchCount 
    try {
      currentLaunchCount = await db.getData("/count");
      console.log('Current launch count', currentLaunchCount);
      await db.push("/count",currentLaunchCount + 1);
    }catch (e){
      await db.push("/count", 1);
      console.log('Current launch count', currentLaunchCount);
      await db.push("/count",currentLaunchCount + 1);
    }

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
  
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

ipcMain.on('message', (event, message) => {
  console.log(message);
});

ipcMain.handle('getLaunchCount', async (event, someArgument) => {
  return db.getData("/count");
})