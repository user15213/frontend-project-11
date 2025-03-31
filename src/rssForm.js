import { validateUrl } from './schema';
import i18next from './i18n';

export function rssForm() {
  const rssForm = document.getElementById('rss-form');
  const rssUrlInput = document.getElementById('rss-url');
  const feedList = document.getElementById('feed-list');
  const feedbackMessage = document.querySelector('.feedback');

  rssForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const rssUrl = rssUrlInput.value.trim();

    validateUrl(rssUrl)
      .then(() => {
        const existingUrls = Array.from(feedList.querySelectorAll('a')).map(
          (link) => link.href
        );
        if (existingUrls.includes(rssUrl)) {
          alert(i18next.t('rss-form.duplicate-error'));
          return;
        }

        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = rssUrl;
        link.target = '_blank';
        link.textContent = rssUrl;

        listItem.appendChild(link);
        feedList.appendChild(listItem);

        rssUrlInput.value = '';
        feedbackMessage.classList.add('sr-only');
      })
      .catch((error) => {
        feedbackMessage.classList.remove('sr-only');
        feedbackMessage.textContent = error.message;
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
