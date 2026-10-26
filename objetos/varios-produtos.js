// Exercício 03: e se tivermos mais de um produto?
// Um array guarda vários objetos, cada um com nome e valor.
const produtos = [
    { nome: "Caderno", valor: 25 },
    { nome: "Caneta", valor: 5 },
    { nome: "Borracha", valor: 3 }
];

// O forEach percorre os produtos, um de cada vez.
produtos.forEach((produto) => {
    console.log(produto.nome + " - R$ " + produto.valor);
});

// Extra: somar o valor de todos com reduce(), da aula anterior.
const total = produtos.reduce((acumulador, produto) => {
    return acumulador + produto.valor;
}, 0);

console.log("Total: R$ " + total); // Total: R$ 33
