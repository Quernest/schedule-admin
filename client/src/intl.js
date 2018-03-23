import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import ruLocaleData from 'react-intl/locale-data/ru';
import ukLocaleData from 'react-intl/locale-data/uk';

addLocaleData(enLocaleData);
addLocaleData(ruLocaleData);
addLocaleData(ukLocaleData);

export const appLocales = ['en', 'uk', 'ru'];

const enTranslationMessages = require('../../translations/en.json');
const ruTranslationMessages = require('../../translations/ru.json');
const ukTranslationMessages = require('../../translations/uk.json');

export const formatTranslationMessages = (messages) => {
  const formattedMessages = {};

  for (const message of messages) {
    formattedMessages[message.id] = message.message;
  }

  return formattedMessages;
};

export const translationMessages = {
  en: formatTranslationMessages(enTranslationMessages),
  uk: formatTranslationMessages(ukTranslationMessages),
  ru: formatTranslationMessages(ruTranslationMessages),
};
