// Exercício de JSON e tratamento de erros (aula do professor André)
// Execute no terminal: node json/exercicio-01.js

const colecaoExemplo = {
    produtos: [{ id: 1, nome: "Vaso", preco: 20, favorito: false }],
    titulo: "Meu carrinho",
    proximoId: 2
};

function gerarTextoColecao(dados) {
    // Exercício 1: devolver o texto JSON dos dados.
    return JSON.stringify(dados);
}

function recuperarTextoColecao(texto) {
    // Exercício 2: converter, exigir produtos como array;
    // em caso de erro, mostrar erro.message e devolver null;
    // em finally, registrar "Leitura encerrada.".
    try {
        const colecao = JSON.parse(texto);

        if (!colecao || !Array.isArray(colecao.produtos)) {
            throw new Error("A propriedade produtos deve ser um array.");
        }

        return colecao;
    } catch (erro) {
        console.error(erro.message);
        return null;
    } finally {
        console.log("Leitura encerrada.");
    }
}

const textoJson = gerarTextoColecao(colecaoExemplo);
console.log(textoJson);
console.log(recuperarTextoColecao(textoJson));
