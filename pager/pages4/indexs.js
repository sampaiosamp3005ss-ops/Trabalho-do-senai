const imagemGrande = document.getElementById("imagemGrande");
const miniaturas = document.querySelectorAll(".miniaturas img");
miniaturas.forEach(miniatura => {

    miniatura.addEventListener("click", () => {
        imagemGrande.src = miniatura.src;

    });

});

const estrelas = document.querySelectorAll(".estrela");

const nomeJogo = "cs2";

let notaSalva = localStorage.getItem(nomeJogo);

if (notaSalva) {
    pintarEstrelas(notaSalva);
}

estrelas.forEach((estrela) => {

    estrela.addEventListener("click", () => {

        const valor = estrela.dataset.value;


        localStorage.setItem(nomeJogo, valor);

        pintarEstrelas(valor);

    });

});

function pintarEstrelas(valor) {

    estrelas.forEach((estrela) => {

        estrela.classList.remove("ativa");

        if (estrela.dataset.value <= valor) {
            estrela.classList.add("ativa");
        }

    });

}

