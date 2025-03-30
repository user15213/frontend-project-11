import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
document.addEventListener('DOMContentLoaded', () => {
  const rssForm = document.getElementById('rss-form');
  const rssUrlInput = document.getElementById('rss-url');
  const feedList = document.getElementById('feed-list');

  // Обработчик для отправки формы
  rssForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Предотвратить отправку формы

    const rssUrl = rssUrlInput.value.trim();

    if (rssUrl) {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = rssUrl;
      link.target = '_blank'; // Открытие ссылки в новой вкладке
      link.textContent = rssUrl;

      listItem.appendChild(link);
      feedList.appendChild(listItem);

      // Очистка поля ввода после добавления URL
      rssUrlInput.value = '';
    }
  });
});
