const botoes = document.querySelectorAll('.btn-comprar');
const input = document.getElementById('buscar');
const jogos = document.querySelectorAll('.card');
const categorias = document.querySelectorAll('.categoria');
const titulo = document.getElementById('titulo-jogos');
const contador = document.querySelector('.resultado-contador');
const mensagemSemResultado = document.querySelector('.no-results');
const carrinhoItens = document.querySelectorAll('.itens-carrinho');
const totalCarrinho = document.querySelectorAll('.total-carrinho');
const carrinhoVazio = document.querySelectorAll('.carrinho-vazio');
const avisoPopUp = document.getElementById('aviso-compra');
const textoNomeJogo = document.getElementById('nome-jogo-aviso');

let carrinho = [];
let categoriaAtual = 'todos';

function formatarPreco(preco) {
  if (!preco) return 0;
  const valor = preco.toString().replace(/[^0-9,\.]/g, '').replace(',', '.');
  return valor === '' ? 0 : Number(valor);
}

function atualizarCarrinho() {
  carrinhoItens.forEach(item => item.innerHTML = '');
  totalCarrinho.forEach(item => item.innerHTML = '');

  if (carrinho.length === 0) {
    carrinhoVazio.forEach(item => item.style.display = 'block');
    return;
  }

  carrinhoVazio.forEach(item => item.style.display = 'none');

  let total = 0;

  carrinho.forEach((jogo, index) => {
    const valor = formatarPreco(jogo.preco);
    total += valor;

    const itemElement = document.createElement('div');
    itemElement.className = 'item-carrinho';
    itemElement.innerHTML = `
      <span>${index + 1}. ${jogo.nome}</span>
      <strong>${jogo.preco}</strong>
      <button type="button" class="remover-item" data-index="${index}" aria-label="Remover item">×</button>
    `;

    const removerBtn = itemElement.querySelector('.remover-item');
    removerBtn?.addEventListener('click', () => {
      carrinho.splice(index, 1);
      atualizarCarrinho();
    });

    carrinhoItens.forEach(container => container.appendChild(itemElement));
  });

  totalCarrinho.forEach(item => item.innerHTML = `<span>Total</span><strong>R$ ${total.toFixed(2)}</strong>`);
}

function atualizarFiltro() {
  const texto = input.value.toLowerCase().trim();
  let encontrados = 0;

  jogos.forEach(jogo => {
    const nome = jogo.querySelector('h3')?.innerText.toLowerCase() || '';
    const categoria = jogo.dataset.categoria;
    const matchNome = nome.includes(texto);
    const matchCategoria = categoriaAtual === 'todos' || categoria === categoriaAtual;

    if (matchNome && matchCategoria) {
      jogo.style.display = 'block';
      encontrados += 1;
    } else {
      jogo.style.display = 'none';
    }
  });

  mensagemSemResultado.style.display = encontrados === 0 ? 'block' : 'none';
  contador.textContent = encontrados === 0 ? 'Nenhum jogo encontrado.' : `Mostrando ${encontrados} jogo${encontrados === 1 ? '' : 's'}`;
}

input.addEventListener('input', atualizarFiltro);

botoes.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.card');
    if (!card) return;

    const nome = card.querySelector('h3')?.innerText || 'Jogo';
    const preco = card.querySelector('p')?.innerText || 'R$ 0';

    carrinho.push({ nome, preco });
    if (avisoPopUp) {


      
            if (textoNomeJogo) {
        textoNomeJogo.textContent = nome;
      }

      avisoPopUp.classList.remove('animar');
      void avisoPopUp.offsetWidth;
      avisoPopUp.classList.add('animar');
    }


    atualizarCarrinho();
  });
});

    avisoPopUp.addEventListener('animationend', (event) => {
  if (event.animationName === 'slidFechado') {
    avisoPopUp.classList.remove('animar');
  }
});


function atualizarTitulo(tipo) {
  if (tipo === 'todos') {
    titulo.textContent = 'Jogos';
    return;
  }
  titulo.textContent = `Jogos ${tipo.toUpperCase()}`;
}

categorias.forEach(cat => {
  cat.addEventListener('click', e => {
    e.preventDefault();
    categoriaAtual = cat.dataset.categoria;

    categorias.forEach(item => item.classList.remove('active'));
    cat.classList.add('active');

    atualizarTitulo(categoriaAtual);
    atualizarFiltro();
  });
});

const themeDropdown = document.querySelector('.theme-dropdown');
const themeBtn = document.querySelector('.theme-btn');
const themeOptions = document.querySelectorAll('.theme-option');
const themeData = {
  default: {
    '--bg': '#09090f',
    '--surface': '#12131a',
    '--text': '#f3f3f3',
    '--accent': '#c77dff',
    '--accent-strong': '#8b54ff',
    '--hover-bg': 'rgba(199, 125, 255, 0.14)',
    '--header-bg': 'rgba(0, 0, 0, 0.92)',
    '--banner-bg': 'linear-gradient(180deg, #07070b 0%, #11131a 80%)',
    '--card-bg': 'rgba(255, 255, 255, 0.04)',
    '--info-bg': 'rgba(18, 23, 37, 0.92)',
    '--info-card-bg': '#10131e',
    '--text-light': '#e8e8ff',
    '--btn-bg': '#8b54ff',
    '--btn-hover': '#a36eff'
  },
  purple: {
    '--bg': '#090a16',
    '--surface': '#18162a',
    '--text': '#f5e8ff',
    '--accent': '#d698ff',
    '--accent-strong': '#ad6bff',
    '--hover-bg': 'rgba(214, 152, 255, 0.18)',
    '--header-bg': 'rgba(12, 5, 24, 0.94)',
    '--banner-bg': 'linear-gradient(180deg, #0a081a 0%, #18162a 80%)',
    '--card-bg': 'rgba(214, 152, 255, 0.08)',
    '--info-bg': 'rgba(30, 20, 50, 0.92)',
    '--info-card-bg': '#1a1230',
    '--text-light': '#e8d5ff',
    '--btn-bg': '#ad6bff',
    '--btn-hover': '#c281ff'
  },
  green: {
    '--bg': '#07100c',
    '--surface': '#122117',
    '--text': '#e9fff5',
    '--accent': '#6cd17f',
    '--accent-strong': '#46b868',
    '--hover-bg': 'rgba(108, 209, 127, 0.18)',
    '--header-bg': 'rgba(5, 18, 11, 0.94)',
    '--banner-bg': 'linear-gradient(180deg, #081408 0%, #132f1a 80%)',
    '--card-bg': 'rgba(108, 209, 127, 0.08)',
    '--info-bg': 'rgba(15, 40, 25, 0.92)',
    '--info-card-bg': '#0f2819',
    '--text-light': '#c8ffe5',
    '--btn-bg': '#46b868',
    '--btn-hover': '#5acc7f'
  },
  blue: {
    '--bg': '#07101d',
    '--surface': '#12203a',
    '--text': '#e6f2ff',
    '--accent': '#79b5ff',
    '--accent-strong': '#4c8fff',
    '--hover-bg': 'rgba(121, 181, 255, 0.18)',
    '--header-bg': 'rgba(5, 12, 25, 0.94)',
    '--banner-bg': 'linear-gradient(180deg, #081020 0%, #142a45 80%)',
    '--card-bg': 'rgba(121, 181, 255, 0.08)',
    '--info-bg': 'rgba(15, 35, 60, 0.92)',
    '--info-card-bg': '#0f2340',
    '--text-light': '#c8e5ff',
    '--btn-bg': '#4c8fff',
    '--btn-hover': '#6aa3ff'
  },
  white: {
    '--bg': '#f5f5f5',
    '--surface': '#ffffff',
    '--text': '#1a1a1a',
    '--accent': '#0066cc',
    '--accent-strong': '#0052a3',
    '--hover-bg': 'rgba(0, 102, 204, 0.12)',
    '--header-bg': 'rgba(255, 255, 255, 0.95)',
    '--banner-bg': 'linear-gradient(180deg, #f0f0f0 0%, #ffffff 80%)',
    '--card-bg': 'rgba(0, 102, 204, 0.06)',
    '--info-bg': 'rgba(240, 240, 240, 0.98)',
    '--info-card-bg': '#f8f8f8',
    '--text-light': '#334455',
    '--btn-bg': '#0066cc',
    '--btn-hover': '#004fa3'
  }
};

function aplicarTema(nomeTema) {
  const tema = themeData[nomeTema] || themeData.default;
  Object.entries(tema).forEach(([chave, valor]) => {
    document.documentElement.style.setProperty(chave, valor);
  });
  themeOptions.forEach(option => {
    option.classList.toggle('active', option.dataset.theme === nomeTema);
  });
  localStorage.setItem('temaEscolhido', nomeTema);
}

themeOptions.forEach(option => {
  option.addEventListener('click', () => {
    aplicarTema(option.dataset.theme);
    themeDropdown.querySelector('.theme-content').classList.remove('show');
  });
});

themeBtn?.addEventListener('click', e => {
  if (window.innerWidth <= 768) {
    e.preventDefault();
    document.querySelector('.theme-content').classList.toggle('show');
  }
});

window.addEventListener('click', e => {
  if (themeDropdown && !themeDropdown.contains(e.target)) {
    document.querySelector('.theme-content').classList.remove('show');
  }
});

const temaSalvo = localStorage.getItem('temaEscolhido');
aplicarTema(temaSalvo || 'default');

let scrollTimer = 500;

window.onscroll = function () {
  let seta = document.querySelector('.seta');
  if (window.scrollY > 100 || document.documentElement.scrollTop > 100) {
    seta.style.display = "flex";
  } else {
    seta.style.display = "none";
  }
  clearTimeout(scrollTimer);

  scrollTimer = setTimeout(function () {

  }, 300);

};

const areasEstrelas = document.querySelectorAll(".estrelas-loja");

areasEstrelas.forEach((area) => {

  const jogo = area.dataset.jogo;

  const nota = localStorage.getItem(jogo);

  if (nota) {

    let estrelas = "";

    for (let i = 1; i <= 5; i++) {

      if (i <= nota) {
        estrelas += "★";
      } else {
        estrelas += "☆";
      }

    }

    area.innerHTML = estrelas;

  }


});

(function () {
  window.addEventListener('load', () => {
    const nomeSalvo = localStorage.getItem('usuarioNome');
    const elementoNome = document.getElementById('nomeDoUsuario');

    if (nomeSalvo && elementoNome) {
      elementoNome.textContent = nomeSalvo;
    }
    document.addEventListener('DOMContentLoaded', carregarNome);
  });

})();

function carregarNome() {
  const nomeSalvo = localStorage.getItem('usuarioNome');
  const elementoNome = document.getElementById('nomeDoUsuario');

  if (nomeSalvo && elementoNome) {
    elementoNome.textContent = nomeSalvo;
  }
}

carregarNome();
atualizarFiltro();
atualizarCarrinho();