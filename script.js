// Новости
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    480: { slidesPerView: 1 },
  },
});

// Получаем текущего пользователя
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
if (currentUser) {
    console.log(`Қазіргі қолданушы: ${currentUser.fullname}`);
    showUserProfile(); // Отображение профиля
} else {
    console.log('Қолданушы жүйеге кірмеген.');
    window.location.href = 'login.html';
}

// Функция для отображения данных пользователя
function showUserProfile() {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  console.log(currentUser); // Проверяем, что в sessionStorage есть данные пользователя

  if (currentUser) {
      const profileContainer = document.getElementById('profile-container');
      const profileIcon = document.createElement('span');
      profileIcon.classList.add('profile-icon');
      profileIcon.textContent = '👤'; 

      const userName = document.createElement('span');
      userName.classList.add('user-name');
      userName.textContent = currentUser.fullname;

      profileContainer.appendChild(profileIcon);
      profileContainer.appendChild(userName);
  } else {
      console.log('Пользователь не авторизован');
  }
}

// Функция для выхода
function logout() {
  sessionStorage.removeItem('currentUser'); // Удаляем текущего пользователя из sessionStorage
  window.location.href = 'login.html'; // Перенаправляем на страницу входа
}

// Вопросы
function redirectToGmail(event) {
  event.preventDefault(); // Предотвращаем стандартную отправку формы
  // Получаем значения полей
  const email = document.getElementById('email').value;
  const question = document.getElementById('question').value;
  // Формируем ссылку для Gmail
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=bilimkazina02@gmail.com&su=Сұрақ&body=Сұрақ:%20${encodeURIComponent(question)}%0AПайдаланушы:%20${encodeURIComponent(email)}`;
  // Перенаправляем пользователя
  window.open(gmailLink, '_blank');
}

// Преимущества
function highlightBenefit(element) {
  element.style.background = "linear-gradient(135deg, #007acc, #009ee0)";
  element.style.color = "#fff";
  const icon = element.querySelector(".icon");
  icon.style.transform = "rotate(360deg)";
  icon.style.transition = "transform 0.5s ease";
}

function resetBenefit(element) {
  element.style.background = "#ffffff";
  element.style.color = "#333";
  const icon = element.querySelector(".icon");
  icon.style.transform = "rotate(0deg)";
}
