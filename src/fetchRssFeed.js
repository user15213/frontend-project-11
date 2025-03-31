export function fetchRssFeed() {
  const feedUrls = ['https://example.com/rss']; // Список RSS фидов
  const posts = [];

  feedUrls.forEach((url) => {
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const items = xmlDoc.querySelectorAll('item');

        items.forEach((item) => {
          posts.push({
            title: item.querySelector('title').textContent,
            description: item.querySelector('description').textContent,
            link: item.querySelector('link').textContent,
            isRead: false, // Новые посты не прочитаны
          });
        });

        renderPostList(posts);
      })
      .catch((error) => console.error('Ошибка загрузки фида', error));
  });
}
