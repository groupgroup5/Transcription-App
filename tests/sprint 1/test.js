const { _electron: electron } = require('playwright');

(async () => {
  // Launch Electron app.
  const electronApp = await electron.launch({ args: ['../main.js'] });

  // Evaluation expression in the Electron context.
  const appPath = await electronApp.evaluate(async ({ app }) => {
    // This runs in the main Electron process, parameter here is always
    // the result of the require('electron') in the main app script.
    return app.getAppPath();
  });
  console.log(appPath);

  // Get the first window that the app opens, wait if necessary.
  const window = await electronApp.firstWindow();
  // Print the title.
  console.log(await window.title());
  // Capture a screenshot.
  await window.screenshot({ path: 'testss/starting screen.png' });
  // Direct Electron console to Node terminal.
  window.on('console', console.log);
  // Click button.
  await window.click('text=Start');
  await window.screenshot({ path: 'testss/main screen.png' });

  await window.click('text=Enter File 1');
  await window.screenshot({ path: 'testss/light mode editor.png' });

  await window.click('text=Go Back');
  await window.click('text=Enter File 2');
  await window.screenshot({ path: 'testss/dark mode editor.png' });

  await window.click('text=Go Back');
  await window.click('text=Go Back');
  await window.screenshot({ path: 'testss/test end.png' });
  // Exit app.
  await electronApp.close();
})();
