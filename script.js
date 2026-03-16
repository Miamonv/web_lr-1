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
const categorySelect = document.querySelector('#photo-category');

if (fileInput) {
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0]; //файл, який вибрав користувач
        
        if (file) {
            const reader = new FileReader(); // інструмент браузера для читання файлів
            
            reader.onload = function(e) {
                const photoUrl = e.target.result; // картинка у вигляді коду
                const selectedCategory = categorySelect.value;
                
                const newPhotoHTML = `
                    <div class="photo-item" data-category="${selectedCategory}">
                        <img src="${photoUrl}" alt="Моє фото">
                        <div class="photo-overlay"><span>❤️ 0</span></div>
                    </div>
                `;
                
                // нова картка піде на самий початок сітки
                photoGrid.insertAdjacentHTML('afterbegin', newPhotoHTML);
            };
            
            reader.readAsDataURL(file);
        }
    });
}

/*логін у кабінет*/
const loginOverlay = document.querySelector('.login-overlay');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('#user-email');
const passInput = document.querySelector('#user-pass');
const formMessage = document.querySelector('.error-message');

if (loginForm) {
    document.body.style.overflow = 'hidden';

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const emailVal = emailInput.value.trim();
        const passVal = passInput.value.trim();
        
        if (emailVal === '' || passVal === '') {
            formMessage.style.color = 'red';
            formMessage.textContent = 'Помилка: Будь ласка, заповніть всі поля!';
        } else if (!emailVal.includes('@')) {
            formMessage.style.color = 'red';
            formMessage.textContent = 'Помилка: Невірний формат email!';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailVal)) {
            formMessage.style.color = 'red';
            formMessage.textContent = 'Помилка: Email може містити лише латинські літери, цифри та спеціальні символи (@, ., _, %, +, -)';
        } else {
            formMessage.style.color = '#F28B22';
            formMessage.textContent = `Вітаємо, ${emailVal}! Вхід успішний.`;
            
            setTimeout(function() {
                loginOverlay.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 1000);
        }
    });
}

