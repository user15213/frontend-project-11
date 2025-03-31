import './styles.scss';
import { fetchRssFeed } from './fetchRssFeed'; // Импорт функции для загрузки RSS
import i18next from './i18n';

document.addEventListener('DOMContentLoaded', () => {
  i18next.changeLanguage('ru');
  fetchRssFeed(); // Начнем загружать фиды
});

export function renderPostList(posts) {
  const postsContainer = document.querySelector('.posts');
  postsContainer.innerHTML = ''; // Очищаем контейнер

  posts.forEach((post) => {
    const postItem = document.createElement('div');
    postItem.classList.add('post-item');
    postItem.classList.add(post.isRead ? 'fw-normal' : 'fw-bold'); // Меняем стиль, если пост прочитан

    const postLink = document.createElement('a');
    postLink.href = post.link;
    postLink.textContent = post.title;

    const previewButton = document.createElement('button');
    previewButton.textContent = 'Предпросмотр';
    previewButton.classList.add('btn', 'btn-sm', 'btn-secondary');
    previewButton.addEventListener('click', () => showPreview(post));

    postItem.appendChild(postLink);
    postItem.appendChild(previewButton);
    postsContainer.appendChild(postItem);
  });
}

export function showPreview(post) {
  const modalTitle = document.querySelector('#postModalLabel');
  const modalBody = document.querySelector('.modal-body');

  modalTitle.textContent = post.title;
  modalBody.textContent = post.description;

  // Помечаем пост как прочитанный
  post.isRead = true;
  renderPostList(posts); // Перерисовываем посты с обновленным состоянием

  const myModal = new bootstrap.Modal(document.getElementById('postModal'));
  myModal.show();
}
