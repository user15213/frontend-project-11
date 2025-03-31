import * as yup from 'yup';

// Функция для валидации URL
const urlValidator = (url) => {
  const regex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
  return regex.test(url);
};

// Схема валидации для формы
export const validationSchema = (state) => yup.object({
  url: yup.string()
    .test('is-valid-url', 'Ссылка должна быть валидным URL', (value) => urlValidator(value))
    .notOneOf(state.feeds.map(feed => feed.url), 'Этот RSS-фид уже добавлен')
    .required('Это обязательное поле'),
});
