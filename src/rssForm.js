import { validateUrl } from './schema';
import fetchRssFeed from './fetchRssFeed'; // Импорт функции для получения RSS-фидов
import i18next from './i18n'; // Для локализации сообщений об ошибках

export function rssForm() {
  const rssFormElement = document.getElementById('rss-form');
  const rssUrlInput = document.getElementById('url-input');
  const feedList = document.getElementById('feed-list');
  const feedbackMessage = document.querySelector('.feedback');

  rssFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const rssUrl = rssUrlInput.value.trim();

    validateUrl(rssUrl)
      .then(() => {
        const existingUrls = Array.from(
          feedList.querySelectorAll('.feed-item')
        ).map((item) => item.dataset.url);
        if (existingUrls.includes(rssUrl)) {
          alert(i18next.t('rss-form.duplicate-url')); // Локализованное сообщение о дублировании
          return;
        }

        // Загружаем фид
        fetchRssFeed(rssUrl)
          .then(({ title, description, items }) => {
            const feedItem = document.createElement('li');
            feedItem.classList.add('feed-item');
            feedItem.dataset.url = rssUrl;

            const feedTitle = document.createElement('h5');
            feedTitle.textContent = title;
            feedItem.appendChild(feedTitle);

            const feedDescription = document.createElement('p');
            feedDescription.textContent = description;
            feedItem.appendChild(feedDescription);

            // Добавляем посты для фида
            const postsList = document.createElement('ul');
            items.forEach((item) => {
              const postItem = document.createElement('li');
              const postLink = document.createElement('a');
              postLink.href = item.link;
              postLink.target = '_blank';
              postLink.textContent = item.title;

              postItem.appendChild(postLink);
              postsList.appendChild(postItem);
            });

            feedItem.appendChild(postsList);
            feedList.appendChild(feedItem);

            // Очищаем форму и скрываем сообщение об ошибке
            rssUrlInput.value = '';
            feedbackMessage.classList.add('sr-only');
            rssUrlInput.classList.remove('is-invalid');
            rssUrlInput.focus();
          })
          .catch((error) => {
            feedbackMessage.classList.remove('sr-only');
            feedbackMessage.textContent = i18next.t('rss-form.fetch-error'); // Локализованное сообщение об ошибке
            rssUrlInput.classList.add('is-invalid');
          });
      })
      .catch((error) => {
        feedbackMessage.classList.remove('sr-only');
        feedbackMessage.textContent = i18next.t('rss-form.url-error'); // Локализованное сообщение о некорректном URL
        rssUrlInput.classList.add('is-invalid');
      });
  });

  rssUrlInput.addEventListener('input', () => {
    const rssUrl = rssUrlInput.value.trim();
    if (rssUrl) {
      feedbackMessage.classList.add('sr-only');
      rssUrlInput.classList.remove('is-invalid');
    }
  });
}
