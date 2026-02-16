const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  const button = dropdown.querySelector('.dropdown-button');
  const content = dropdown.querySelector('.dropdown-content');

  button.addEventListener('click', (e) => {
    e.stopPropagation(); // чтобы клик не закрыл сразу
    // Закрываем все остальные дропдауны
    dropdowns.forEach(d => {
      if (d !== dropdown) {
        d.querySelector('.dropdown-content').classList.remove('active');
      }
    });
    // Переключаем текущий
    content.classList.toggle('active');
  });

  // Клик по элементу внутри дропдауна
  const items = content.querySelectorAll('.schedule-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      button.textContent = item.dataset.sport;
      content.classList.remove('active');
    });
  });
});

// Закрытие всех дропдаунов при клике вне
document.addEventListener('click', () => {
  dropdowns.forEach(d => {
    d.querySelector('.dropdown-content').classList.remove('active');
  });
});
