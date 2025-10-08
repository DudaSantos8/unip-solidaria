// Contador de doações animado
const contador = document.getElementById('contador-doacoes');
let numero = 5320;
// Simula um aumento aleatório a cada 4 segundos
setInterval(() => {
  numero += Math.floor(Math.random() * 3);
  // Formata o número para o padrão brasileiro (ex: 5.320)
  contador.textContent = numero.toLocaleString('pt-BR');
}, 4000);

// Simulação de envio do formulário
document.getElementById('doacao-form').addEventListener('submit', e => {
  e.preventDefault();
  // Aqui você faria a validação e o envio real para o servidor
  alert('Obrigado por sua doação! ❤️ (Simulação de envio bem-sucedido)');
});


// Lógica do Menu Responsivo (Hambúrguer)
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

// 1. Abre/Fecha o menu ao clicar no botão
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// 2. Fecha o menu ao clicar em qualquer link (para navegação)
navItems.forEach(link => {
  link.addEventListener('click', () => {
    // Se o menu estiver aberto, remove a classe 'active' para fechar
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });
});