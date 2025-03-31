import './styles.scss';
import 'bootstrap';
import { rssForm } from './rssForm';
import i18next from './i18n'; // Подключение i18next для локализации

document.addEventListener('DOMContentLoaded', () => {
  i18next.changeLanguage('ru'); // Задание языка, может быть динамически изменено
  rssForm();
});
