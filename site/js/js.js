document.addEventListener('DOMContentLoaded', function() {
    // ========== ПРЕЛОУДЕР ==========
    const preloader = document.querySelector('.preloader');
    const rainContainer = document.getElementById('rainContainer');
    let rainInterval;

    // Функция создания частицы-доллара
    function createDollar() {
        if (!rainContainer) return;

        const dollar = document.createElement('div');
        dollar.className = 'dollar-particle';
        dollar.innerHTML = '$'; // Можно заменить на '💵' или '💰'
        
        // Случайные параметры
        const size = Math.random() * 30 + 15; // от 15 до 45px (увеличил)
        const left = Math.random() * 100; // от 0 до 100%
        const duration = Math.random() * 4 + 3; // от 3 до 7 секунд (медленнее)
        const delay = Math.random() * 3; // задержка до 3 секунд
        
        dollar.style.left = left + '%';
        dollar.style.fontSize = size + 'px';
        dollar.style.animationDuration = duration + 's';
        dollar.style.animationDelay = delay + 's';
        
        rainContainer.appendChild(dollar);
        
        // Удаляем частицу после анимации
        setTimeout(() => {
            if (dollar && dollar.parentNode) {
                dollar.remove();
            }
        }, (duration + delay) * 1000);
    }

    // Запускаем дождь, если прелоудер существует
    if (preloader && rainContainer) {
        // Создаем ОЧЕНЬ МНОГО частиц сразу для густого эффекта
        for (let i = 0; i < 5050; i++) { // Увеличил с 50 до 150
            setTimeout(() => {
                createDollar();
            }, i * 30); // Уменьшил интервал для более быстрого появления
        }
        
        // Продолжаем создавать новые частицы (чаще)
        rainInterval = setInterval(createDollar, 100); // Уменьшил с 200 до 100
        
        // Скрываем прелоудер после загрузки страницы
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.classList.add('hidden');
                clearInterval(rainInterval); // Останавливаем создание новых частиц
            }, 2000); // Увеличил до 2 секунд, чтобы увидеть эффект
        });
    }

    // ... остальной код хедера и бургер-меню без изменений ...
});




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





document.addEventListener('DOMContentLoaded', function() {
    const accItems = document.querySelectorAll('.acc-item');

    accItems.forEach(item => {
        const head = item.querySelector('.acc-head');

        head.addEventListener('click', () => {
            // Закрываем все кроме текущего
            accItems.forEach(other => {
                if (other !== item && other.classList.contains('active')) {
                    other.classList.remove('active');
                    other.querySelector('.acc-content').style.maxHeight = null;
                }
            });

            // Открываем/закрываем текущий
            const isActive = item.classList.contains('active');
            const content = item.querySelector('.acc-content');

            item.classList.toggle('active');

            if (!isActive) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });
});


// Добавьте в ваш файл site/js/js.js
document.addEventListener('DOMContentLoaded', function() {
    // ========== ХЕДЕР (скрытие при скролле) ==========
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    if (header) {
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Скролл вниз
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } 
            // Скролл вверх
            else if (scrollTop < lastScrollTop) {
                header.style.transform = 'translateY(0)';
            }
            
            // Если в самом верху
            if (scrollTop === 0) {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // ========== БУРГЕР-МЕНЮ ==========
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.header__menu');
    const overlay = document.querySelector('.header__overlay');
    const menuLinks = document.querySelectorAll('.header__link');

    function toggleMenu() {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    // Открытие/закрытие по бургеру
    if (burger) {
        burger.addEventListener('click', toggleMenu);
    }

    // Закрытие по оверлею
    if (overlay) {
        overlay.addEventListener('click', toggleMenu);
    }

    // Закрытие при клике на ссылку и плавный скролл
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Закрываем меню
            burger.classList.remove('active');
            menu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Показываем хедер при клике на ссылку
            if (header) {
                header.style.transform = 'translateY(0)';
            }
            
            // Плавный скролл к секции
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Закрытие меню при ресайзе (если стали десктопными)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            if (burger && burger.classList.contains('active')) {
                burger.classList.remove('active');
                menu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        }
    });

    // При загрузке страницы показываем хедер
    if (header) {
        header.style.transition = 'transform 0.3s ease';
    }
});