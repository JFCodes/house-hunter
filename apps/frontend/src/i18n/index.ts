import { createI18n } from 'vue-i18n'

import en from './locales/en'

export const i18n = createI18n({
  globalInjection: true,
  fallbackLocale: 'en',
  legacy: false,
  locale: 'en',

  messages: { en },
})
