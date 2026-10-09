const { app, BrowserWindow, shell, Menu } = require('electron');
const path = require('path');

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

function createWindow() {
  Menu.setApplicationMenu(null);
  const win = new BrowserWindow({
    width: 1220,
    height: 780,
    minWidth: 760,
    minHeight: 560,
    title: 'صوت',
    backgroundColor: '#0d1118',
    icon: path.join(__dirname, 'icon.png'),
    autoHideMenuBar: true
  });
  win.loadFile(path.join(__dirname, 'index.html'));
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
