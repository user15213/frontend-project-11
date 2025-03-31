// rssForm.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import rssSchema from './schema'; // Импортируем схему валидации

document.addEventListener('DOMContentLoaded', () => {
  const rssForm = document.getElementById('rss-form');
  const rssUrlInput = document.getElementById('rss-url');
  const feedList = document.getElementById('feed-list');
  const feedbackMessage = document.querySelector('.feedback'); // Элемент для вывода ошибки

  // Данный объект будет хранить фиды
  const feeds = [];

  // Обработчик для отправки формы
  rssForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Предотвратить отправку формы

    const rssUrl = rssUrlInput.value.trim();

    // Валидация URL с использованием yup
    rssSchema
      .validate({ url: rssUrl, feeds })
      .then(() => {
        // Валидация прошла успешно, добавляем новый RSS фид
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = rssUrl;
        link.target = '_blank'; // Открытие ссылки в новой вкладке
        link.textContent = rssUrl;

        listItem.appendChild(link);
        feedList.appendChild(listItem);

        // Добавляем фид в список
        feeds.push({ url: rssUrl });

        // Очистка поля ввода после добавления URL
        rssUrlInput.value = '';
        feedbackMessage.classList.add('sr-only'); // Скрыть сообщение об ошибке
        rssUrlInput.classList.remove('is-invalid'); // Удалить подсветку поля после добавления
      })
      .catch((err) => {
        // Валидация не прошла, показываем ошибку
        rssUrlInput.classList.add('is-invalid'); // Подсветить поле как неверное
        feedbackMessage.classList.remove('sr-only'); // Показать сообщение об ошибке
        feedbackMessage.textContent = err.message; // Установить текст ошибки
      });
  });

  // Скрыть ошибку при изменении поля ввода
  rssUrlInput.addEventListener('input', () => {
    const rssUrl = rssUrlInput.value.trim();

    // Если URL правильный, скрыть ошибку
    if (/^(https?:\/\/[^\s$.?#].[^\s]*)$/i.test(rssUrl)) {
      feedbackMessage.classList.add('sr-only'); // Скрыть ошибку
      rssUrlInput.classList.remove('is-invalid'); // Убираем красную рамку
    } else {
      feedbackMessage.classList.remove('sr-only'); // Показать ошибку
      rssUrlInput.classList.add('is-invalid'); // Добавить красную рамку
    }
  });
});
