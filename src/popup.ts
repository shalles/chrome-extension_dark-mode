import type { EnableType } from '@shalles/dark-mode';

function fillZero(num: number) {
  return num < 10 ? `0${num}` : num;
}

function setDarkModeOptions(key: string, value: any) {
  window.localStorage.setItem(`dark-mode-2c9ef1a:${key}`, value);
}
function getDarkModeOptions(key: string) {
  return window.localStorage.getItem(`dark-mode-2c9ef1a:${key}`);
}

function toggleTimeRangeItem(timeRangeElement: HTMLInputElement, flag: boolean) {
  timeRangeElement.style.display = flag ? 'flex' : 'none';
}

function restoreDarkModeOptions({ enableTypeElement, timeRangeElement }: { enableTypeElement: HTMLInputElement, timeRangeElement: HTMLInputElement }) {
  const enableType = getDarkModeOptions('enableType') as EnableType || 'never';
  enableTypeElement.value = enableType;
  if ('time-range' === enableType) {
    toggleTimeRangeItem(timeRangeElement, true);
    try {
      const { begin, end } = JSON.parse(getDarkModeOptions('timeRange') as string);
      const beginEndElement = timeRangeElement.querySelectorAll('[name="timeRange"]') as unknown as HTMLInputElement[];
      if (begin && beginEndElement[0]) {
        beginEndElement[0].value = `${fillZero(begin / 100 | 0)}:${fillZero(begin % 100)}`;
      }
      if (end && beginEndElement[1]) {
        const hour = end / 100 | 0;
        beginEndElement[1].value = `${fillZero(hour > 24 ? hour - 24 : hour)}:${fillZero(end % 100)}`;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

function start() {
  const popupFormElement = document.querySelector('.popup__form--2c9ef1a') as HTMLFormElement;
  const enableTypeElement = popupFormElement.querySelector('.enable-type-selector') as HTMLInputElement;
  const timeRangeElement = popupFormElement.querySelector('.time-range') as HTMLInputElement;

  restoreDarkModeOptions({ enableTypeElement, timeRangeElement });

  enableTypeElement.addEventListener('change', () => {
    const enableType = new FormData(popupFormElement).get('enableType');
    // console.log(enableType);
    if ('time-range' === enableType) {
      toggleTimeRangeItem(timeRangeElement, true);
    } else {
      toggleTimeRangeItem(timeRangeElement, false);
    }
  }, false);

  popupFormElement.addEventListener('submit', async e => {
    e.preventDefault();
    e.stopPropagation();
    const data = new FormData(popupFormElement);
    const enableType = data.get('enableType');
    setDarkModeOptions('enableType', enableType);

    if ('time-range' === enableType) {
      const timeRange = data.getAll('timeRange') as string[];
      const begin = +(timeRange[0]?.replace(':', '') as string);
      const end = +(timeRange[1]?.replace(':', '') as string);

      setDarkModeOptions('timeRange', JSON.stringify({ begin, end }));
      const tab = await chrome.tabs.query({ active: true });
      return chrome.tabs.sendMessage(tab[0]?.id as number, JSON.stringify({
        enableType,
        timeRange: {
          begin,
          end
        }
      }), {}, (res: any) => {
        console.log(res);
        window.close();
      });
    }
    const tab = await chrome.tabs.query({ active: true });
    chrome.tabs.sendMessage(tab[0]?.id as number, JSON.stringify({ enableType }));
    window.close();
  }, false);
}

start();
