// Exercício 01 — JSON e tratamento de erros (aula do professor André)
// Executar na raiz do repositório: node json/exercicio-01.js

const colecaoExemplo = {
    produtos: [
        { id: 1, nome: "Vaso", preco: 20, favorito: false }
    ],
    titulo: "Meu carrinho",
    proximoId: 2
};

function gerarTextoColecao(dados) {
    // Exercício 1: devolver o texto JSON dos dados.
    return JSON.stringify(dados);
}

function recuperarTextoColecao(texto) {
    // Exercício 2: converter; exigir produtos como array;
    // em caso de erro, mostrar erro.message e devolver null;
    // em finally, registrar "Leitura encerrada.".
    try {
        const dados = JSON.parse(texto);

        if (dados === null || !Array.isArray(dados.produtos)) {
            throw new Error("Propriedade produtos não é um Array");
        }

        return dados;
    } catch (error) {
        console.warn("Erro:", error.message);
        return null;
    } finally {
        console.log("Leitura encerrada.");
    }
}

const textoJson = gerarTextoColecao(colecaoExemplo);
console.log(textoJson);
console.log(recuperarTextoColecao(textoJson));
