import i18next from 'i18next';

i18next.init({
  lng: 'ru',
  resources: {
    ru: {
      translation: {
        rss_added: 'RSS успешно добавлен',
        rss_exists: 'RSS уже существует',
        empty_field: 'Не должно быть пустым',
        invalid_url: 'Ссылка должна быть валидным URL',
        invalid_rss: 'Ресурс не содержит валидный RSS',
        network_error: 'Ошибка сети',
        preview: 'Просмотр',
      },
    },
  },
});

export default i18next;
