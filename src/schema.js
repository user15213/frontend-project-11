import * as yup from 'yup';
import i18next from './i18n';

yup.setLocale({
  string: {
    url: i18next.t('rss-form.url-error'),
    required: i18next.t('rss-form.url-required'),
  },
});

export const validateUrl = (url) => {
  const schema = yup.object().shape({
    url: yup.string().url().required(),
  });

  return schema.validate({ url }, { abortEarly: false });
};
