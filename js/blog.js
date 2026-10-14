const filters = document.querySelector('.blog-filters');
if (filters) {
  const cards = [...document.querySelectorAll('.blog-grid .blog-card')];
  const count = document.querySelector('.blog-count');
  const buttons = [...filters.querySelectorAll('button')];
  filters.hidden = false;
  const select = (button) => {
    const category = button.dataset.category;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let visible = 0;
    cards.forEach(card => {
      card.hidden = Boolean(category) && !JSON.parse(card.dataset.categories).includes(category);
      if (!card.hidden) visible += 1;
    });
    count.textContent = `${visible} ${visible === 1 ? 'article' : 'articles'}`;
  };
  buttons.forEach(button => button.addEventListener('click', () => select(button)));
  select(buttons[0]);
}
