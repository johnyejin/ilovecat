const STORAGE_KEY = 'user-color-scheme';
const COLOR_MODE_KEY = '--color-mode';

const darkmodeBtn = document.querySelector('.darkmode-btn');

const getCSSCustomProp = propkey => {
  let response = getComputedStyle(document.documentElement).getPropertyValue(propkey);

  if(response.length) {
    response = response.replace(/\'|"/g, '').trim();
  }
  console.log('getCSSCustomProp---response', response)
  return response;
}

const setButtonLabel = currentSetting => {
  darkmodeBtn.textContent = currentSetting === 'dark' ? '🌕' : '🌑';
}

const applySetting = passedSetting => {
  let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);
  console.log('passedSetting', passedSetting);
  console.log('currentSetting', currentSetting);

  if(currentSetting) {
    document.documentElement.setAttribute('data-user-color-scheme', currentSetting);
    setButtonLabel(currentSetting);
  } else {
    setButtonLabel(getCSSCustomProp(COLOR_MODE_KEY));
  }
}

const toggleSetting = () => {
  let currentSetting = localStorage.getItem(STORAGE_KEY);

  switch (currentSetting) {
    case null:
      currentSetting = getCSSCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
      break;
    case 'light':
      currentSetting = 'dark';
      break;
    case 'dark':
      currentSetting = 'light';
      break;
  }

  localStorage.setItem(STORAGE_KEY, currentSetting);
  
  return currentSetting;
}

darkmodeBtn.addEventListener('click', event => {
  event.preventDefault();
  applySetting(toggleSetting());
})

applySetting();