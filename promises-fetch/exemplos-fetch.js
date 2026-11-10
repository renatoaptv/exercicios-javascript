// Atividade: Promises, setTimeout e fetch com .then()

const URL_PRODUTOS = "https://dummyjson.com/products";
const URL_COM_ERRO = "https://dummyjson.com/products/0";

// Exibe mensagens no console e também na página, quando aberta no navegador.
function mostrar(mensagem, tipo = "") {
    if (tipo === "erro") {
        console.error(mensagem);
    } else {
        console.log(mensagem);
    }

    if (typeof document !== "undefined") {
        const saida = document.getElementById("saida");
        if (saida) {
            const linha = document.createElement("div");
            linha.textContent = mensagem;
            if (tipo) linha.className = tipo;
            saida.appendChild(linha);
        }
    }
}

// 1. O código síncrono vem antes das Promises e do setTimeout.
function demonstrarOrdem() {
    mostrar("1 - Início do código síncrono");

    setTimeout(() => {
        mostrar("4 - setTimeout com 0 ms");
    }, 0);

    Promise.resolve().then(() => {
        mostrar("3 - Promise.then()");
    });

    mostrar("2 - Fim do código síncrono");
}

// 2. Consultar os produtos usando .then() e imprimir os nomes.
function listarNomesComThen(url) {
    return fetch(url)
        .then((resposta) => {
            if (!resposta.ok) {
                throw new Error("Falha HTTP: " + resposta.status);
            }

            return resposta.json();
        })
        .then((dados) => {
            dados.products.forEach((produto) => {
                mostrar(produto.title);
            });

            return dados;
        })
        .catch((erro) => {
            mostrar("Erro na consulta: " + erro.message, "erro");
            return null;
        });
}

// 3. Testar a URL correta e uma URL que gera erro.
function executarAtividade() {
    if (typeof document !== "undefined") {
        const saida = document.getElementById("saida");
        if (saida) saida.textContent = "";
    }

    mostrar("DEMONSTRAÇÃO DA ORDEM:");
    demonstrarOrdem();

    mostrar("CONSULTA DE PRODUTOS:");
    return listarNomesComThen(URL_PRODUTOS)
        .then((dados) => {
            if (dados) {
                mostrar("Quantidade recebida: " + dados.products.length);
            }

            mostrar("TESTE COM URL INVÁLIDA:");
            return listarNomesComThen(URL_COM_ERRO);
        });
}

if (typeof document !== "undefined") {
    document.getElementById("executar").addEventListener("click", executarAtividade);
    executarAtividade();
} else {
    // Também funciona ao executar pelo terminal com Node.js 18 ou superior.
    executarAtividade();
}
