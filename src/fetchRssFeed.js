import axios from 'axios';

const ALL_ORIGINS_URL = 'https://api.allorigins.win/get?url=';

const fetchRssFeed = async (rssUrl) => {
  try {
    const response = await axios.get(
      `${ALL_ORIGINS_URL}${encodeURIComponent(rssUrl)}`
    );
    const xml = response.data.contents;

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'application/xml');

    const title = xmlDoc.querySelector('channel > title')?.textContent;
    const description = xmlDoc.querySelector(
      'channel > description'
    )?.textContent;

    const items = Array.from(xmlDoc.querySelectorAll('channel > item')).map(
      (item) => {
        return {
          id:
            item.querySelector('guid')?.textContent ||
            item.querySelector('link')?.textContent,
          title: item.querySelector('title')?.textContent,
          link: item.querySelector('link')?.textContent,
        };
      }
    );

    return { title, description, items };
  } catch (error) {
    throw new Error('Ошибка при загрузке RSS-потока');
  }
};

export default fetchRssFeed;
