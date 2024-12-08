// Получаем форму входа
const form = document.querySelector('form');

// Обработка события отправки формы
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    // Получаем данные из формы
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Получаем пользователей из локального хранилища
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Проверяем, существует ли пользователь с такими данными
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert(`Қош келдіңіз, ${user.fullname}!`);
        // Сохраняем текущего пользователя в сессии
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'index.html'; // Переход на главную страницу
    } else {
        alert('Қате пошта немесе құпия сөз. Қайтадан тексеріңіз.');
    }
});
