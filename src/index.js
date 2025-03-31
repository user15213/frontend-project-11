import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18next from 'i18next';
import { init } from './rssForm';
import { validateRSS } from './schema';
import { fetchRssFeed } from './fetchRssFeed';
import onChange from 'on-change';

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

init();

const state = onChange({}, (path, value) => {
  console.log('State updated', path, value);
});

fetchRssFeed('https://example.com/rss', state);
