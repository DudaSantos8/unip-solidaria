// Contador de doações animado
const contador = document.getElementById('contador-doacoes');
let numero = 5320;
setInterval(() => {
  numero += Math.floor(Math.random() * 3);
  contador.textContent = numero.toLocaleString('pt-BR');
}, 4000);

// Simulação de envio do formulário
document.getElementById('doacao-form').addEventListener('submit', e => {
  e.preventDefault();
  alert('Obrigado por sua doação! ❤️');
});