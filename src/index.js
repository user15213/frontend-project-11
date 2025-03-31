import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

document.addEventListener('DOMContentLoaded', () => {
  const rssForm = document.getElementById('rss-form');
  const rssUrlInput = document.getElementById('rss-url');
  const feedList = document.getElementById('feed-list');
  const feedbackMessage = document.querySelector('.feedback'); // Элемент для вывода ошибки

  // Обработчик для отправки формы
  rssForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Предотвратить отправку формы

    const rssUrl = rssUrlInput.value.trim();

    // Валидация URL
    const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    if (!urlPattern.test(rssUrl)) {
      rssUrlInput.classList.add('is-invalid'); // Подсветить поле как неверное
      feedbackMessage.classList.remove('sr-only'); // Показать сообщение об ошибке
      feedbackMessage.textContent = 'Ссылка должна быть валидным URL'; // Установить текст ошибки
      return;
    } else {
      rssUrlInput.classList.remove('is-invalid'); // Удалить класс ошибки, если URL корректный
      feedbackMessage.classList.add('sr-only'); // Скрыть сообщение об ошибке
    }

    // Проверка на дубли
    const existingUrls = Array.from(feedList.querySelectorAll('a')).map(
      (link) => link.href
    );
    if (existingUrls.includes(rssUrl)) {
      alert('Этот RSS-фид уже добавлен');
      return;
    }

    // Создание нового элемента списка
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = rssUrl;
    link.target = '_blank'; // Открытие ссылки в новой вкладке
    link.textContent = rssUrl;

    listItem.appendChild(link);
    feedList.appendChild(listItem);

    // Очистка поля ввода после добавления URL
    rssUrlInput.value = '';
  });
});
