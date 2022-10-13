// chrome.runtime.onInstalled.addListener(() => {
//   start();
// });

chrome.runtime.onMessage.addListener((message: string, sender) => {
  console.log('Dark Mode Background Message: ', message, sender);
  return true;
});

// async function start() {
//   const tab = await chrome.tabs.captureVisibleTab();
//   console.log(tab);
//   return 1;
// }

export default {
  a: 1
};
