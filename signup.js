// Получаем форму регистрации
const form = document.querySelector('form');

// Обработка события отправки формы
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    // Собираем данные из формы
    const userData = {
        fullname: document.getElementById('fullname').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value.trim(),
        role: document.getElementById('role').value
    };

    // Проверяем локальное хранилище на наличие пользователей
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Проверяем, есть ли уже пользователь с такой почтой
    if (users.some(user => user.email === userData.email)) {
        alert('Бұл поштаға тіркелу бұрын жасалған. Басқа пошта таңдаңыз.');
        return;
    }

    // Добавляем нового пользователя
    users.push(userData);

    // Сохраняем обновленный массив пользователей в локальное хранилище
    localStorage.setItem('users', JSON.stringify(users));

    alert('Тіркелу сәтті аяқталды!');
    form.reset(); // Очищаем форму
    window.location.href = 'login.html'; // Переход на страницу входа
});
