// Получаем текущего пользователя
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

if (currentUser) {
    console.log(`Қазіргі қолданушы: ${currentUser.fullname}`);
    showUserProfile(); // Отображение профиля
    setNicknameInput(); // Устанавливаем ФИО в поле "nickname"
} else {
    console.log('Қолданушы жүйеге кірмеген.');
    window.location.href = 'login.html';
}

// Функция для отображения данных пользователя
function showUserProfile() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser && currentUser.fullname) {
        const profileContainer = document.getElementById('profile-container');
        
        if (!profileContainer) {
            console.error('Контейнер для профиля не найден!');
            return;
        }

        // Создаем иконку профиля
        const profileIcon = document.createElement('span');
        profileIcon.classList.add('profile-icon');
        profileIcon.textContent = '👤'; 

        // Создаем имя пользователя
        const userName = document.createElement('span');
        userName.classList.add('user-name');
        userName.textContent = currentUser.fullname;

        // Добавляем элементы в контейнер
        profileContainer.appendChild(profileIcon);
        profileContainer.appendChild(userName);
    } else {
        console.log('Пользователь не авторизован или данные отсутствуют');
    }
}

// Устанавливаем ФИО текущего пользователя в поле "nickname"
function setNicknameInput() {
    const nicknameInput = document.getElementById('nickname');
    if (nicknameInput && currentUser.fullname) {
        nicknameInput.value = currentUser.fullname; // Устанавливаем ФИО
        nicknameInput.disabled = true; // Блокируем поле (опционально)
    }
}

// Функция для выхода
function logout() {
    sessionStorage.removeItem('currentUser'); // Удаляем текущего пользователя из sessionStorage
    window.location.href = 'login.html'; // Перенаправляем на страницу входа
}

// Советы

// Количество советов на странице
const itemsPerPage = 3; 
// Текущая страница
let currentPage = 1; 

// Получение уникального ключа для текущей страницы
function getCurrentPageKey() {
    const pageName = window.location.pathname.split("/").pop().split(".")[0]; // Название текущей страницы
    return `advices_${pageName}`; // Уникальный ключ для каждой страницы
}

// Функция для добавления нового совета
function addAdvice(nickname, adviceText) {
    const pageKey = getCurrentPageKey(); // Получаем ключ для текущей страницы

    // Получаем текущие советы из localStorage для данной страницы
    let advices = JSON.parse(localStorage.getItem(pageKey)) || [];

    // Создаем новый совет
    const newAdvice = {
        nickname: nickname,
        adviceText: adviceText,
        id: Date.now(), // Уникальный ID для каждого совета
        author: currentUser.fullname, // Записываем текущего пользователя как автора
        role: currentUser.role // Сохраняем роль пользователя (студент или преподаватель)
    };

    // Добавляем новый совет в массив
    advices.push(newAdvice);
    // Сохраняем обновленный список советов для данной страницы
    localStorage.setItem(pageKey, JSON.stringify(advices));
    // Перезагружаем список советов
    loadAdvices();
}

// Функция для загрузки всех советов из localStorage для текущей страницы
function loadAdvices() {
    const pageKey = getCurrentPageKey(); // Получаем ключ для текущей страницы
    const advices = JSON.parse(localStorage.getItem(pageKey)) || [];
    const adviceList = document.getElementById('advice-list');
    adviceList.innerHTML = ''; // Очищаем список перед добавлением новых

    // Пагинация: определяем, какие советы показать
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentAdvices = advices.slice(startIndex, endIndex);

    // Обрабатываем все советы и отображаем их
    currentAdvices.forEach(advice => {
        const adviceItem = document.createElement('li');
        adviceItem.classList.add('advice-item');

        // Применяем цвет для преподавателей
        if (advice.role === 'teacher') {
            adviceItem.classList.add('teacher-advice'); // Добавляем стиль для преподавателей
        }

        const avatar = document.createElement('img');
        avatar.src = 'https://via.placeholder.com/60';
        avatar.alt = 'Аватар';

        const content = document.createElement('div');
        content.classList.add('advice-content');

        const nickname = document.createElement('h2');
        nickname.classList.add('nickname');
        nickname.textContent = advice.nickname;

        const adviceText = document.createElement('p');
        adviceText.classList.add('advice-text');
        adviceText.textContent = advice.adviceText;

        // Проверка, авторизован ли пользователь для удаления
        if (currentUser && currentUser.fullname === advice.author) {
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = 'Удалить';
            deleteButton.onclick = () => deleteAdvice(advice.id);
            content.appendChild(deleteButton);
        }

        content.appendChild(nickname);
        content.appendChild(adviceText);

        adviceItem.appendChild(avatar);
        adviceItem.appendChild(content);

        adviceList.appendChild(adviceItem);
    });

    // Обновление кнопок пагинации
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage * itemsPerPage >= advices.length;
}

// Функция для удаления совета
function deleteAdvice(id) {
    const pageKey = getCurrentPageKey(); // Получаем ключ для текущей страницы
    let advices = JSON.parse(localStorage.getItem(pageKey)) || [];
    advices = advices.filter(advice => advice.id !== id); // Удаляем совет по ID
    localStorage.setItem(pageKey, JSON.stringify(advices)); // Сохраняем обновленный список
    loadAdvices(); // Перезагружаем список
}

// Функция для изменения страницы
function changePage(direction) {
    currentPage += direction;
    loadAdvices();
}

// Инициализация пагинации при загрузке страницы
window.onload = () => {
    loadAdvices();
    setNicknameInput(); // Обновляем поле "nickname" при загрузке страницы
};

// Обработчик формы для добавления совета
const adviceForm = document.getElementById('advice-form');
adviceForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Отменяем стандартное поведение формы

    const nickname = document.getElementById('nickname').value;
    const adviceText = document.getElementById('advice-text').value;

    addAdvice(nickname, adviceText); // Добавляем новый совет
    adviceForm.reset(); // Очищаем форму
    setNicknameInput(); // Восстанавливаем ФИО в поле "nickname"
});
