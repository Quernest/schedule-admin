import localeConstants from '../constants/locale.constants';

const setLocale = (lang) => {
  localStorage.setItem('lang', lang);

  return { type: localeConstants.SET_LOCALE, lang };
};

const localeActions = {
  setLocale,
};

export default localeActions;
