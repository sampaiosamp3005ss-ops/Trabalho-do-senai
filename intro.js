const msg = document.getElementById('mensagem');

function exibirMensagem(texto, cor) {
    if (msg) {
        msg.style.color = cor;
        msg.textContent = texto;
    }
}

// --- LÓGICA DE ALTERNAR AS TELAS (CADASTRO / LOGIN) ---
const btnAbaCadastro = document.getElementById('btnAbaCadastro');
const btnAbaLogin = document.getElementById('btnAbaLogin');
const containerCadastro = document.getElementById('containerCadastro');
const containerLogin = document.getElementById('containerLogin');

if (btnAbaCadastro && btnAbaLogin) {
    // Quando clicar em "Criar Conta"
    btnAbaCadastro.addEventListener('click', () => {
        containerCadastro.classList.remove('escondido');
        containerLogin.classList.add('escondido');
        btnAbaCadastro.classList.add('aba-ativa');
        btnAbaLogin.classList.remove('aba-ativa');
        exibirMensagem('', ''); // Limpa mensagens antigas
    });

    // Quando clicar em "Já tenho conta"
    btnAbaLogin.addEventListener('click', () => {
        containerLogin.classList.remove('escondido');
        containerCadastro.classList.add('escondido');
        btnAbaLogin.classList.add('aba-ativa');
        btnAbaCadastro.classList.remove('aba-ativa');
        exibirMensagem('', ''); // Limpa mensagens antigas
    });
}


// --- FLUXO DE CADASTRO ---
const formCadastro = document.getElementById('formCadastro');
if (formCadastro) {
    formCadastro.addEventListener('submit', function (e) {
        e.preventDefault();

        const nomeInput = document.getElementById('nome');
        const emailInput = document.getElementById('email');
        const senhaInput = document.getElementById('senha');

        const nome = nomeInput ? nomeInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const senha = senhaInput ? senhaInput.value : '';

        if (!email || senha.length < 6) {
            exibirMensagem('Preencha um e-mail válido e senha com ao menos 6 caracteres.', 'red');
            return;
        }

        localStorage.setItem('usuarioNome', nome);
        localStorage.setItem('usuarioEmail', email);
        localStorage.setItem('usuarioSenha', senha);

        exibirMensagem('Cadastro realizado! Mudando para a tela de login...', 'green');

        setTimeout(() => {
            btnAbaLogin.click(); 
        }, 1500);
    });
}

// --- FLUXO DE LOGIN ---
const formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', function (e) {
        e.preventDefault();

        const emailInput = document.getElementById('loginEmail');
        const senhaInput = document.getElementById('loginSenha');

        const emailDigitado = emailInput ? emailInput.value.trim() : '';
        const senhaDigitada = senhaInput ? senhaInput.value : '';

        const emailSalvo = localStorage.getItem('usuarioEmail');
        const senhaSalvo = localStorage.getItem('usuarioSenha');

        if (emailDigitado === emailSalvo && senhaDigitada === senhaSalvo && emailSalvo !== null) {
            exibirMensagem('Login correto! Entrando...', 'green');
            
            setTimeout(() => {
                window.location.href = 'pager/index.html';
            }, 800);
        } else {
            exibirMensagem('Erro: Usuário não cadastrado ou dados incorretos!', 'red');
        }
    });
}