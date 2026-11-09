// Não substitua o script principal do seu catálogo por este arquivo.
// Este exercício é independente e pode ser executado com Node.js.

const colecaoExemplo = {
    produtos: [{ id: 1, nome: "Vaso", preco: 20, favorito: false }],
    titulo: "Meu carrinho",
    proximoId: 2
};

function gerarTextoJson(dados) {
    // Exercício 1: devolver o texto JSON dos dados.
    return JSON.stringify(dados);
}

function recuperarTextoColecao(texto) {
    // Exercício 2: converter e exigir produtos como array;
    // em caso de erro, mostrar erro.message e devolver null;
    // em finally, registrar "Leitura encerrada.".
    try {
        const colecao = JSON.parse(texto);

        if (!colecao || !Array.isArray(colecao.produtos)) {
            throw new Error("A coleção precisa conter produtos como array.");
        }

        return colecao;
    } catch (erro) {
        console.error(erro.message);
        return null;
    } finally {
        console.log("Leitura encerrada.");
    }
}

// Teste de funcionamento
const textoJson = gerarTextoJson(colecaoExemplo);
console.log("JSON gerado:", textoJson);

const colecaoRecuperada = recuperarTextoColecao(textoJson);
console.log("Coleção recuperada:", colecaoRecuperada);
