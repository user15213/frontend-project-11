import { validateRSS } from './schema';
import { fetchRssFeed } from './fetchRssFeed';
import i18next from 'i18next';

export function init() {
  const form = document.querySelector('#rss-form');
  const input = form.querySelector('#rss-url');
  const messageBox = document.querySelector('#message-box');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = input.value;

    validateRSS(url)
      .then(() => {
        fetchRssFeed(url)
          .then(() => {
            messageBox.textContent = i18next.t('rss_added');
            messageBox.classList.add('alert', 'alert-success');
          })
          .catch((err) => {
            messageBox.textContent = i18next.t('network_error');
            messageBox.classList.add('alert', 'alert-danger');
          });
      })
      .catch((err) => {
        messageBox.textContent = i18next.t('invalid_url');
        messageBox.classList.add('alert', 'alert-danger');
      });
  });
}
