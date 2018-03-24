import localeConstants from '../constants/locale.constants';

const lang = localStorage.getItem('lang');
const initialState = { lang } || {};

const locale = (state = initialState, action) => {
  switch (action.type) {
    case localeConstants.SET_LOCALE:
      return {
        lang: action.lang,
      };
    default:
      return state;
  }
};

export default locale;
