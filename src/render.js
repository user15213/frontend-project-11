const buildElement = (tagName, options = {}) => {
  const element = document.createElement(tagName);
  const { style, textContent } = options;

  if (style) {
    // Если style передан как строка, оборачиваем в массив
    Array.isArray(style)
      ? element.classList.add(...style)
      : element.classList.add(style);
  }

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
};

const buildContainer = (title, listElems) => {
  const cardBorder = buildElement('div', { style: ['card', 'border-0'] });
  // Обратите внимание, что 'card-body' передаётся как строка, но buildElement корректно это обработает
  const cardBody = buildElement('div', { style: 'card-body' });
  const cardTitle = buildElement('h2', {
    style: ['card-title', 'h4'],
    textContent: title,
  });
  const list = buildElement('ul', {
    style: ['list-group', 'border-0', 'rounded-0'],
  });

  list.append(...listElems);
  cardBody.append(cardTitle);
  cardBorder.append(cardBody, list);

  return cardBorder;
};

const handleFormState = ({ submit, input }, formState, i18nInstance) => {
  switch (formState) {
    case 'filling':
      submit.disabled = false;
      submit.textContent = i18nInstance.t('form.submit');
      input.focus();
      break;

    case 'sending':
      submit.disabled = true;
      submit.textContent = i18nInstance.t('form.loading');
      break;

    default:
      throw new Error(`Unexpected form state: ${formState}`);
  }
};

const handleErrors = ({ input, feedback }, error, i18nInstance) => {
  feedback.classList.remove('text-success');
  feedback.classList.add('text-danger');

  if (error === '') {
    input.classList.remove('is-invalid');
    feedback.textContent = '';
    return;
  }

  input.classList.add('is-invalid');
  feedback.textContent = i18nInstance.t(`errors.${error}`);
  input.focus();
};

const handleFeeds = (container, feeds, i18nInstance) => {
  const listElems = feeds.map(({ title, description }) => {
    const listElem = buildElement('li', {
      style: ['list-group-item', 'border-0', 'border-end-0'],
    });
    const titleElem = buildElement('h3', {
      style: ['h6', 'm-0'],
      textContent: title,
    });
    const descriptionElem = buildElement('p', {
      style: ['m-0', 'small', 'text-black-50'],
      textContent: description,
    });
    listElem.append(titleElem, descriptionElem);
    return listElem;
  });

  const containerTitle = i18nInstance.t('feeds');
  const feedsContainer = buildContainer(containerTitle, listElems);
  container.replaceChildren(feedsContainer);
};

const handlePosts = (container, posts, seenIds, i18nInstance) => {
  const listElems = posts.map(({ id, title, link }) => {
    const listElem = buildElement('li', {
      style: [
        'list-group-item',
        'd-flex',
        'justify-content-between',
        'align-items-baseline',
        'border-end-0',
      ],
    });

    const linkElem = buildElement('a', {
      style: seenIds.has(id) ? ['fw-normal'] : ['fw-bold'],
      textContent: title,
    });
    linkElem.href = link;
    linkElem.target = '_blank';
    linkElem.rel = 'noopener noreferrer';
    linkElem.setAttribute('data-id', id);

    const button = buildElement('button', {
      style: ['btn', 'btn-outline-primary', 'btn-sm'],
      textContent: i18nInstance.t('preview'),
    });
    button.type = 'button';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.setAttribute('data-id', id);

    listElem.append(linkElem, button);
    return listElem;
  });

  const containerTitle = i18nInstance.t('posts');
  const postsContainer = buildContainer(containerTitle, listElems);
  container.replaceChildren(postsContainer);
};

export default (elements, state, i18nInstance) => {
  // Деструктурируем объект elements в локальные переменные, чтобы не модифицировать параметр напрямую
  const { input, submit, feedback, feeds, posts, modal } = elements;

  return (path, value) => {
    switch (path) {
      case 'form.url':
        input.value = value;
        break;

      case 'form.state':
        handleFormState({ submit, input }, value, i18nInstance);
        break;

      case 'form.error':
        handleErrors({ input, feedback }, value, i18nInstance);
        break;

      case 'feeds':
        feedback.classList.remove('text-danger');
        feedback.classList.add('text-success');
        feedback.textContent = i18nInstance.t('success');
        handleFeeds(feeds, value, i18nInstance);
        break;

      case 'posts':
        handlePosts(posts, value, state.seenIds, i18nInstance);
        break;

      case 'seenIds':
        handlePosts(posts, state.posts, state.seenIds, i18nInstance);
        break;

      case 'modal':
        modal.title.textContent = value.title;
        modal.body.textContent = value.description;
        modal.showFull.href = value.link;
        break;

      default:
        throw new Error(`Unexpected state: ${path}`);
    }
  };
};
