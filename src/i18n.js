import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';

i18next
  .use(LanguageDetector)
  .use(XHR)
  .init({
    fallbackLng: 'ru', // Язык по умолчанию
    debug: true,
    interpolation: {
      escapeValue: false, // React уже заботится об экранировании
    },
    resources: {
      en: {
        translation: {
          "rss-form": {
            "url-placeholder": "RSS feed URL",
            "add-feed": "Add feed",
            "url-error": "URL must be valid",
            "url-required": "URL is required",
            "duplicate-error": "This RSS feed is already added",
            "example-url": "Example: https://lorem-rss.hexlet.app/feed",
          },
        },
      },
      ru: {
        translation: {
          "rss-form": {
            "url-placeholder": "Ссылка RSS",
            "add-feed": "Добавить фид",
            "url-error": "Ссылка должна быть валидным URL",
            "url-required": "Ссылка обязательна",
            "duplicate-error": "Этот RSS-фид уже добавлен",
            "example-url": "Пример: https://lorem-rss.hexlet.app/feed",
          },
        },
      },
    },
  });

export default i18next;
