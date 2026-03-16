/*гамбургер*/
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav__menu');
const overlay = document.querySelector('.overlay');

function toggleMenu(){
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
}

hamburger.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);

hamburger.addEventListener("mouseenter", function(){
    navMenu.classList.add('active');
    overlay.classList.add('active');
});

navMenu.addEventListener("mouseleave", function(){
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
});

/*фільтрація галереї */

const filterButtons = document.querySelectorAll('.filter-btn');

for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener('click', function() {
        const filterValue = this.getAttribute('data-filter'); 
        const allPhotos = document.querySelectorAll('.photo-item');
        
        for (let j = 0; j < allPhotos.length; j++) {
            const photo = allPhotos[j];
            const photoCategory = photo.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === photoCategory) {
                photo.style.display = 'block'; // показувати
            } else {
                photo.style.display = 'none'; // ховати
            }
        }
    });
}

// для завантаження фото (додала вибір категорії фото))
const fileInput = document.querySelector('.upload-btn input[type="file"]');
const photoGrid = document.querySelector('.photo-grid');
const categorySelect = document.querySelector('#photo-category'); // Наш новий випадаючий список

// Перевіряємо, чи є взагалі на сторінці поле для файлу (щоб не було помилок на інших сторінках)
if (fileInput) {
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0]; // Беремо файл, який вибрав користувач
        
        if (file) {
            const reader = new FileReader(); // Вбудований інструмент браузера для читання файлів
            
            // Що робити, коли файл прочитано:
            reader.onload = function(e) {
                const photoUrl = e.target.result; // Отримуємо картинку у вигляді коду
                const selectedCategory = categorySelect.value; // Беремо категорію, яку вибрав юзер
                
                // Створюємо HTML-код нової картки (одразу з правильною категорією data-category)
                const newPhotoHTML = `
                    <div class="photo-item" data-category="${selectedCategory}">
                        <img src="${photoUrl}" alt="Нове фото">
                        <div class="photo-overlay"><span>❤️ 0</span></div>
                    </div>
                `;
                
                // Вставляємо нову картку на самий початок сітки
                photoGrid.insertAdjacentHTML('afterbegin', newPhotoHTML);
            };
            
            // Запускаємо читання файлу
            reader.readAsDataURL(file);
        }
    });
}



