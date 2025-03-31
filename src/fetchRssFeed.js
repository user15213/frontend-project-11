import axios from 'axios';
import DOMParser from 'dom-parser';

const parser = new DOMParser();

export function fetchRssFeed(url) {
  return axios
    .get(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
    .then((response) => {
      const xmlDoc = parser.parseFromString(response.data.contents, 'text/xml');
      const items = xmlDoc.getElementsByTagName('item');
      const posts = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        posts.push({
          title: item.getElementsByTagName('title')[0].textContent,
          description: item.getElementsByTagName('description')[0].textContent,
          link: item.getElementsByTagName('link')[0].textContent,
        });
      }
      return posts;
    })
    .catch((err) => {
      throw new Error('Network error');
    });
}
