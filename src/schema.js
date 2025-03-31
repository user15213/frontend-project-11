import * as yup from 'yup';

export function validateRSS(url) {
  const schema = yup.string().url().required();
  return schema.validate(url);
}
