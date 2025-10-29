document.addEventListener('DOMContentLoaded', function() {

    // ======================================================
    // 0. NAVEGABILIDADE: MENU HAMBÚRGUER (MOBILE)
    // (Abre e fecha o menu e controla a rolagem do corpo)
    // ======================================================
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('#nav-links a');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            // Alterna a classe 'active' para animação do menu e do ícone
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Atualiza o atributo ARIA para acessibilidade
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Impede a rolagem do fundo da página quando o menu está aberto
            document.body.classList.toggle('menu-open');
        });
        
        // Fecha o menu ao clicar em qualquer link (âncora)
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            });
        });
    }


    // ======================================================
    // 1. ANIMAÇÃO DO CONTADOR DE DOAÇÕES
    // (Usa Intersection Observer para iniciar a animação quando visível)
    // ======================================================

    const contadorElemento = document.getElementById('contador-doacoes');
    // Pega o valor inicial, remove o ponto e converte para número
    const valorFinal = parseInt(contadorElemento.textContent.replace(/\./g, '')); 
    const duracao = 2000; // Duração da animação em milissegundos
    let startTime;

    function animarContador(timestamp) {
        if (!startTime) startTime = timestamp;
        
        const progresso = timestamp - startTime;
        const porcentagem = Math.min(progresso / duracao, 1); 
        const valorAtual = Math.floor(porcentagem * valorFinal);

        // Formata o número com separador de milhar (ponto)
        contadorElemento.textContent = valorAtual.toLocaleString('pt-BR');

        if (porcentagem < 1) {
            requestAnimationFrame(animarContador);
        } else {
            contadorElemento.textContent = valorFinal.toLocaleString('pt-BR');
        }
    }

    if (contadorElemento) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    contadorElemento.textContent = '0'; 
                    requestAnimationFrame(animarContador);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5 // Inicia quando 50% do elemento está visível
        });

        observer.observe(document.querySelector('.hero-content'));
    }


    // ======================================================
    // 2. VALIDAÇÃO E FEEDBACK DO FORMULÁRIO DE DOAÇÃO
    // ======================================================

    const doacaoForm = document.getElementById('doacao-form');
    const valorInput = document.getElementById('valor');

    if (doacaoForm) {
        doacaoForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            // Remove mensagens anteriores para evitar acúmulo
            const mensagemAnterior = document.querySelector('.apoio-card .form-message');
            if (mensagemAnterior) {
                mensagemAnterior.remove();
            }

            const valorDoacao = parseFloat(valorInput.value.replace(',', '.')); 
            const mensagem = document.createElement('p');
            mensagem.classList.add('form-message');

            if (isNaN(valorDoacao) || valorDoacao < 5) {
                // Mensagem de Erro
                mensagem.textContent = 'O valor mínimo para doação é R$ 5,00. Por favor, insira um valor válido.';
                mensagem.style.color = '#dc3545'; // Vermelho
                valorInput.focus();
            } else {
                // Mensagem de Sucesso
                mensagem.textContent = `Agradecemos sua doação de R$ ${valorDoacao.toFixed(2).replace('.', ',')}! Você será redirecionado(a) para a página de pagamento seguro.`;
                mensagem.style.color = '#28a745'; // Verde
                
                doacaoForm.reset(); 
            }
            
            // Insere a mensagem dentro do card de apoio
            doacaoForm.closest('.apoio-card').insertAdjacentElement('beforeend', mensagem);
        });
    }

    // ======================================================
    // 3. VALIDAÇÃO SIMPLES DO FORMULÁRIO DE CONTATO
    // ======================================================

    const contatoForm = document.querySelector('.section-contato .contato-form');
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert('Mensagem enviada com sucesso! Em breve, a UNIP Solidária entrará em contato.');
            contatoForm.reset();
        });
    }

});