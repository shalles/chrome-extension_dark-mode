import { MultiFrameDarkMode, type EnableType, type TimeRange } from '@shalles/dark-mode';

function getDarkModeOptions(key: string) {
  return window.localStorage.getItem(`dark-mode-2c9ef1a:${key}`);
}
function setDarkModeOptions(key: string, value: any) {
  window.localStorage.setItem(`dark-mode-2c9ef1a:${key}`, value);
}

function start(
  enableType: EnableType = getDarkModeOptions('enableType') as EnableType || 'never',
  timeRange: TimeRange = { begin: 0, end: 0 }
) {
  try {

    const { begin, end } = JSON.parse(getDarkModeOptions('timeRange') || '{}');
    if (!timeRange.begin && begin) {
      timeRange.begin = begin;
    }
    if (!timeRange.end && end) {
      timeRange.end = end > 2400 ? end - 2400 : end;
    }
    setDarkModeOptions('enableType', enableType);
    setDarkModeOptions('timeRange', JSON.stringify(timeRange));
  } catch (e) {
    console.log(e);
  }

  new MultiFrameDarkMode({
    rootElement: document.documentElement,
    enableType,
    timeRange
  });
}

start();

chrome.runtime.onMessage.addListener((message: string) => {
  // console.log('Dark Mode Message: ', message);
  const data: { enableType: EnableType, timeRange: TimeRange } = JSON.parse(message);
  start(data.enableType, data.timeRange);
  window.location.reload();
});
