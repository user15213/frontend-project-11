import * as yup from 'yup';

export const validateUrl = (url) => {
  const schema = yup.object().shape({
    url: yup
      .string()
      .url('Ссылка должна быть валидным URL')
      .required('Ссылка обязательна'),
  });

  return schema.validate({ url }, { abortEarly: false });
};
