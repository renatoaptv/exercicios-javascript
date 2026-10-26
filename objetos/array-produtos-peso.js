// Exercício: array de objetos com nome, valor e peso.
// Cada elemento do array "produtos" representa um produto.

const produtos = [
    {
        nome: "Caderno",
        valor: 25,
        peso: 100.25
    },
    {
        nome: "Mochila",
        valor: 120,
        peso: 20.25
    },
    {
        nome: "Caneta",
        valor: 5,
        peso: 1.12
    }
];

// O índice 0 acessa o primeiro produto do array.
// .nome acessa a propriedade "nome" do objeto.
console.log(produtos[0].nome); // Caderno
