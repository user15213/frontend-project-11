import i18next from 'i18next';

i18next.init({
  lng: 'ru', // Задаем язык по умолчанию
  resources: {
    ru: {
      translation: {
        'rss-form': {
          'url-error': 'Ссылка должна быть валидным URL',
          'duplicate-url': 'Этот RSS-фид уже добавлен',
          'fetch-error': 'Ошибка при загрузке RSS-потока',
        },
      },
    },
  },
});

export default i18next;
