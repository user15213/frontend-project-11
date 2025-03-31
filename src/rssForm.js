import { validateUrl } from './schema';
import fetchRssFeed from './fetchRssFeed';
import i18next from './i18n';

let feeds = []; // Массив для хранения информации о фидах и их последних постах

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
        const existingUrls = feeds.map((feed) => feed.url);
        if (existingUrls.includes(rssUrl)) {
          alert(i18next.t('rss-form.duplicate-url'));
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

            // Добавляем фид в массив
            feeds.push({
              url: rssUrl,
              lastPostId: items.length > 0 ? items[0].id : null, // Храним ID последнего поста
            });

            // Очищаем форму и скрываем сообщение об ошибке
            rssUrlInput.value = '';
            feedbackMessage.classList.add('sr-only');
            rssUrlInput.classList.remove('is-invalid');
            rssUrlInput.focus();
          })
          .catch((error) => {
            feedbackMessage.classList.remove('sr-only');
            feedbackMessage.textContent = i18next.t('rss-form.fetch-error');
            rssUrlInput.classList.add('is-invalid');
          });
      })
      .catch((error) => {
        feedbackMessage.classList.remove('sr-only');
        feedbackMessage.textContent = i18next.t('rss-form.url-error');
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

  // Рекурсивная функция для проверки новых постов каждые 5 секунд
  const checkForNewPosts = () => {
    feeds.forEach((feed, index) => {
      fetchRssFeed(feed.url)
        .then(({ items }) => {
          const newItems = items.filter((item) => item.id !== feed.lastPostId); // Фильтруем новые посты
          if (newItems.length > 0) {
            newItems.forEach((newItem) => {
              const postItem = document.createElement('li');
              const postLink = document.createElement('a');
              postLink.href = newItem.link;
              postLink.target = '_blank';
              postLink.textContent = newItem.title;

              postItem.appendChild(postLink);
              feedList
                .querySelector(`[data-url="${feed.url}"] ul`)
                .appendChild(postItem);
            });

            // Обновляем информацию о последнем посте
            feeds[index].lastPostId = newItems[0].id;
          }
        })
        .catch((error) => {
          console.error(
            `Ошибка при проверке обновлений для ${feed.url}: ${error.message}`
          );
        });
    });

    // После выполнения проверок, запускаем повторно с задержкой
    setTimeout(checkForNewPosts, 5000);
  };

  // Запускаем функцию проверки обновлений
  checkForNewPosts();
}
